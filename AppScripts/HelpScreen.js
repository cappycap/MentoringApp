




import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {styles, colors, mainTitleWidth} from './Styles.js';

// Now has an independent titlebar housed within render, since it only has a single back button.
export default class HelpScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        refreshing : false
      };
    }
  
    render () {
      return <View>
        <View>
          <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
          <View style={{height:30, backgroundColor: colors.white}}></View>
          <View style={{flexDirection:'row', backgroundColor: colors.white, alignItems:'center'}}>
            <TouchableOpacity 
                  style={{marginLeft:15,width:30}} 
                  onPress={() => this.props.navigation.navigate('SettingsModal')} 
                  activeOpacity={0.5}>
              <IonIcon type='Ionicons' name='ios-arrow-back' size={30} color={colors.vikingBlue} />
            </TouchableOpacity>
            <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
              <Text style={{fontSize:22}}>Help</Text>
            </View>
          </View>
          <View style={{height:30, backgroundColor: colors.white}}></View>
        </View>
        <ScrollView style={{marginBottom:80}}>
          <View style={{height:30}} />
          <View style={styles.helpContainer}>
          <Text style={styles.helpPara}>This app servers to schedule meetings between mentor-mentee pairs
          and allows users to write summaries for how each meeting went.{"\n"}{"\n"}</Text>
          <Text style={styles.helpTitle}>Home</Text>
          <Text style={styles.helpPara}>
          After an admin has assigned you a mentor and/or mentee, their profile will be
          viewable here. Tap on a user to view contact info and schedule a meeting, if they are your mentor.
          {"\n"}{"\n"}
          </Text>
          <Text style={styles.helpTitle}>Meetings</Text>
          <Text style={styles.helpPara}>
            Meetings have several status types to inform you of your progression.
            {"\n"}{"\n"}
            <Text style={styles.helpPending}>Pending</Text>
            {"\n"}
            At this stage, a mentee has proposed a meeting from Home and the mentor needs to approve it.
            {"\n"}
            <IonIcon name="ios-arrow-down" size={30} color="#000" />
            {"\n"}
            <Text style={styles.helpGreen}>Scheduled</Text>
            {"\n"}
            After the mentor accepts the proposed meeting time, it will be Scheduled. The pair should communicate to establish
            how they will meet now that they have an agreed time.
            {"\n"}
            <IonIcon name="ios-arrow-down" size={30} color="#000" />
            {"\n"}
            <Text style={styles.helpGreen}>Done</Text>
            {"\n"}
            When returning to the Meetings screen after the agreed upon time, the meeting will be Done.
            At this point, the mentee should tap on Write Summary to submit a recap of the meeting. Only the mentee writes a summary!
            {"\n"}
            <IonIcon name="ios-arrow-down" size={30} color="#000" />
            {"\n"}
            <Text style={styles.helpGreen}>Completed</Text>
            {"\n"}
            After a summary is submitted, a meeting is marked as Completed. Mentees can still make summary edits if they wish, but it's not necessary.
            {"\n"}
            <IonIcon name="ios-arrow-down" size={30} color="#000" />
            {"\n"}
            <Text style={styles.helpCancelled}>Cancelled</Text>
            {"\n"}
            Both the mentor and mentee have the option to cancel a meeting before it happens.
            {"\n"}
            <IonIcon name="ios-arrow-down" size={30} color="#000" />
            {"\n"}
            <Text style={styles.helpCancelled}>Missed</Text>
            {"\n"}
            A meeting can be marked as missed during a summary debrief after the meeting time has passed.
            {"\n"}{"\n"}
          </Text>
          <Text style={styles.helpTitle}>Topic</Text>
          <Text style={styles.helpPara}>View meeting topics for each month here. When you create a meeting proposal, it is tied to the active topic,
          and that topic will be displayed as a reminder when you go to complete your summary.
          {"\n"}{"\n"}{"\n"}{"\n"}</Text>
          </View>
        </ScrollView>
      </View>
    }
  }