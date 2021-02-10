



import React from 'react';
import {AsyncStorage, View, Button, Image} from 'react-native';
import LinkedInModal from 'react-native-linkedin';
import {styles, colors} from './Styles.js';
import {getCurrentUser} from './API.js';
import {url} from './globals';

// LOGIN AND PRIVACY SCREENS

// A LoginScreen class-- used to help with some state setting problems-- "refreshing" is now within this class' scope.
// Note: the Stack Navigator automatically sets the "navigation" prop, which can be accessed via this.props.navigation.
// The original issue I stumbled across was an attempt to pass a "Type" (a clear remnant of the TypeScript source).
export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props)
      this.isLoggedIn = false;
      this.state = {
        refreshing : false
      };
    }
  
    // Note: passing in handleLogin with "this" inside of a "big-arrow function" ensures handleLogin can make use of the LoginScreen state props.  Mind the this!
    render () {
      const renderButton = () => {
        return (
          <Button
            title="Sign in with LinkedIn"
            containerStyle={{padding:12, height:45, width:"45%", overflow:'hidden', borderRadius:4, backgroundColor: '#003F87'}}
            style={{fontSize: 16, color: 'white'}}
            onPress={() => this.modal.open()}>
          </Button>
        );
      };
      return  <View style={styles.container}>
                <Image style={{width:200, height:200}} source={require('../assets/logo.png')} />
                <View style={{height:20}} />
                <LinkedInModal
                  clientID="86bzo41s6bc4am"
                  clientSecret="O2U1ANijJnQG2E3s"
                  redirectUri="https://cs.wwu.edu/"
                  ref={ref => { this.modal = ref; }}
                  renderButton={renderButton}
                  onSuccess={data => {
                    this.handleLogin(data);
                    if (this.state.id != undefined) {
                      this.props.navigation.navigate('Privacy');
                    }
                  }}
                />
              </View>
    }
  
    // handles fetching of login information; Note: payload contains profile information upon a successful login.
    async handleLogin(data) {
      const { access_token, authentication_code } = data;
  
      if (!authentication_code) {
        this.setState({ refreshing: true });
  
        // get basic profile information
        const response = await fetch('https://api.linkedin.com/v2/me', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          }
        });
        const payload = await response.json();
  
        // get profile picture URL
        const pictureres = await fetch('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))&oauth2_access_token=' + access_token, {
          method: 'GET'
        });
        const picPayload = await pictureres.json();
  
        // get email address
        const emailres = await fetch('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          }
        });
        const emailPayload = await emailres.json();
  
        const email = emailPayload.elements[0]["handle~"].emailAddress;
        const first = payload.localizedFirstName;
        const last = payload.localizedLastName;
        const pic = picPayload.profilePicture["displayImage~"].elements[2].identifiers[0].identifier;
  
        // check if user exists
        const checkres = await fetch(url + '/user/email/' + email, {
          method: 'GET'
        });
        const checkPayload = await checkres.json();
  
        // log user in locally by moving data to AsyncStorage
        try {
          await AsyncStorage.setItem('Email', email);
          await AsyncStorage.setItem('FirstName', first);
          await AsyncStorage.setItem('LastName', last);
          await AsyncStorage.setItem('Avatar', pic);
        } catch (error) {
          console.log(error);
        }
  
        this.setState({ refreshing: false });
  
        // check if this user needs to be added to DB.
        if (checkPayload.rowsAffected == 0) {
  
          postNewUser(email, first, last, pic);
          curUser = await getCurrentUser();
          await AsyncStorage.setItem('User', JSON.stringify(curUser));
          this.props.navigation.navigate('Privacy');
  
        } else {
  
          curUser = await getCurrentUser();
          await AsyncStorage.setItem('User', JSON.stringify(curUser));
  
          this.props.navigation.navigate('Main');
  
        }
  
      } else {
        console.log("Authentication Code Received: " + authentication_code);
      }
    }
  
}