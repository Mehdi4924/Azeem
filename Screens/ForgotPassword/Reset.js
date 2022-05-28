import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
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
import AdBanner from '../../Components/AdBanner';

export default function Reset(props) {
  const [indicator, setindicator] = useState(false);
  const email = props.route.params.emailID;
  const [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  const ResetPassword = () => {
    ////  Reset Password Function Api integration
    setindicator(true);
    console.log('IDDDD', email);
    if (password == repassword) {
      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);
      console.log('FormData===>>', formdata);

      axios
        .post(`${url}/reset-password`, formdata)
        .then(async response => {
          console.log(response);
          Toast.show(response.data.message, Toast.SHORT);
          setindicator(false);
          props.navigation.navigate('Login');
        })
        .catch(error => {
          // handle error
          console.log(error);
          Toast.show(error.response.data.message, Toast.SHORT);
          setindicator(false);
          // console.log(JSON.parse(JSON.stringify(error)))
          console.log(error.response);
          console.log(error.message);
        });
    } else {
      Toast.show('Password does not match', Toast.SHORT);
      setindicator(false);
    }
  };

  return (
    <>
      <AdBanner />

      <View style={styles.container}>
        <Text style={styles.login}>Change Password</Text>
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
            style={styles.passinputsty}
            onChangeText={text => setpassword(text)}
            value={password}
            keyboardType={'default'}
            secureTextEntry={hidePass1 ? true : false}
          />
          <View style={{marginRight: 5}}>
            <Icon
              name={hidePass1 ? 'eye-off' : 'eye'}
              type={'material-community'}
              color={colors.purple}
              size={hp(4)}
              // style={{ backgroundColor: 'brown' }}
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
            placeholder={'Enter Re-Password'}
            style={styles.passinputsty}
            onChangeText={text => setrepassword(text)}
            value={repassword}
            keyboardType={'default'}
            secureTextEntry={hidePass2 ? true : false}
          />
          <View style={{marginRight: 5}}>
            <Icon
              name={hidePass2 ? 'eye-off' : 'eye'}
              type={'material-community'}
              color={colors.purple}
              size={hp(4)}
              // style={{ backgroundColor: 'brown' }}
              onPress={() => setHidePass2(!hidePass2)}
            />
          </View>
        </View>
        <Button
          Title="Change Password"
          Button={styles.button}
          TextStyle={styles.btntext}
          Indicator={indicator}
          btnPress={() => {
            ResetPassword();
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
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  text: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: colors.blue,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  login: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: colors.purple,
    alignSelf: 'center',
    marginTop: hp(1),
    marginBottom: hp(5),
    fontFamily: 'Poppins-Bold',
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
    width: wp(50),
    height: hp(6.5),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(5),
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
  passinputsty: {
    width: wp(54),
    // backgroundColor:'red'
  },
});
