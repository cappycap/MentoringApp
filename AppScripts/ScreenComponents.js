



import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors, mainTitleWidth} from './Styles.js';

export class SettingsModal extends React.Component {

  render(navFunction, navigation) {
    console.log(typeof colors.vikingBlue);
    console.log(navFunction);
    return (
      <TouchableOpacity style={{width:30,marginRight:15}} onPress={navFunction} activeOpacity={0.5}>
          <IonIcon name="ios-settings" size={30} color={colors.vikingBlue} />
      </TouchableOpacity>
    );
  }
}

// (title, navFunction)

export class TitleBar extends React.Component {
  
  render (title, navFunction, navigation) {
    return (
      <View key={title}>
        <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
        <View style={{flexDirection:'row-reverse', backgroundColor: colors.white, alignItems:'center'}}>
          <SettingsModal navFunction={navFunction} navigation={navigation} />
          <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
            <Text style={{fontSize:22,textAlign:'center'}}>{title}</Text>
          </View>
        </View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
      </View>
    );
  }
};

export class BackTitleBar extends React.Component {
  
  render (title, navFunction, navigation) {
    return (
      <View key={title}>
        <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
        <View style={{flexDirection:'row', backgroundColor: colors.white, alignItems:'center'}}>
          <View style={{width:10}}></View>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
            <IonIcon type='Ionicons' name='ios-arrow-back' size={30} color={colors.vikingBlue} />
          </TouchableOpacity>
          <View style={{width:10}}></View>
          <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
            <Text style={{fontSize:22,textAlign:'center'}}>{title}</Text>
          </View>
          <SettingsModal navFunction={navFunction} navigation={navigation} />
        </View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
      </View>
    );
  }
}

export class HelpModal extends React.Component {
  render (navigation) {
    return (
      <TouchableOpacity style={{width:30,justifyContent:'center'}} onPress={() => navigation.navigate('HelpModal')} activeOpacity={0.5}>
        <IonIcon name="ios-help-circle" size={30} color={colors.vikingBlue} />
      </TouchableOpacity>
    );
  }
}

export class BackTitleBarHelp extends React.Component {
  render (title, navFunction, navigation) {
    return (
      <View key={title}>
        <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
        <View style={{flexDirection:'row', backgroundColor: colors.white, alignItems:'center'}}>
          <TouchableOpacity style={{marginLeft:15,justifyContent:'center',width:30}} onPress={() => navigation.goBack()} activeOpacity={0.5}>
            <IonIcon type='Ionicons' name='ios-arrow-back' size={30} color={colors.vikingBlue} />
          </TouchableOpacity>
          <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
            <Text style={{fontSize:22,textAlign:'center'}}>{title}</Text>
          </View>
          { helpModal(navigation) }
        </View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
      </View>
    );
  }
}

export class BackTitleBarContact extends React.Component {
  render (title, navigation) {
    return (
      <View key={title}>
        <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
        <View style={{flexDirection:'row', backgroundColor: colors.white, alignItems:'center'}}>
          <TouchableOpacity style={{marginLeft:15,justifyContent:'center',width:30}} onPress={() => navigation.goBack()} activeOpacity={0.5}>
            <IonIcon type='Ionicons' name='ios-arrow-back' size={30} color={colors.vikingBlue} />
          </TouchableOpacity>
          <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
            <Text style={{fontSize:22,textAlign:'center'}}>{title}</Text>
          </View>
        </View>
        <View style={{height:30, backgroundColor: colors.white}}></View>
      </View>
    );
  }
}