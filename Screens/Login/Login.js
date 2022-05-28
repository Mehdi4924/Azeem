import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {Icon} from 'react-native-elements';
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import IconButton from '../../Components/IconButton';
import AdBanner from '../../Components/AdBanner';

export default function Login({navigation}) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [indicator1, setindicator1] = useState(false);
  const [indicator2, setindicator2] = useState(false);
  const [indicator3, setindicator3] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [FirebaseToken, setFirebaseToken] = useState('');

  useEffect(() => {
    //Google Signin
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '218449283824-39mk6jecpj45ngq3bb02a8qv3tf04ji1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });

    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
        setFirebaseToken(token.token);
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
  var headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const SignInFacebook = async () => {
    // handleFacebookLogin()
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('UserData', data);
            const {accessToken} = data;
            getuserInfo(accessToken);
          });
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log(
          'Login fail with error: ',
          JSON.parse(JSON.stringify(error)),
        );
      },
    );
  };

  const getuserInfo = token => {
    console.log('Check token', token);
    setindicator2(true);
    axios
      .get(
        `https://graph.facebook.com/me?fields=email,name,friends,picture.type(large)&access_token=${token}`,
      )
      .then(response => {
        // If request is good...
        console.log('fbData', response.data);
        // setSocialData(response);
        // //    axios call for LoginFB
        // //  social_id , login_type , name ,  phone , email , image
        const fbdata = new FormData();
        fbdata.append('social_id', response.data.id);
        fbdata.append('login_type', 'facebook');
        fbdata.append('name', response.data.name);
        // fbdata.append('phone', '');
        fbdata.append(
          'email',
          response.data.email == undefined ? '' : response.data.email,
        );
        fbdata.append('notification_token', FirebaseToken);

        // fbdata.append('image', response.data.picture.data.url);
        console.log('Facebook FOrmData', fbdata);

        axios
          .post(`${url}` + '/social-login', fbdata, {headers: headers})
          .then(async response => {
            console.log('Facebook Responce', response);
            if (response.data.status == 200) {
              Toast.show(response.data.message, Toast.SHORT);
              await AsyncStorage.setItem(
                'Auth',
                response.data.successData.accessToken,
              );

              await AsyncStorage.setItem(
                'userdata',
                JSON.stringify(response.data.successData),
              );
              setindicator2(false);
              navigation.replace('Drawer');
            } else {
              Toast.show(response.data.message, Toast.SHORT);
            }
          })
          .catch(error => {
            console.log('Facebook Error Responce', error.response);
            Toast.show(error.response.data.message, Toast.SHORT);
            setindicator2(false);
          });
      })
      .catch(error => {
        console.log('error ' + error);
        setindicator2(false);
      });
  };
  // Somewhere in your code
  const signInGoogle = async () => {
    console.log('hiii googel');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setindicator3(true);
      var formdata = new FormData();
      formdata.append('social_id', userInfo.user.id);
      formdata.append('login_type', 'google');
      formdata.append('name', userInfo.user.name);
      formdata.append('email', userInfo.user.email);
      formdata.append('notification_token', FirebaseToken);

      console.log('FormData===>>', formdata);
      // console.log(url)
      axios
        .post(`${url}/social-login`, formdata, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then(async response => {
          console.log(response);
          if (response.data.status == 200) {
            Toast.show(response.data.message, Toast.SHORT);
            await AsyncStorage.setItem(
              'Auth',
              response.data.successData.accessToken,
            );
            await AsyncStorage.setItem(
              'userdata',
              JSON.stringify(response.data.successData),
            );
            setindicator3(false);
            navigation.replace('Drawer');
          } else {
            Toast.show(response.data.message, Toast.SHORT);
          }
        })
        .catch(error => {
          // handle error
          console.log(error);
          Toast.show(error.response.data.message, Toast.SHORT);
          setindicator3(false);
          // console.log(JSON.parse(JSON.stringify(error)))
          console.log(error.response);
          console.log(error.message);
        });
      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('hiii cancel');
        alert('Cancel');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('hiii inProcess');
        alert('Signin in progress');

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('hiii not have services');
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
        alert(error);
        console.log('hiii another errir', error);
      }
    }
  };

  const OnLogin = () => {
    ////  Login Function Api integration
    setindicator1(true);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('notification_token', FirebaseToken);

      console.log('FormData===>>', formdata);
      // console.log(url)
      axios
        .post(`${url}/user-login`, formdata, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then(async response => {
          console.log(response);
          Toast.show(response.data.message, Toast.SHORT);
          await AsyncStorage.setItem(
            'Auth',
            response.data.successData.accessToken,
          );
          await AsyncStorage.setItem(
            'userdata',
            JSON.stringify(response.data.successData),
          );

          setindicator1(false);
          navigation.replace('Drawer');
          //  navigation.replace('Categories')
        })
        .catch(error => {
          // handle error
          console.log(error);
          setindicator1(false);
          Toast.show(error.response.data.message, Toast.SHORT);
          // console.log(JSON.parse(JSON.stringify(error)))
          console.log(error.response);
          console.log(error.message);
        });
    } else {
      Toast.show('Enter valid email...');
      setindicator1(false);
    }
  };

  return (
    <View style={styles.container}>
      <AdBanner />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Find the rarest ones here.</Text>
        <Text style={styles.login}>Login</Text>
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
            secureTextEntry={hidePass ? true : false}
          />
          <View style={{marginRight: 10}}>
            <Icon
              name={hidePass ? 'eye-off' : 'eye'}
              type={'material-community'}
              size={hp(4)}
              color={colors.purple}
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
        </View>

        <Pressable
          style={styles.forget}
          onPress={() => {
            navigation.navigate('Forgot');
          }}>
          <Text style={styles.forgettext}>Forgot Password?</Text>
        </Pressable>
        <View style={{marginVertical: 15}}>
          <IconButton
            ImgSource={require('../../Assets/emails.png')}
            ImgStyle={styles.socialimg}
            Title="Sign in with Email"
            Button={[styles.button, {backgroundColor: colors.purple}]}
            TextStyle={[styles.btntext, {color: colors.white}]}
            Indicator={indicator1}
            IndColor={colors.white}
            btnPress={() => OnLogin()}
          />
          <IconButton
            ImgSource={require('../../Assets/facebook.png')}
            ImgStyle={styles.socialimg}
            Title="Sign in with facebook"
            Button={[styles.button, {backgroundColor: colors.blue}]}
            TextStyle={[styles.btntext, {color: colors.white}]}
            Indicator={indicator2}
            IndColor={colors.white}
            btnPress={() => SignInFacebook()}
          />

          <IconButton
            ImgSource={require('../../Assets/google.png')}
            ImgStyle={styles.socialimg}
            Title="Sign in with google"
            Button={[styles.button, {backgroundColor: colors.white}]}
            TextStyle={[styles.btntext, {color: colors.black}]}
            Indicator={indicator3}
            IndColor={colors.bluedd}
            btnPress={() => signInGoogle()}
          />
          <IconButton
            ImgSource={require('../../Assets/user.png')}
            ImgStyle={styles.socialimg}
            Title="Login As Guest"
            Button={[styles.button, {backgroundColor: colors.black}]}
            TextStyle={[styles.btntext, {color: colors.white}]}
            Indicator={false}
            IndColor={colors.white}
            btnPress={() => navigation.replace('Drawer')}
          />
        </View>
        <Pressable
          style={styles.click}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.forgettext}>
            Don't Have an Account.
            <Text style={(styles.forgettext, {fontFamily: 'Poppins-SemiBold'})}>
              Click Here!
            </Text>
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
    // alignItems:'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.blue,
    alignSelf: 'center',
    marginTop: hp(5),
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: colors.purple,
    alignSelf: 'center',
    marginTop: hp(1),
    marginBottom: hp(5),
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
  socialimg: {
    width: 80,
    resizeMode: 'contain',
    height: 25,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(80),
    marginVertical: 10,
    height: 45,

    elevation: 3,
    borderRadius: 1,
    alignSelf: 'center',
  },
  btntext: {
    fontSize: 14,
    // paddingVertical: 6
    // alignSelf:'center',
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  click: {
    // marginVertical: hp(2.5),
    marginTop: hp(3),
    alignSelf: 'center',
    // top: hp(15)
    // marginHorizontal: wp(10)
  },
  inputpass: {
    width: wp(55),
    marginRight: 10,
    // backgroundColor:'red',
    paddingHorizontal: 10,
  },
  socialview: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: hp(5),
  },
  socialicon: {
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
