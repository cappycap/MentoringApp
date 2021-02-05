


import {StyleSheet, Dimensions} from 'react-native';

// measurements and styles

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const windowHeight6 = windowHeight / 6;
export const mainWidth = windowWidth - 60;
export const mainConversationWidth = windowWidth - 130;
export const mainTitleWidth = windowWidth - 90;
export const homeItemWidth = windowWidth - 175;
export const contactRowWidth = windowWidth - 15;

export const colors = {
    vikingBlue: '#003F87',
    white: '#fff',
    lightGrey: '#f6f6f6',
    grey: 'gray',
    red: '#e74c3c',
    green: '#2ecc71',
    yellow: '#f1c40f'
};
  
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    scrollView: {
      color:'#000'
    },
  
    basePrivacyText: {
      fontSize: 12,
      marginTop:10,
      textAlign:"center"
    },
  
    headerPrivacyText: {
      fontSize: 16,
      textAlign:"center"
    },
  
    basePrimaryTextBolded: {
      fontSize: 12,
      textAlign:"center",
      fontWeight: "bold"
    },
  
    titlePrimaryText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign:"center"
    },
  
    headerPrimaryText: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign:"center"
    },
  
    headerSupportPrimaryText: {
      fontSize: 17,
      color: "#95a5a6",
      textAlign: "center"
    },
  
    meetingsTitle: {
      fontSize:30,
      alignSelf:'flex-start',
      marginBottom:25
    },
  
    meetingsPrimaryNone: {
      fontSize:16,
      textAlign:"center"
    },
  
    meetingsGroup: {
      paddingTop: 25,
      paddingLeft: 15,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  
    meeting: {
      marginRight:15,
      marginLeft:15,
      borderRadius:50
    },
  
    meetingInfo: {
      backgroundColor:"white",
      flexDirection:"column",
      padding:15
    },
  
    meetingAvatar: {
      width:60,
      height:60,
      marginRight:10,
      backgroundColor:"#ddd",
      borderRadius:100
    },
  
    meetingMainRow: {
      flexDirection:"row",
      alignItems:"center"
    },
  
    meetingTitleText: {
      fontSize:20
    },
  
    meetingDateText: {
      fontSize:14
    },
  
    summaryInputBox: {
      marginLeft:15,
      marginRight: 15,
      marginTop: 15,
      marginBottom:15,
      paddingTop:5,
      paddingLeft:10,
      paddingRight:10,
      backgroundColor:'#fff'
    },

    summaryInput: {
      height:200,
      backgroundColor:'#fff'
    },
  
    summaryButton: {
      padding: 15,
      borderRadius:4,
      backgroundColor: colors.vikingBlue,
      alignItems:'center',
      marginLeft:15,
      marginRight:15,
      marginBottom:15
    },
  
    summaryButtonText: {
      textAlign: 'center',
      fontSize:16,
      color: '#fff'
    },
  
    summaryTitle: {
      fontSize:16,
      textAlign:'center',
      alignItems:'center'
    },
  
    savedNotification: {
      textAlign:'center',
      width:'100%',
      height:18,
      alignContent:'center',
      justifyContent:'center',
      color:'#000',
      fontSize:18
    },
  
    helpContainer: {
      justifyContent:'center',
      alignItems:'center',
      marginLeft:15,
      marginRight:15
    },
  
    helpTitle: {
      fontSize:20
    },
  
    helpPara: {
      textAlign:'center'
    },
  
    helpPending: {
      fontWeight: 'bold',
      color: '#003F87',
      textAlign:'center'
    },
  
    helpGreen: {
      fontWeight: 'bold',
      color: colors.green,
      textAlign:'center'
    },
  
    helpCancelled: {
      fontWeight: 'bold',
      color: colors.red,
      textAlign:'center'
    },
  
    reminderText: {
      textAlign:'center',
      marginLeft:25,
      marginRight:25,
      marginTop:15,
      marginBottom:15,
      fontSize:16,
    },
  
    topicContainer: {
      marginLeft:15,
      marginRight:15,
      marginBottom:15,
      flexDirection:'column',
      backgroundColor:'#fff'
    },
  
    topicHeader: {
      backgroundColor:colors.vikingBlue,
      color:'#fff',
      padding:10,
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'center'
    },
  
    topicTitleText: {
      color:'#fff',
      fontSize:20
    },
  
    topicHeaderDateText: {
      color:'#fff'
    },
  
    topicInfo: {
      padding:10
    },
  
    topicDateText: {
      marginBottom:10
    },
  
    bigAvatar: {
      width:200,
      height:200,
      borderRadius:200,
      backgroundColor:"#ddd",
      marginBottom:15
    },
  
    settingsName: {
      textAlign:'center',
      fontSize:20,
      paddingBottom:25
    },
  
    homeItem: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor: colors.lightGrey,
      padding:15,
      marginLeft:15,
      marginRight:15
    },
  
    homeItemForward: {
      width:40,
      alignItems:'center',
      justifyContent:'center'
    },
  
    homeItemInfo: {
      width:homeItemWidth,
      flexDirection:'column',
      justifyContent:'center'
    },
  
    homeItemName: {
      fontSize:20
    },
  
    homeItemEmail: {
      fontSize:16
    },
  
    homeItemAvatar: {
      width:75,
      height:75,
      borderRadius:100,
      marginBottom:5
    },
  
    homeMentorBox: {
      borderRadius: 10,
      backgroundColor: colors.green
    },
  
    homeMenteeBox: {
      borderRadius: 10,
      backgroundColor: colors.vikingBlue
    },
  
    homeTag: {
      textAlign: 'center',
      color:'white',
      padding:3,
      fontSize: 12
    },
  
    homeAvatarColumn: {
      alignItems:'center',
      justifyContent:'center',
      marginRight:15
    },
  
    contactAvatar: {
      width:130,
      height:130,
      borderRadius:100,
      marginBottom:10
    },
  
    contactTag: {
      textAlign: 'center',
      color:'white',
      padding:6,
      fontSize: 16
    },
  
    contactContainer: {
      backgroundColor:'#fff',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop:25
    },
  
    contactText: {
      marginTop:20,
      marginBottom:20,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:colors.lightGrey
    },
  
    contactName: {
      fontSize:22,
      textAlign:'center',
      marginBottom:10
    },
  
    contactRow: {
      flexDirection:'row',
      width:windowWidth,
      marginTop:10,
      marginBottom:10
    },
  
    contactIconContainer: {
      width:30,
      marginLeft:25,
      marginRight:10,
      alignItems:'center',
      justifyContent:'center'
    },
  
    contactRowText: {
      flexDirection:'column'
    },
  
    contactRowType: {
      fontSize:16
    },
  
    contactRowValue: {
      fontSize:20
    },
  
    hiddenButton: {
      width:0,
      height:0
    },
  
    logoutButton: {
      padding:12,
      height:45,
      width:"45%",
      overflow:'hidden',
      borderRadius:4,
      backgroundColor: colors.red,
      marginBottom:30
    },
  
    updatePrivacyButton: {
      padding:12,
      height:45,
      width:"45%",
      overflow:'hidden',
      borderRadius:4,
      backgroundColor: colors.vikingBlue,
      marginBottom:30
    },
  
    meetingPromptModalMissed: {
      padding:16,
      width:"55%",
      overflow:'hidden',
      borderRadius:4,
      backgroundColor: colors.red,
      marginBottom:25
    },
  
    meetingPromptModalConfirm: {
      padding:16,
      width:"55%",
      overflow:'hidden',
      borderRadius:4,
      backgroundColor: colors.vikingBlue,
      marginBottom:25
    },
  
    meetingPromptModalContainer: {
      textAlign:'center',
      alignItems:'center',
      width:'100%',
      height:"100%",
      backgroundColor:"#fff",
      justifyContent:'center'
    },
  
    meetingPromptModalHeader: {
      textAlign:'center',
      fontSize:30,
      marginBottom:5
    },
  
    meetingPromptModalText: {
      textAlign:'center',
      fontSize:20,
      width:"80%",
      marginBottom:40
    },
  
    submitSummaryModalButton: {
      padding:16,
      marginLeft:15,
      marginRight:15,
      alignItems:'center',
      overflow:'hidden',
      borderRadius:4,
      backgroundColor: colors.vikingBlue,
      marginBottom:25
    },
  
    writeSummaryModalContainer: {
      backgroundColor:"#fff",
      flex:1
    },
  
    summaryModalInputBox: {
      marginLeft:15,
      marginRight: 15,
      marginTop: 15,
      marginBottom:15,
      paddingTop:5,
      paddingLeft:10,
      paddingRight:10,
      backgroundColor:colors.lightGrey
    },
  
    summaryModalInput: {
      height:200,
      backgroundColor:colors.lightGrey
    },
});