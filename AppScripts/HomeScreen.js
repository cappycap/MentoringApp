


import React from 'react';
import {AsyncStorage, View, Text, Button, ScrollView, RefreshControl, TouchableOpacity, Image, Modal, TextInput} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {TitleBar} from './ScreenComponents.js';
import {styles, colors} from './Styles.js';
import {getMentorsOf, getMenteesOf, getCurrentUser, checkMeetingsHome, updateAppointmentStatus, createSummary} from './API.js';

// HOME SCREEN
export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        shouldUpdate: true,
        refreshControl: true,
        mentors: [],
        mentees: [],
        meetingPromptModalVisible: false,
        writeSummaryModalVisible: false,
        curSummary: '',
        meeting: {"MentorFirstName":"",
                  "Avatar": "",
                  "Id": "",
                  "topic": {
                    "Title":"",
                    "createdText":"",
                    "dueDateText":"",
                    "Description":""
                  }}
      };
    }  
  
    async componentDidMount() {
      if (this.state.shouldUpdate) {
        this.setPairs();
        var meetings = await checkMeetingsHome();
        if (meetings && meetings.length > 0) {
          for (var meetingC = 0; meetingC < meetings.length; meetingC++) {
            if (meetings[meetingC].updated == true) {
              this.setState({meeting:meetings[meetingC],meetingPromptModalVisible:true});
              meetingC = meetings.length;
            }
          }
        }
      }
    }
  
    async setPairs() {
  
      var newMentors = [];
      var newMentees = [];
      var doSetAsyncStorage = false;
  
      try {
  
        const curUser = await getCurrentUser();
        newMentors = await getMentorsOf(curUser.id);
        newMentees = await getMenteesOf(curUser.id);
        doSetAsyncStorage = true;
  
      } catch (error) {
        console.log(error);
        try {
          var tempMentors = JSON.parse(await AsyncStorage.getItem('Mentors'));
          var tempMentees = JSON.parse(await AsyncStorage.getItem('Mentees'));
  
          if (tempMentors != null && Array.isArray(tempMentors)) {
            newMentors = tempMentors;
          }
          if (tempMentees != null && Array.isArray(tempMentees)) {
            newMentees = tempMentees;
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      // Save mentor/mentee info from the database into local storage, for when you're offline.
      if (doSetAsyncStorage) {
        try {
          await AsyncStorage.setItem('Mentors', JSON.stringify(newMentors));
          await AsyncStorage.setItem('Mentees', JSON.stringify(newMentees));
        } catch (error) {
          console.log(error);
        }
      }
  
      this.setState({refreshControl: false, shouldUpdate: false, mentors: newMentors, mentees: newMentees});
    }
  
    unapprovedAccount() {
      return (
      <View style={{height:50, width:windowWidth}} />,
      <View style={{width: windowWidth, flexDirection: 'row-reverse', alignItems:'center'}}>
        <View style={{width: 25}} />
        <View style={{width: mainWidth, alignItems:'center', justifyContent:'center'}}>
          <View style={{height: 50}} />
          <Text style={{textAlign:'center', fontSize:22}}>Welcome to the CSWWU Mentors!</Text>
          <View style={{height: 25}} />
          <Text style={{textAlign:'center', fontSize:22}}>Admins are verifying your profile, check back later to be connected with your mentor/mentee.</Text>
        </View>
      </View>
      );
    };
  
    onRefresh() {
      this.setState({refreshControl:true});
      this.setPairs();
    }
  
    async submitModalSummary(id) {
      const user = JSON.parse(await AsyncStorage.getItem('User'));
      // post insert
      createSummary(id, this.state.curSummary, user.id);
      // update appointment status
      updateAppointmentStatus(id, 'Completed')
      // Refresh meetings state
      this.refreshMeetings('')
    }

    async refreshMeetings(curSummary) {
      var meetings = await checkMeetingsHome();
      if (meetings && meetings.length > 0) {
        for (var meetingC = 0; meetingC < meetings.length; meetingC++) {
          if (meetings[meetingC].updated == true) {
            this.setState({curSummary:curSummary,meeting:meetings[meetingC],meetingPromptModalVisible:true});
            meetingC = meetings.length;
          } else if (meetingC == meetings.length-1) {
            this.setState({curSummary:curSummary,writeSummaryModalVisible:false});
          }
        }
      } else {
        this.setState({curSummary:curSummary,writeSummaryModalVisible:false});
      }
    }
  
    async processMeeting(ret, meeting) {
      if (ret == 'missed') {
        // Update meeting in DB
        updateAppointmentStatus(meeting.id, 'Missed');
        // Refresh meeting state
        this.refreshMeetings(this.state.curSummary);
      } else {
        this.setState({writeSummaryModalVisible:true,meetingPromptModalVisible:false});
      }
    }
  
    approvedHome() { // removed accountID from approvedHome() parameters
      return (
        <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column'}}
              refreshControl={
                  <RefreshControl refreshing={this.state.refreshControl} onRefresh={this.onRefresh.bind(this)} />
                }>
          <View style={styles.meetingsGroup}>
            <Text style={styles.meetingsTitle}>Mentors</Text>
          </View>
          {
            this.state.mentors.map( (mentor) => {
              return this.pairItem(mentor, "Mentor");
            })
          }
          <View style={styles.meetingsGroup}>
            <Text style={styles.meetingsTitle}>Mentees</Text>
          </View>
          {
            this.state.mentees.map( (mentee) => {
              return this.pairItem(mentee, "Mentee");
            })
          }
        </ScrollView>
      );
    };
  
    pairItem(otherUser, otherType) {
      return (
        <View>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate('ContactInfo', { user: otherUser, type: otherType })} key={otherUser.Id.toString()} style={styles.homeItem} >
            <View style={styles.homeAvatarColumn}>
              <Image style={styles.homeItemAvatar} source={{uri: otherUser.Avatar}} />
              <View style={otherUser.homeBoxStyle}>
                <Text style={styles.homeTag}>{ otherType } </Text>
              </View>
            </View>
            <View style={styles.homeItemInfo}>
              <Text style={styles.homeItemName}>{otherUser.FirstName + " " + otherUser.LastName}</Text>
              <Text style={styles.homeItemEmail}>{otherUser.Email}</Text>
            </View>
            <View style={styles.homeItemForward}>
              <IonIcon type='Ionicons' name='ios-arrow-forward' size={30} color={colors.vikingBlue}  />
            </View>
          </TouchableOpacity>
        </View>
      );
    };
  
    render() {
      var meeting = this.state.meeting;

      return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TitleBar 
            title="Home" 
            navFunction={() => this.props.navigation.navigate('SettingsModal')}
            navigation={this.props.navigation}/>
        { this.props.route.params.accountType == 1 ? this.unapprovedAccount() : this.approvedHome() }
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.meetingPromptModalVisible}>
          <View style={styles.meetingPromptModalContainer}>
            <Image style={styles.bigAvatar} source={{uri: meeting.Avatar}} />
            <Text style={styles.meetingPromptModalHeader}>Meeting Debrief</Text>
            <Text style={styles.meetingPromptModalText}>Did you have a meeting with { meeting.MentorFirstName }?</Text>
            <Button
              containerStyle={styles.meetingPromptModalConfirm}
              style={styles.summaryButtonText}
              onPress={() => this.processMeeting('confirmed', meeting)}>
              Yes, We Met
            </Button>
            <Button
              containerStyle={styles.meetingPromptModalMissed}
              style={styles.summaryButtonText}
              onPress={() => this.processMeeting('missed', meeting)}>
              Meeting Was Missed
            </Button>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.writeSummaryModalVisible}>
          <View style={styles.writeSummaryModalContainer}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.reminderText}>Review this meeting's topic then scroll down:</Text>
              <View style={styles.topicContainer}>
                <View style={styles.topicHeader}>
                  <Text style={styles.topicTitleText}>{meeting.topic.Title}</Text>
                  <Text style={styles.topicHeaderDateText}>{meeting.topic.createdText}</Text>
                </View>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicDateText}>Due: {meeting.topic.dueDateText}</Text>
                  <Text>{meeting.topic.Description}</Text>
                </View>
              </View>
              <Text style={styles.reminderText}>Reflect on your conversation with { meeting.MentorFirstName }:</Text>
              <View style={styles.summaryModalInputBox}>
              <TextInput
              multiline
              numberOfLines={6}
              style={styles.summaryModalInput}
              onChangeText={text => this.setState({'curSummary': text})}
              value={this.state.curSummary} />
              </View>
              <Button
                containerStyle={styles.submitSummaryModalButton}
                style={styles.summaryButtonText}
                onPress={() => this.submitModalSummary(meeting.Id)}>
                Submit Summary
              </Button>
            </ScrollView>
          </View>
        </Modal>
      </View>
      );
    }
  
}