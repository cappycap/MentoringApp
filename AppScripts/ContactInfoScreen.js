



import React from 'react';
import {Alert, View, TouchableOpacity, Text, Image, AsyncStorage} from 'react-native';
import Button from 'react-native-button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BackTitleBarContact} from './ScreenComponents.js';
import {styles, colors} from './Styles.js';
import {getCurrentUser, getContactInfoOf, createMeeting} from './API.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class ContactInfoScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        refreshing : true,
        contactInfo : []
      };
    }

    componentDidMount() {
      if (this.state.refreshing) {
        this.setContactInfo()
      }
    }

    async setContactInfo() {

      console.log("setting contact info...");

      var newCI = [];
      var doSetAsyncStorage = false;
      const userID = this.props.route.params.user.Id;
      // console.warn(userID);

      console.log('uid: ' + userID);

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

      newCI.map( (info) => {
          switch(info.ContactType) {
            case 'Email':
            info.ContactIcon = 'ios-mail';
            break;
            case 'Phone':
            info.ContactIcon = 'ios-phone-portrait';
            break;
          }
      })

      this.setState({refreshing: false, contactInfo: newCI});
    }

    showModal() {
      this.setState({modalVisible:true});
    };

    hideModal() {
      this.setState({modalVisible:false});
    };

    async handleConfirm(date) {
      var user = JSON.parse(await AsyncStorage.getItem('User'));
      console.log(this.props.route.params.user.Id + " " + user.id);
      createMeeting(this.props.route.params.user.Id, user.id, date);
      this.hideModal();
      this.props.navigation.navigate('Meetings');
    };

    infoItem(info) {
      return (<View>
        <TouchableOpacity style={styles.contactRow}>
          <View style={styles.contactIconContainer}>
            <IonIcon type='Ionicons' name={info.ContactIcon} size={30} color={colors.vikingBlue} />
          </View>
          <View style={styles.contactRowText}>
            <Text style={styles.contactRowType}>{ info.ContactType }</Text>
            <Text style={styles.contactRowValue}>{ info.ContactValue }</Text>
          </View>
        </TouchableOpacity>
      </View>);
    }

    displayCI(cInfo) {

      const user = this.props.route.params.user;
      const type = this.props.route.params.type;

      return(
        <View style={styles.contactContainer}>
            <View style={{flexGrow: 1}}>
                <Image style={styles.contactAvatar} source={{uri: user.Avatar}} />
                <Text style={styles.contactName}>{ user.FirstName + " " + user.LastName }</Text>
                <View style={user.homeBoxStyle}>
                  <Text style={styles.contactTag}>{ type } </Text>
                </View>
            </View>
            <View style={styles.contactText}>
                { console.log(JSON.stringify(cInfo)) }
                { cInfo.map( (info) => {
                    return this.infoItem(info);
                })}
            </View>
            <Button
              containerStyle={user.contactButtonStyle}
              style={styles.summaryButtonText}
              minimumDate={new Date(2021, 12, 12)}
              onPress={() => this.showModal()}
              disabled={user.contactButtonStatus}>
                Propose Meeting
            </Button>
        </View>
      );
    }

    render() {

      console.log("Rendering Contact Info Screen...");

      return (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor:'#fff'}}>
          <BackTitleBarContact title="Contact Info" navigation={this.props.navigation} />
          { this.displayCI(this.state.contactInfo) }
          <DateTimePickerModal style={styles.dateTimeBox}
            isVisible={this.state.modalVisible}
            mode="datetime"
            onConfirm={(date) => this.handleConfirm(date)}
            onCancel={() => this.hideModal()}
          />
        </View>
      );
    }
}
