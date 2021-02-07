




import React from 'react';
import {View, Text, Button, Image, ScrollView, RefreshControl} from 'react-native';
import {TitleBar} from './ScreenComponents.js';
import {styles, colors} from './Styles.js';
import {getAllTopics, getCurrentTopic} from './API.js';

// Topic Screen -- for displaying a list of all current and past monthly topics.
export default class TopicsScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        shouldUpdate: true,
        topics: [],
        currentTopic: null,
        refreshControl: true
      };
    }
  
    async setTopics() {
      var newTopics = [];
      var newCurrentTopic = null;
      var doSetAsyncStorage = false;
  
      try {
        newTopics = await getAllTopics();
        newCurrentTopic = await getCurrentTopic();
        doSetAsyncStorage = true;
      } catch (error) {
        console.log(error);
        try {
          const tempTopics = JSON.parse(await AsyncStorage.getItem('Topics'));
          const tempCurrentTopic = JSON.parse(await AsyncStorage.getItem('CurrentTopic'));
          if (tempTopics != null && Array.isArray(tempMentors)) {
            newTopics = tempTopics;
          }
          if (tempCurrentTopic != null) {
            newCurrentTopic = tempCurrentTopic;
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      if (doSetAsyncStorage) {
        try {
          await AsyncStorage.setItem('Topics', JSON.stringify(newTopics));
          await AsyncStorage.setItem('CurrentTopic', JSON.stringify(newCurrentTopic));
        } catch (error) {
          console.log(error);
        }
      }
  
      this.setState({refreshControl:false, shouldUpdate: false, topics: newTopics, currentTopic: newCurrentTopic});
    }
  
    topicItem(topic) {
  
      return (
        <View style={styles.topicContainer}>
          <View style={styles.topicHeader}>
            <Text style={styles.topicTitleText}>{topic.Title}</Text>
            <Text style={styles.topicHeaderDateText}>{topic.CreatedText}</Text>
          </View>
          <View style={styles.topicInfo}>
            <Text style={styles.topicDateText}>Due: {topic.DueDateText}</Text>
            <Text>{topic.Description}</Text>
          </View>
        </View>
      );
    }
  
    onRefresh() {
      this.setState({refreshControl:true});
      this.setTopics();
    }
  
    render () {
  
      if (this.state.shouldUpdate) {
        this.setTopics();
      }
  
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TitleBar 
              title="Topics" 
              navFunction={() => this.props.navigation.navigate('SettingsModal')}
              navigation={this.props.navigation} />
          <ScrollView
            refreshControl={
                <RefreshControl refreshing={this.state.refreshControl} onRefresh={this.onRefresh.bind(this)} />
              }>
            <View style={styles.meetingsGroup}>
              <Text style={styles.meetingsTitle}>Current Topic</Text>
            </View>
            {
              this.state.currentTopic != null ? this.topicItem(this.state.currentTopic) : <View/>
            }
            <View style={styles.meetingsGroup}>
              <Text style={styles.meetingsTitle}>All Topics</Text>
            </View>
            {
              this.state.topics.map( (topic) => {
                return this.topicItem(topic);
              })
            }
          </ScrollView>
        </View>
      );
    }
}