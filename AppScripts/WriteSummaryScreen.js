



import React from 'react';
import {View, Text, Button, ScrollView, TouchableOpacity, TextInput, Animated} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles, colors} from './Styles.js';
import {} from './API.js';

export default class WriteSummaryScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        storageId: '',
        normalId: -1,
        type: '',
        curSummary: '',
        summaryTitle: '',
        fadeOut: new Animated.Value(0),
        topic: []
      }
    }
  
    handleBack() {
      this.props.route.params.onGoBack();
      this.props.navigation.goBack();
     }
  
    componentDidMount() {
      const id = this.props.route.params.id;
      const topicId = this.props.route.params.topicId;
      const type = this.props.route.params.type;
      const summaryTitle = this.props.route.params.summaryTitle;
      const storageId = 'summary_' + id;
      this.setState({storageId:storageId,normalId:id,topicId:topicId,type:type,summaryTitle:summaryTitle});
      AsyncStorage.getItem(storageId).then((value) => this.setSkipValue(value, id, type));
    }
  
    getData() {
      retTopic(this.state.topicId)
      .then((data) => {
        this.setState({
          topic:data
        })
      });
    }
  
    async setSkipValue (value, id, type) {
      if (value !== null) {
        this.setState({ 'curSummary': value });
      } else {
        if (type === 'edit') {
          const summaryres = await fetch(url + '/summary/appointment/' + id, {
            method: 'GET'
          });
          const summaryPayload = await summaryres.json();
          var summary = summaryPayload['recordset'][0].SummaryText;
          this.setState({ 'curSummary': summary });
        } else {
          this.setState({ 'curSummary': '' });
        }
      }
    }
  
    async saveSummary (text) {
      this.setState({'curSummary': text});
      await AsyncStorage.setItem(this.state.storageId, text);
    }
  
    async handleSubmit() {
      const user = JSON.parse(await AsyncStorage.getItem('User'));
      if (this.state.type === 'submit') {
        // post insert
        const postres = fetch (url + '/create-summary', {
          method: 'POST',
          body: JSON.stringify({
            AppointmentId: this.state.normalId,
            SummaryText: this.state.curSummary,
            UserId: user.id
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .catch((error) => {
          console.error(error);
        });
        const statusupdateres = await fetch(url + '/update-appointment-status', {
          method: 'POST',
          body: JSON.stringify({
            Id: this.state.normalId,
            Status: 'Completed'
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .catch((error) => {
          console.error(error);
        });
      } else {
        // post update
        const postres = fetch (url + '/update-summary', {
          method: 'POST',
          body: JSON.stringify({
            AppointmentId: this.state.normalId,
            SummaryText: this.state.curSummary,
            UserId: user.id
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
      this.fadeOut();
    }
  
    fadeOut() {
      this.setState({ fadeOut: new Animated.Value(1), type:'edit' },
      () => {
        Animated.timing(
          this.state.fadeOut,
          {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
          }
        ).start();
      })
    }
  
    async markMissedMeeting(id) {
      // Mark Appointment as 'Missed'
      const statusupdateres = await fetch(url + '/update-appointment-status', {
        method: 'POST',
        body: JSON.stringify({
          Id: id,
          Status: 'Missed'
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .catch((error) => {
        console.error(error);
      });
      // Delete any summary the user may have submitted accidentally...
      const user = JSON.parse(await AsyncStorage.getItem('User'));
      const postres = fetch (url + '/delete-summary', {
        method: 'POST',
        body: JSON.stringify({
          AppointmentId: id,
          UserId: user.id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .catch((error) => {
        console.error(error);
      });
      this.handleBack();
    }
  
    markMissedAlert(id) {
      Alert.alert(
        "Mark as Missed?",
        "If you or your mentor were unable to attend this meeting, mark it as missed.",
        [
          {
            text: "Nevermind",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Confirm", onPress: () => this.markMissedMeeting(id) }
        ],
        { cancelable: false }
      );
    }
  
    render () {
  
      this.getData();
  
      return <View style={{flex:1}}>
        <View>
          <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
          <View style={{height:30, backgroundColor: colors.white}}></View>
          <View style={{flexDirection:'row', backgroundColor: colors.white, alignItems:'center'}}>
            <TouchableOpacity style={{marginLeft:15,width:30}} onPress={() => this.handleBack()} activeOpacity={0.5}>
              <IonIcon type='Ionicons' name='ios-arrow-back' size={30} color={colors.vikingBlue} />
            </TouchableOpacity>
            <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
              <Text style={{fontSize:18}}>Edit Summary</Text>
            </View>
            <TouchableOpacity onPress={() => this.markMissedAlert(this.state.normalId)} activeOpacity={0.5}>
                <IonIcon name="ios-trash" size={30} color={colors.red} />
            </TouchableOpacity>
          </View>
          <View style={{height:30, backgroundColor: colors.white}}></View>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.reminderText}>Review this meeting's topic then scroll down:</Text>
          <View style={styles.topicContainer}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicTitleText}>{this.state.topic.Title}</Text>
              <Text style={styles.topicHeaderDateText}>{this.state.topic.createdText}</Text>
            </View>
            <View style={styles.topicInfo}>
              <Text style={styles.topicDateText}>Due: {this.state.topic.dueDateText}</Text>
              <Text>{this.state.topic.Description}</Text>
            </View>
          </View>
          <Text style={styles.summaryTitle}>{this.state.summaryTitle}</Text>
          <View style={styles.summaryInputBox}>
          <TextInput
          multiline
          numberOfLines={6}
          style={styles.summaryInput}
          onChangeText={text => this.saveSummary(text)}
          value={this.state.curSummary} />
          </View>
          <Button
            containerStyle={styles.summaryButton}
            style={styles.summaryButtonText}
            onPress={() => this.handleSubmit()}>
            Save
          </Button>
          <Animated.View style={{opacity: this.state.fadeOut}}>
            <View style={styles.savedNotification}>
              <Text style={{textAlign: 'center'}}>Summary saved!</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    }
}