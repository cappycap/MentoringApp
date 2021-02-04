

import React from 'react';

// PrivacyScreen class
export default class PrivacyScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        refreshing: false
      }
    }
  
    acceptAgreement = () => {
      updatePrivacy(curUser.email, 1);
      this.props.navigation.navigate("Main");
    }
  
    denyAgreement = () => {
      updatePrivacy(curUser.email, 0);
      this.props.navigation.navigate("Main");
    }
  
    render () {
      return <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={{flexDirection:'row',justifyContent:"center"}}>
            <Image style={{width:100, height:100}} source={require('../assets/logo.png')} />
          </View>
          <Text style={styles.headerSupportPrimaryText}>Read carefully and decide below.</Text>
          <View style={{height:25}}/>
          <Text style={styles.basePrivacyText}>
          <Text style={styles.titlePrimaryText}>Privacy Policy</Text>
          {"\n"}{"\n"}
          WWU CS Department built the CS/M Mentoring app as a free app. This Service is provided by WWU CS Department at no cost and is intended for use as is. This page is used to inform visitors regarding policies with the collection, use, and disclosure of Personal Information if anyone decided to use this Service.
          {"\n"}{"\n"}
          If you choose to use this Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that collected is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
          {"\n"}{"\n"}
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at CS/M Mentoring unless otherwise defined in this Privacy Policy.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Information Collection and Use</Text>
          {"\n"}{"\n"}
          For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your email address, full name, and LinkedIn profile picture. The information requested will be retained on your device and CSWWU servers for the sake of connecting you with mentor/mentees.
          {"\n"}{"\n"}
          The app does use third party services that may collect information used to identify you. Information collected from this app (namely user profiles and summaries) will be provided to an NSF research group if this agreement is accepted. You can request from the email below for your account and associated application data to be deleted at any time.
          {"\n"}{"\n"}
          <Text style={styles.basePrimaryTextBolded}>If the agreement is not accepted, you may still use the app, but this information won't be shared with the research group.</Text>
          {"\n"}{"\n"}
          Link to privacy policy of third party service providers used by the app are accessible here:
          {"\n"}{"\n"}
          <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.linkedin.com/legal/privacy-policy')}>LinkedIn </Text>
           and <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com/policies/privacy/')}>Google Play Services</Text> (if on Android)
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Log Data</Text>
          {"\n"}{"\n"}
          Whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Cookies</Text>
          {"\n"}{"\n"}
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
          {"\n"}{"\n"}
          This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Service Providers</Text>
          {"\n"}{"\n"}
          We may employ third-party companies and individuals due to the following reasons:
          {"\n"}{"\n"}
          1. To facilitate our Service;
          {"\n"}
          2. To provide the Service on our behalf;
          {"\n"}
          3. To perform Service-related services; or
          {"\n"}
          4. To assist us in analyzing how our Service is used.
          {"\n"}{"\n"}
          I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Security</Text>
          {"\n"}{"\n"}
          We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Links to Other Sites</Text>
          {"\n"}{"\n"}
          This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Changes to This Privacy Policy</Text>
          {"\n"}{"\n"}
          We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
          {"\n"}{"\n"}
          This policy is effective as of Jan 1st, 2021.
          {"\n"}{"\n"}
          <Text style={styles.titlePrimaryText}>Contact Us</Text>
          {"\n"}{"\n"}
          If you have any questions or suggestions about this Privacy Policy, do not hesitate to contact us at cs.support@wwu.edu.
          </Text>
          <View style={{height:25}} />
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <Button
              containerStyle={{padding:12, height:45, width:"45%", overflow:'hidden', borderRadius:4, backgroundColor: '#95a5a6'}}
              style={{fontSize: 16, color: 'white'}}
              onPress={() => this.denyAgreement()}>
              Disagree
            </Button>
            <View style={{width:10}} />
            <Button
              containerStyle={{padding:12, height:45, width:"45%", overflow:'hidden', borderRadius:4, backgroundColor: '#003F87'}}
              style={{fontSize: 16, color: 'white'}}
              onPress={() => this.acceptAgreement()}>
              Agree
            </Button>
          </View>
          <View style={{height:25}} />
        </ScrollView>
      </SafeAreaView>
    }
}