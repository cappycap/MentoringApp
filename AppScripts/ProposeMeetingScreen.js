



import React from 'react';
import {View, Text, Button, Image, AsyncStorage} from 'react-native';
import {BackTitleBar, SettingsModal} from './ScreenComponents.js';
import {styles, colors} from './Styles.js';
import {getContactInfoOf} from './API.js';

export default class ProposeMeetingScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        refreshing : true,
        contactInfo : []
      };
    }
  
    async setContactInfo() {
      var newCI = [];
      var doSetAsyncStorage = false;
      const userID = this.props.route.params.user.Id;
      // console.warn(userID);
  
      try {
        newCI = await getContactInfoOf(userID);
        doSetAsyncStorage = true;
  
      } catch (error) {
        console.log(error);
        try {
          var tempCI = JSON.parse(await AsyncStorage.getItem('ContactInfo/' + userID));
          if (tempCI != null && Array.isArray(tempCI)) {
            newCI = tempCI;
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      // Save mentor/mentee info from the database into local storage, for when you're offline.
      if (doSetAsyncStorage) {
        try {
          await AsyncStorage.setItem('ContactInfo/' + userID, JSON.stringify(newCI));
        } catch (error) {
          console.log(error);
        }
      }
  
      this.setState({refreshing: false, contactInfo: newCI});
    }
  
    infoItem(info) {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>{ info.ContactType }</Text>
          <Text>{ info.ContactValue }</Text>
        </View>
      );
    }
  
    displayCI(cInfo) {
  
      const user = this.props.route.params.user;
      const type = this.props.route.params.type;
  
      return(
        <View style={{justifyContent: 'flex-end', alignItems: 'center',paddingTop:25}}>
            <View style={{flexGrow: 1}}>
                <Image style={styles.homeItemAvatar} source={{uri: user.Avatar}} />
                <View style={user.homeBoxStyle}>
                  <Text style={styles.homeTag}>{ type } </Text>
                </View>
            </View>
            <View>
                <Text>{ user.FirstName + " " + user.LastName }</Text>
                { console.log(cInfo) }
                { cInfo.map( (info) => {
                    return this.infoItem(info);
                })}
            </View>
            <Button 
                title="Propose Meeting" 
                onPress={ () => this.props.navigation.navigate('ProposeMeeting', { user: user, type: type })}>
                <View style={user.homeBoxStyle}>
                    <Text style={styles.homeTag}>Propose Meeting</Text>
                </View>
            </Button>
        </View>
      );
    }
  
    render() {
  
      if (this.state.refreshing) {
        this.setContactInfo()
      }
  
      console.log("Rendering Propose Meeting Screen...");
  
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <BackTitleBar title="Propose Meeting" 
            navFunction={() => this.props.navigation.navigate('SettingsModal')} 
            navigation={this.props.navigation} />
          { this.displayCI(this.state.contactInfo) }
        </View>
      );
    }
}