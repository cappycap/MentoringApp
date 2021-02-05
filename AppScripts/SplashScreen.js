


import React from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {getCurrentUser} from './API.js';

// SPLASH SCREEN

// For checking user login status...
export default class SplashScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        refreshing : false,
        'value': false
      };
    }
  
    componentDidMount = () => AsyncStorage.getItem('Email').then((value) => this.setSkipValue(value));
  
    async setSkipValue (value) {
      this.setState({ 'value': value });
      if (value !== null) {
        curUser = await getCurrentUser(value);
        await AsyncStorage.setItem('User', JSON.stringify(curUser));
      }
    }
  
    render () {

      if (this.state.value !== null) {
        this.props.navigation.navigate('Main');
      } else {
        this.props.navigation.navigate('Login');
      }
      return (
        <View style={{textAlign:'center',alignItems:'center'}}>
          <Text style={{fontSize:22}}>MentoringApp</Text>
        </View>
      )
    }
  
  };