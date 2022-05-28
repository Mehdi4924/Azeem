import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import InputIcon from '../../Components/InputIcon';
import Button from '../../Components/Button';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AdBanner from '../../Components/AdBanner';

export default function SignUp({navigation}) {
  const [indicator, setindicator] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [username, setusername] = useState('');
  const [city, setcity] = useState('');
  const [institute, setinstitute] = useState('');
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [FirebaseToken, setFirebaseToken] = useState('');

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
        setFirebaseToken(token.token);
        //         firebase.messaging().hasPermission()
        //   .then(enabled => {
        //     if (enabled) {
        //       // user has permissions
        //       console.log('User has fcm permission')
        //       this.registerFcmMessageListener()
        //     } else {
        //       // user doesn't have permission
        //       console.log('User doesn\'t have fcm permission')
        //       firebase.messaging().requestPermission()
        //         .then(() => {
        //           // User has authorised
        //           console.log('User has authorised fcm')
        //           this.registerFcmMessageListener()
        //         })
        //         .catch(error => {
        //           // User has rejected permissions
        //           console.log('User has rejected fcm permissions, error = ', error)
        //         })
        //     }
        //   })
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  const OnSignUp = () => {
    ///// Sign Up Api Integration
    // console.log("this is email", email);
    // console.log("this is password", password);
    // console.log("this is repassword", repassword);
    setindicator(true);
    if (password != repassword) {
      Toast.show('Password does not match', Toast.SHORT);
    } else {
      // setindicator(true);
      var formdata = new FormData();
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === true) {
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('name', username);
        formdata.append('city', city);
        formdata.append('institute', institute);
        formdata.append('notification_token', FirebaseToken);
        console.log('FormData===>>', formdata);
        // console.log(url)
        axios
          .post(`${url}/signup`, formdata)
          .then(response => {
            console.log(response);
            Toast.show(response.data.message, Toast.SHORT);
            setindicator(false);
            navigation.navigate('Login');
          })
          .catch(error => {
            // handle error
            console.log(error);
            setindicator(false);
            // Toast.show(error.response.data.message, Toast.SHORT);
            // console.log(JSON.parse(JSON.stringify(error)))
            // console.log(error.response);
            console.log(error.message);
          });
      } else {
        Toast.show('Enter valid email...');
        setindicator(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <AdBanner />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Find the rarest ones here.</Text>
        <Text style={styles.login}>Sign Up</Text>
        <InputIcon
          ViewStyle={styles.viewstyle}
          IconName={'email-outline'}
          IconType={'material-community'}
          IconColor={colors.purple}
          IconSize={hp(4)}
          Placeholder={'Enter Email Address'}
          InputStyle={styles.inputstyle}
          TypeKeypad={'email-address'}
          secureTextEntry={false}
          onChangeText={text => setemail(text)}
          Value={email}
        />
        <View style={styles.viewstyle}>
          <Icon
            name={'lock-outline'}
            type={'material-community'}
            color={colors.purple}
            size={hp(4)}
            style={{marginHorizontal: wp(3)}}
          />
          <TextInput
            placeholder={'Enter Password'}
            style={styles.inputpass}
            onChangeText={text => setpassword(text)}
            value={password}
            keyboardType={'default'}
            secureTextEntry={hidePass1 ? true : false}
          />
          <View style={{marginRight: 10}}>
            <Icon
              name={hidePass1 ? 'eye-off' : 'eye'}
              type={'material-community'}
              size={hp(4)}
              color={colors.purple}
              onPress={() => setHidePass1(!hidePass1)}
            />
          </View>
        </View>
        <View style={styles.viewstyle}>
          <Icon
            name={'lock-outline'}
            type={'material-community'}
            color={colors.purple}
            size={hp(4)}
            style={{marginHorizontal: wp(3)}}
          />
          <TextInput
            placeholder={'Re-enter Password'}
            style={styles.inputpass}
            onChangeText={text => setrepassword(text)}
            value={repassword}
            keyboardType={'default'}
            secureTextEntry={hidePass2 ? true : false}
          />
          <View style={{marginRight: 10}}>
            <Icon
              name={hidePass2 ? 'eye-off' : 'eye'}
              type={'material-community'}
              size={hp(4)}
              color={colors.purple}
              onPress={() => setHidePass2(!hidePass2)}
            />
          </View>
        </View>

        <InputIcon
          ViewStyle={styles.viewstyle}
          IconName={'account-circle-outline'}
          IconType={'material-community'}
          IconColor={colors.purple}
          IconSize={hp(4)}
          Placeholder={'Enter Name'}
          InputStyle={styles.inputstyle}
          TypeKeypad={'default'}
          secureTextEntry={false}
          onChangeText={text => setusername(text)}
          Value={username}
        />
        <InputIcon
          ViewStyle={styles.viewstyle}
          IconName={'city'}
          IconType={'material-community'}
          IconColor={colors.purple}
          IconSize={hp(4)}
          Placeholder={'Enter City'}
          InputStyle={styles.inputstyle}
          TypeKeypad={'default'}
          secureTextEntry={false}
          onChangeText={text => setcity(text)}
          Value={city}
        />
        <InputIcon
          ViewStyle={styles.viewstyle}
          IconName={'school-outline'}
          IconType={'material-community'}
          IconColor={colors.purple}
          IconSize={hp(4)}
          Placeholder={'Enter Institute'}
          InputStyle={styles.inputstyle}
          TypeKeypad={'default'}
          secureTextEntry={false}
          onChangeText={text => setinstitute(text)}
          Value={institute}
        />

        <Button
          Title="Sign Up"
          Button={styles.button}
          TextStyle={styles.btntext}
          Indicator={indicator}
          btnPress={() => {
            OnSignUp();
            // navigation.navigate('Login')
          }}
        />
        <Pressable
          style={styles.click}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.forgettext}>
            I Have a Account.<Text style={styles.bold}>Click Here!</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: colors.blue,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    marginTop: hp(6),
  },
  login: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: colors.purple,
    alignSelf: 'center',
    marginTop: hp(1),
    marginBottom: hp(4),
    fontFamily: 'Poppins-Bold',
  },
  viewstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(83),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 5,
    marginVertical: hp(1),
  },
  inputstyle: {
    width: wp(70),
    // backgroundColor:'red',
    paddingHorizontal: 10,
  },
  forget: {
    marginVertical: hp(1),
    marginHorizontal: wp(10),
  },
  forgettext: {
    fontSize: 14,
    color: colors.purple,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(30),
    height: hp(6.5),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(3),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  btntext: {
    fontSize: 14,
    // paddingVertical: 6
    // alignSelf:'center',
    color: colors.white,
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  click: {
    marginVertical: hp(3),
    alignSelf: 'center',
    // marginHorizontal: wp(10)
  },
  inputpass: {
    width: wp(55),
    marginRight: 10,
    // backgroundColor:'red',
    paddingHorizontal: 10,
  },
});
