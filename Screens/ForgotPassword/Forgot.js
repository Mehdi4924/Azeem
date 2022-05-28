import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
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
import AdBanner from '../../Components/AdBanner';

export default function Forgot({navigation}) {
  const [email, setemail] = useState(null);
  const [indicator, setindicator] = useState(false);

  const OnForgot = () => {
    ////  forgot password Function Api integration
    setindicator(true);
    var formdata = new FormData();
    formdata.append('email', email);
    console.log('FormData===>>', formdata);
    // console.log(url)
    axios
      .post(`${url}/forget-password`, formdata)
      .then(async response => {
        console.log(response);
        // Toast.show(response.data.message, Toast.SHORT);
        setindicator(false);
        navigation.navigate('OTP', {
          code: response.data.successData.code,
          emailId: email,
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
        setindicator(false);
        Toast.show(error.response.data.message, Toast.SHORT);
        // console.log(JSON.parse(JSON.stringify(error)))
        console.log(error.response);
        console.log(error.message);
      });
  };

  return (
    <>
      <AdBanner />
      <View style={styles.container}>
        {/* <Text style={styles.text}>Find the rarest ones here.</Text> */}
        <Text style={styles.login}>Forgot Password</Text>
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
        <Button
          Title="Send Email"
          Button={styles.button}
          TextStyle={styles.btntext}
          Indicator={indicator}
          btnPress={() => {
            OnForgot();
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    // bottom:hp(5)
  },
  text: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.blue,
    alignSelf: 'center',
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  login: {
    fontSize: 20,
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
    width: wp(80),
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
    marginVertical: hp(8),
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
    top: hp(15),
    // marginHorizontal: wp(10)
  },
});
