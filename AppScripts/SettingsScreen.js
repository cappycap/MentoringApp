




import React from 'react';
import {View, Text, Button, Image, ScrollView} from 'react-native';
import {BackTitleBarHelp} from './ScreenComponents.js';
import {styles, colors} from './Styles.js';

export default class SettingsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        refreshing: false,
        user: []
      }
    }
  
    logout = () => {
      AsyncStorage.clear();
      this.props.navigation.navigate('Login');
    }
  
    async getUser() {
      const u = JSON.parse(await AsyncStorage.getItem('User'));
      this.setState({user:u});
    }
  
    componentDidMount() {
      this.getUser();
    }
  
    render () {
  
      return <View>
        <BackTitleBarHelp 
            title="Settings" 
            navFunction={() => this.props.navigation.navigate('HelpModal')} 
            navigation={this.props.navigation} />
        <ScrollView style={styles.scrollView}>
          <View style={{justifyContent: 'center',
          alignItems: 'center',paddingTop:25}}>
            <Image style={styles.bigAvatar} source={{uri: this.state.user.avatar}} />
            <Text style={styles.settingsName}>{this.state.user.firstName} {this.state.user.lastName}</Text>
            <Button
              containerStyle={styles.logoutButton}
              style={{fontSize: 16, color: 'white'}}
              onPress={() => this.logout()}>
              Log Out
            </Button>
            <Button
              containerStyle={styles.updatePrivacyButton}
              style={styles.summaryButtonText}
              onPress={() => this.props.navigation.navigate('Privacy')}>
              Update Privacy
            </Button>
            <Text>
              <Text style={styles.basePrivacyText}>MentoringApp v1.0</Text>
            </Text>
            <View style={{height:15}} />
          </View>
        </ScrollView>
      </View>
    }
  }