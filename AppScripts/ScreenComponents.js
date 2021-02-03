const titleBar = (title, navFunction) => {
  return (
    <View key={title}>
      <View style={{height:25, backgroundColor: colors.vikingBlue}}></View>
      <View style={{height:30, backgroundColor: colors.white}}></View>
      <View style={{flexDirection:'row-reverse', backgroundColor: colors.white, alignItems:'center'}}>
        { settingsModal(navFunction) }
        <View style={{width:mainTitleWidth,textAlign:'center',alignItems:'center'}}>
          <Text style={{fontSize:22,textAlign:'center'}}>{title}</Text>
        </View>
      </View>
      <View style={{height:30, backgroundColor: colors.white}}></View>
    </View>
  );
};

const settingsModal = (navFunction) => {
  return (
    <TouchableOpacity style={{width:30,marginRight:15}} onPress={navFunction} activeOpacity={0.5}>
        <IonIcon name="ios-settings" size={30} color={colors.vikingBlue} />
    </TouchableOpacity>
  );
}

const backTitleBar = (title, navFunction, navigation) => {
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
        { settingsModal(navFunction) }
      </View>
      <View style={{height:30, backgroundColor: colors.white}}></View>
    </View>
  );
}

const helpModal = (navigation) => {
  return (
    <TouchableOpacity style={{width:30,justifyContent:'center'}} onPress={() => navigation.navigate('HelpModal')} activeOpacity={0.5}>
      <IonIcon name="ios-help-circle" size={30} color={colors.vikingBlue} />
    </TouchableOpacity>
  );
}

const backTitleBarHelp = (title, navFunction, navigation) => {
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

const backTitleBarContact = (title, navigation) => {
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