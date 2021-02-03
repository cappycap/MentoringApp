import 'react-native-gesture-handler';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal, TouchableHighlight, Switch, RefreshControl, Animated, Linking, TouchableOpacity, AsyncStorage, StyleSheet, Text, Image, SafeAreaView, ScrollView, View, ActivityIndicator, StatusBar, Dimensions, Alert, TextInput } from 'react-native';
import LinkedInModal from 'react-native-linkedin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { color, debug } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from 'react-native-button';
import { SystemMessage } from 'react-native-gifted-chat';

// Needs to be implemented:
// import Storage from './localstorage';


// Basically Global Variables and Constants
// accountType: 0 - not verified, please wait until admins pair you with mentor/mentees
//              1 - verified, check for conversations to display
// const accountType = Storage.getItem('accountType');
const accountID = 1;
const accountType = 0;
const url = "http://mshipapp2.loca.lt";
var curUser;


// Navigation controllers
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// || CodeSplitting Plan ||
// 
// 1) Move all non-Stack and non-Tab classes and methods into separate files. *DONE*
//    - This file should only contain what is needed for navigation or for global access.
// 2) Finish Refactoring all of those classes and methods using "import".  *NOT STARTED*
// 3) Using this New Refactored code to look for code w/ low readability.
//    - Basically, can you understand what this code is doing at a glance?
// 
// || Things to Think About ||
// 
// 1) We're currently writing code that could be used and maintained by the CS Department for Years to Come
//    - As such, we should be finding every opportuntity to make that process easy and not a pain in the ass.
// 2) It should be easy enough to not couple our Screens w/ one another, since React Navigation has us covered.
// 3) We should really be splitting large methods into smaller, readable and reusable portions whenever possible.
//    - This is generally good practice even if code is only used once.
//    - The only time to not do this is for small tasks that are incredibly specific.
//    - Examples of when to always do it:
//        + API GET and POST methods
//        + Commonly Used UI Structures
//        + Common Parsing or Calculations (Such as with Dates)


// 1. MEASUREMENTS AND STYLES ARE LOCATED IN THE Styles.js FILE

// 2. API GET AND POST METHODS ARE NOW LOCATED IN THE API.js FILE

// 3. HOME SCREEN CLASS NOW IN THE HomeScreen.js FILE

// 4. ContactInfoScreen CLASS NOW IN THE ContactInfoScreen.js FILE

// 5. Date Parsing methods now in the Helper.js file.

// 6. MeetingScreen class now in the MeetingsScreen.js file.

// 7. WriteSummaryScreen class now in the WriteSummaryScreen.js file.

// 8. ProposeMeetingScreen class now in the ProposeMeetingScreen.js file.

// 9. TopicsScreen class now in the TopicsScreen.js file.

// 10. HelpScreen class now in the HelpScreen.js file.

// 11. SplashScreen class now in the SplashScreen.js file.

// 12. LoginScreen class now in the LoginScreen.js file.

// 13. PrivacyScreen class now in the PrivacyScreen.js file.

// 14. SettingsScreen class now in the SettingsScreen.js file.


// HOME STACK
function HomeStack() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                    ? 'ios-home'
                    : 'ios-home';
                } else if (route.name === 'Meetings') {
                    iconName = focused ? 'ios-calendar' : 'ios-calendar';
                } else if (route.name === 'Topics') {
                    iconName = focused ? 'ios-bulb' : 'ios-bulb';
                }

                return <IonIcon name={iconName} size={size} color={color} />;
            }
        })}
        tabBarOptions={{
            activeTintColor: colors.vikingBlue,
            inactiveTintColor: 'gray',
            showLabel: false
        }}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Meetings" component={MeetingsScreen} />
        <Tab.Screen name="Topics" component={TopicsScreen} />
    </Tab.Navigator>
  );
}


// APP CONTAINER
// Main class for app. Responsible for rendering app container.
export default class AppContainer extends React.Component {

  // Main rendering function. Always begins on the SplashScreen.
  // Note: The Login and Privacy screens have been added to the Stack Navigator.
  //        I found that React Navigation creates problems when trying to pass along state.
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator headerMode='none' initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Privacy' component={PrivacyScreen} />
            <Stack.Screen name='Main' component={HomeStack} />
            <Stack.Screen name='SettingsModal' component={SettingsScreen} />
            <Stack.Screen name='HelpModal' component={HelpScreen} />
            <Stack.Screen name='ProposeMeeting' component={ProposeMeetingScreen} />
            <Stack.Screen name='WriteSummary' component={WriteSummaryScreen} />
            <Stack.Screen name='ContactInfo' component={ContactInfoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }

};
