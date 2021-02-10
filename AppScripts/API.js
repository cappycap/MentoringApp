



import {AsyncStorage} from 'react-native';
import {cur, accountID, accountType, url} from './globals.js';
import {parseDateText, parseSimpleDateText} from './Helpers.js';
import {styles, colors} from './Styles.js';

// API GET and POST Methods

// Gets all pairs containing the given user as a mentor, then gets a list of mentees using those pairs.
export async function getMenteesOf (userID) {

    console.log("Getting Mentees...")
  
    const pairs = await getPairsOf('mentor', userID);
    const mentees = [];
    for (var i = 0; i < pairs.length; i++) {
      const index = i;
      const value = await getUserPayloadByID(pairs[index]["MenteeId"]);
      const mentee = JSON.parse(JSON.stringify(value["recordset"][0]));
      mentee.homeBoxStyle = styles.homeMenteeBox;
      mentee.contactButtonStatus = true;
      mentee.contactButtonStyle = styles.hiddenButton;
      mentees.push(mentee);
    }
  
    return mentees;
}
  
// Gets all pairs containing the given user as a mentee, then gets a list of mentors from those pairs.
export async function getMentorsOf (userID) {
    console.log("Getting Mentors...");
  
    const pairs = await getPairsOf('mentee', userID);
    const mentors = [];
    for (var i = 0; i < pairs.length; i++) {
      const index = i;
      const value = await getUserPayloadByID(pairs[index]["MentorId"]);
      const mentor = JSON.parse(JSON.stringify(value["recordset"][0]));
      mentor.homeBoxStyle = styles.homeMentorBox;
      mentor.contactButtonStatus = false;
      mentor.contactButtonStyle = styles.summaryButton;
      mentors.push(mentor);
    }
  
    return mentors;
}

// Gets all pairs relative to a user's Role and a user's ID.
export async function getPairsOf(type, userID) {
    const pairsres = await fetch(url + '/pair/' + type + '/' + userID, {
      method: 'GET'
    });
  
    const pairsPayload = await pairsres.json();
  
    const recordSet = pairsPayload["recordset"];
    var pairs = [];
    for (var i = 0; i < recordSet.length; i++) {
      var pair = JSON.parse(JSON.stringify(recordSet[i]));
      pairs.push(pair);
    }
  
    return pairs;
}
  
// Gets the Current User via the ensureUserExists method and the createLocalUser method.
// Should Phase Out the CreateLocalUser method in favor of a simple .json() call on the payload.
export async function getCurrentUser () {
  const userPayload = await ensureUserExists();
  console.log("URL: " + url);
  console.log(userPayload);
  return createLocalUser(userPayload);
}
  
// Gets a user based on a certain user id.
export async function getUserByID(id) {
    const userPayload = await getUserPayloadByID(id);
    return createLocalUser(userPayload);
}
  
// Creates a javascript object out of a user payload for use elsewhere in the React Native app.
// Note:  this should probably be replaced with a .json() call or otherwise by using JSON.parse().
export function createLocalUser(userPayload) {
    const recordSet = userPayload["recordset"][0];
    const user = {
      id: recordSet["Id"],
      email: recordSet["Email"],
      firstName: recordSet["FirstName"],
      lastName: recordSet["LastName"],
      avatar: recordSet["Avatar"],
      created: recordSet["Created"],
      lastUpdate: recordSet["LastUpdate"],
      privacyAccepted: recordSet["PrivacyAccepted"],
      approved: recordSet["Approved"]
    };
    return user;
    // return JSON.parse(JSON.stringify(userPayload['recordset'][0]));
}
  
// Finds the current user if it can, creates a new user and adds it to the database if needed.
// All in all, Effectively accounts for when the user was created offline, or for when the API is offline.
export async function ensureUserExists () {

    const email = await AsyncStorage.getItem("Email");
    const first = await AsyncStorage.getItem('FirstName');
    const last = await AsyncStorage.getItem('LastName');
    const pic = await AsyncStorage.getItem('Avatar');
  
    let userPayload = await getUserPayloadByEmail(email);
  
    // check if this user needs to be added to DB.
    while (userPayload.rowsAffected == 0) {
      await postNewUser(email, first, last, pic);
      userPayload = await getUserPayloadByEmail(email);
    }
  
    const payload = userPayload;
    return payload;
}

// Fetches a User Payload using a User Email.
export async function getUserPayloadByEmail(email) {
    const userres = await fetch(url + '/user/email/' + email, {
      method: 'GET'
    });
    const userPayload = await userres.json();
    return userPayload;
}

// Fetches a User Payload using a User ID.
export async function getUserPayloadByID(id) {
    const userres = await fetch(url + '/user/id/' + id, {
      method: 'GET'
    });
    const userPayload = await userres.json();
    const value = JSON.parse(JSON.stringify(userPayload));
    return value;
}
  
// Creates a User via POST
export async function postNewUser(email, first, last, pic) {
  
    const postres = fetch(url + '/create-user', {
      method: 'POST',
      body: JSON.stringify({
        Email: email,
        FirstName: first,
        LastName: last,
        Avatar: pic,
        PrivacyAccepted: 0
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.error(error);
    });  
}

// Updates appointment status
export async function updateAppointmentStatus(id, status) {
  const statusupdateres = await fetch(url + '/update-appointment-status', {
    method: 'POST',
    body: JSON.stringify({
      Id: id,
      Status: status
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

// Create Summary
export async function createSummary(id, curSummary, userID) {
  const postres = fetch (url + '/create-summary', {
    method: 'POST',
    body: JSON.stringify({
      AppointmentId: id,
      SummaryText: curSummary,
      UserId: userID
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

// Updates the privacy setting of a user, based on a given email.
export async function updatePrivacy(email, privacyAccepted) {
  
    const postres = fetch (url + '/update-privacy', {
      method: 'POST',
      body: JSON.stringify({
        Email: email,
        PrivacyAccepted: privacyAccepted
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.error(error);
    }); 
}

// Returns All of the Contact Info for a given UserID. ("cInfos" refers to various forms of contact)
export async function getContactInfoOf(userID) {

    const cInfores = await fetch(url + '/contact/' + userID, {
      method: 'GET'
    });
  
    const cInfoPayload = await cInfores.json();
  
    const recordSet = JSON.parse(JSON.stringify(cInfoPayload["recordset"]));
    var cInfos = [];
    for (var i = 0; i < recordSet.length; i++) {
      const index = i;
      var cInfo = JSON.parse(JSON.stringify(recordSet[index]));
      cInfo.LastUpdateText = parseSimpleDateText(new Date(cInfo.LastUpdate));
      cInfo.CreatedText = parseSimpleDateText(new Date(cInfo.Created));
      cInfos.push(cInfo);
    }
    return cInfos;
}

// Returns a topic based on it's ID?  Could you a more cohesive name.
export async function retTopic(topicId) {

    const topicRes = await fetch(url + '/topic/' + topicId, {
      method: 'GET'
    });
    const topicPayload = await topicRes.json();
  
    var top = JSON.parse(JSON.stringify(topicPayload["recordset"][0]));
    top['dueDateText'] = parseDateText(new Date(top["DueDate"]));
    top['createdText'] = parseSimpleDateText(new Date(top["Created"]));
  
    return top;
}

// Returns the current topic from the database.
export async function getCurrentTopic() {
    const topicres = await fetch(url + '/current-topic', {
      method: 'GET'
    });
  
    const topicPayload = await topicres.json();
  
    var topic = JSON.parse(JSON.stringify(topicPayload['recordset'][0]));
  
    topic.DueDateText = parseDateText(new Date(topic.DueDate));
    topic.CreatedText = parseSimpleDateText(new Date(topic.Created));
  
    return topic;
}
  
// Returns a list of all topics from the database
// NOTE: excludes the current topic?  The API could use a more descriptive rename if this is the case.
export async function getAllTopics() {
    const topicsres = await fetch(url + '/all-topics', {
      method: 'GET'
    });
  
    const topicsPayload = await topicsres.json();
  
    const recordSet = topicsPayload["recordset"];
    var topics = [];
    for (var i = 0; i < recordSet.length; i++) {
      var topic = JSON.parse(JSON.stringify(recordSet[i]));
      topic.DueDateText = parseDateText(new Date(topic.DueDate));
      topic.CreatedText = parseSimpleDateText(new Date(topic.Created));
      topics.push(topic);
    }
  
    return topics;
}

// Is this redundant?  (I'm not entirely sure what it does yet...)
// Does it return a different set of meetings than the getAppointments() method?
// Either way, it's likely we can split it up into smaller methods.
export async function checkMeetingsHome() {

    console.log("Checking Upcoming Appointments For Home...")
  
    var meetings = [];
    var pairs = [];
    var user = getCurrentUser();
    // var user = JSON.parse(await AsyncStorage.getItem('User'));
  
    const appres = await fetch(url + '/pair/' + user.id, {
      method: 'GET'
    });
    const appPayload = await appres.json();
  
    pairs = appPayload['recordset'];
    // Get appointments for each pair the user is a part of.
    for (var i = 0; i < pairs.length; i++) {
      const pairId = pairs[i].Id;
      const menteeId = pairs[i].MenteeId;
      const getres = await fetch(url + '/appointment/past/' + pairId, {
        method: 'GET'
      });
      const getPayload = await getres.json();
      if (getPayload.rowsAffected !== 0) {
        // Add each appointment to the meetings array with other necessary data.
        for (var j = 0; j < getPayload.rowsAffected; j++) {
          var meeting = JSON.parse(JSON.stringify(getPayload['recordset'][j]));
          let date = new Date(meeting.ScheduledAt);
          let cur = new Date();
          meeting.updated = false;
  
          // Check if we should process this meeting (user should be Mentee, meeting should be newly Done)...
          if (menteeId === user.id && cur > date && meeting.Status === 'Scheduled') {
            meeting.updated = true;
            const statusupdateres = await fetch(url + '/update-appointment-status', {
              method: 'POST',
              body: JSON.stringify({
                Id: meeting.Id,
                Status: 'Done'
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).catch((error) => {
              console.error(error);
            });
  
            meeting.Status = 'Done';
            meeting.dateText = parseDateText(date);
  
            // Get mentor/mentee avatar, and mark whether this user is the mentor/mentee, and provide title/prompt text.
            meeting.titleText = "Mentor Meeting";
            const avres = await fetch(url + "/user/id/" + pairs[i].MentorId, {
              method: 'GET'
            });
            const avPayload = await avres.json();
            meeting.Avatar = avPayload['recordset'][0].Avatar;
            meeting.MentorFirstName = avPayload['recordset'][0].FirstName;
  
            // Get associated topic information and store it.
            const topicres = await fetch(url + "/topic/" + meeting.TopicId, {
              method: 'GET'
            });
            const topicPayload = await topicres.json();
  
            meeting.topic = topicPayload['recordset'][0];
            meeting.topic.dueDateText = parseDateText(new Date(meeting.topic["DueDate"]));
          }
  
          meetings.push(meeting);
  
        }
  
      }
  
    }
  
    return meetings; 
}

// I'm certain this can be broken up into smaller, more descriptive methods.
// (It takes up half of the API file, after all)
export async function getAppointments(type) {

    console.log("Getting Appointments...")
  
    var meetings = [];
    var pairs = [];
    var user = JSON.parse(await AsyncStorage.getItem('User'));
  
    const appres = await fetch(url + '/pair/' + user.id, {
      method: 'GET'
    });
    const appPayload = await appres.json();
  
    pairs = appPayload['recordset'];
  
    // Get appointments for each pair the user is a part of.
    for (var i = 0; i < pairs.length; i++) {
      const getres = await fetch(url + '/appointment/' + type + "/" + pairs[i].Id, {
        method: 'GET'
      });
      const getPayload = await getres.json();
  
      if (getPayload.rowsAffected !== 0) {
        // Add each appointment to the meetings array with other necessary data.
        for (var j = 0; j < getPayload.rowsAffected; j++) {
          var meeting = JSON.parse(JSON.stringify(getPayload['recordset'][j]));
          let date = new Date(meeting.ScheduledAt);
          let cur = new Date();
          //Check if Status needs to be updated due to this meeting happening.
          if (type === 'past' && cur > date && meeting.Status === 'Scheduled') {
            const statusupdateres = await fetch(url + '/update-appointment-status', {
              method: 'POST',
              body: JSON.stringify({
                Id: meeting.Id,
                Status: 'Done'
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            }).catch((error) => {
              console.error(error);
            });
            meeting.Status = 'Done';
          }
  
          meeting.dateText = parseDateText(date);
  
          meeting.buttonDisabled = false;
          switch(meeting.Status) {
            case 'Pending':
            meeting.meetingStatus = {
              textAlign:"right",
              color: '#003F87'
            }
            break;
            case 'Scheduled':
            meeting.meetingStatus = {
              textAlign:"right",
              color: colors.green
            }
            break;
            case 'Done':
            meeting.meetingStatus = {
              textAlign:"right",
              color: colors.green
            }
            break;
            case 'Completed':
            meeting.meetingStatus = {
              textAlign:"right",
              color: colors.green
            }
            break;
            case 'Cancelled':
            meeting.meetingStatus = {
              textAlign:"right",
              color: colors.red
            }
            break;
            case 'Missed':
            meeting.meetingStatus = {
              textAlign:"right",
              color: colors.red
            }
            break;
          }
          // Get mentor/mentee avatar, and mark whether this user is the mentor/mentee, and provide title/date text.
          if (pairs[i].MentorId === user.id) {
            meeting.isMentor = true;
            meeting.titleText = "Mentee Meeting";
            const avres = await fetch(url + "/user/id/" + pairs[i].MenteeId, {
              method: 'GET'
            });
            const avPayload = await avres.json();
            meeting.Avatar = avPayload['recordset'][0].Avatar;
            meeting.summaryTitle = "Reflect on your conversation with " + avPayload['recordset'][0].FirstName + ":";
            switch(meeting.Status) {
              case 'Pending':
                meeting.meetingButton = {
                  padding: 15,
                  backgroundColor: colors.vikingBlue
                }
                meeting.meetingButtonText = {
                  textAlign: 'center',
                  fontSize:16,
                  color: '#fff'
                }
                meeting.buttonText = 'Accept Meeting Time';
                meeting.buttonPress = 'accept';
                break;
              case 'Scheduled':
                meeting.meetingButton = {
                  padding: 15,
                  backgroundColor: colors.red
                }
                meeting.meetingButtonText = {
                  textAlign: 'center',
                  fontSize:16,
                  color: '#fff'
                }
                meeting.buttonText = 'Cancel Meeting';
                meeting.buttonPress = 'cancel';
                break;
              case 'Done':
              meeting.meetingButton = {
                width: 0,
                height: 0
              }
              meeting.meetingButtonText = {
                textAlign: 'center'
              }
              meeting.buttonText = '';
              meeting.buttonPress = ''; meeting.buttonDisabled = true;
                break;
              case 'Completed':
                meeting.meetingButton = {
                  width: 0,
                  height: 0
                }
                meeting.meetingButtonText = {
                  textAlign: 'center'
                }
                meeting.buttonText = '';
                meeting.buttonPress = ''; meeting.buttonDisabled = true;
                break;
              case 'Cancelled':
                meeting.meetingButton = {
                  width: 0,
                  height: 0
                }
                meeting.meetingButtonText = {
                  textAlign: 'center'
                }
                meeting.buttonText = '';
                meeting.buttonPress = ''; meeting.buttonDisabled = true;
                break;
              case 'Missed':
                meeting.meetingButton = {
                  width: 0,
                  height: 0
                }
                meeting.meetingButtonText = {
                  textAlign: 'center'
                }
                meeting.buttonText = '';
                meeting.buttonPress = ''; meeting.buttonDisabled = true;
                break;
            }
          } else {
            meeting.isMentor = false;
            meeting.titleText = "Mentor Meeting";
            const avres = await fetch(url + "/user/id/" + pairs[i].MentorId, {
              method: 'GET'
            });
            const avPayload = await avres.json();
            meeting.Avatar = avPayload['recordset'][0].Avatar;
            meeting.summaryTitle = "Reflect on your conversation with " + avPayload['recordset'][0].FirstName + ":";
            switch(meeting.Status) {
              case 'Pending':
                meeting.meetingButton = {
                  padding: 15,
                  backgroundColor: colors.vikingBlue
                }
                meeting.meetingButtonText = {
                  textAlign: 'center',
                  fontSize:16,
                  color: '#fff'
                }
                meeting.buttonText = 'Waiting for Mentor to Confirm...';
                meeting.buttonPress = ''; meeting.buttonDisabled = true;
                break;
              case 'Scheduled':
                meeting.meetingButton = {
                  padding: 15,
                  backgroundColor: colors.red
                }
                meeting.meetingButtonText = {
                  textAlign: 'center',
                  fontSize:16,
                  color: '#fff'
                }
                meeting.buttonText = 'Cancel Meeting';
                meeting.buttonPress = 'cancel';
                break;
              case 'Done':
                meeting.meetingButton = {
                  padding: 15,
                  backgroundColor: colors.yellow
                }
                meeting.meetingButtonText = {
                  textAlign: 'center',
                  fontSize:16,
                  color: '#fff'
                }
                meeting.buttonText = 'Write Summary';
                meeting.buttonPress = 'submitSummary';
                break;
              case 'Completed':
                meeting.meetingButton = {
                  padding: 15,
                  backgroundColor: colors.green
                }
                meeting.meetingButtonText = {
                  textAlign: 'center',
                  color:'#fff'
                }
                meeting.buttonText = 'Edit Summary';
                meeting.buttonPress = 'editSummary';
                break;
              case 'Cancelled':
                meeting.meetingButton = {
                  width: 0,
                  height: 0
                }
                meeting.meetingButtonText = {
                  textAlign: 'center'
                }
                meeting.buttonText = '';
                meeting.buttonPress = ''; meeting.buttonDisabled = true;
                break;
            }
          }
  
          meetings.push(meeting);
  
        }
  
      }
  
    }
  
    meetings.sort((a,b) => new Date(b.dateText) - new Date(a.dateText));
  
    //console.log(type + " meetings: " + JSON.stringify(meetings));
    return meetings;
}