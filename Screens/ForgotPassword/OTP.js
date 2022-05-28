import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import colors from '../../Utilities/colors';
import Button from '../../Components/Button';
import Toast from 'react-native-simple-toast';
import url from '../../Utilities/url';
import axios from 'axios';
import AdBanner from '../../Components/AdBanner';

const CELL_COUNT = 4;

export default function OTP(props) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [indicator, setindicator] = useState(false);
  const [code, setcode] = useState('');

  useEffect(() => {
    setcode(props.route.params.code);
  }, [indicator]);

  const Resend = () => {
    ////  forgot password Function Api integration
    // setindicator(true);
    // console.log('check for code',code)
    var formdata = new FormData();
    formdata.append('email', props.route.params.emailId);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/forget-password`, formdata)
      .then(response => {
        console.log('check the response of api', response);
        setcode(response.data.successData.code);
      })
      .catch(error => {
        // handle error
        console.log(error);
        // setindicator(false)
        Toast.show(error.response.data.message, Toast.SHORT);
        // console.log(JSON.parse(JSON.stringify(error)))
        console.log(error.response);
        console.log(error.message);
      });
  };

  const onVerify = () => {
    console.log('check you value', value);
    console.log('check your code', code);

    setindicator(true);
    if (value == code) {
      Toast.show('Code Verified', Toast.SHORT);
      setindicator(false);
      props.navigation.navigate('Reset', {emailID: props.route.params.emailId});
    } else {
      setindicator(false);
      Toast.show('Code does not match', Toast.SHORT);
    }
  };

  return (
    <>
      <AdBanner />

      <View style={styles.container}>
        <Text style={styles.login}>Verify</Text>
        <Text style={styles.text2}>Enter 4 digit PIN sent to you at:</Text>
        <View style={styles.mid}>
          <Text style={styles.email}>{props.route.params.emailId}</Text>
        </View>
        <View style={styles.code}>
          <CodeField
            //ref={ref}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <Button
          Title="Verify"
          Button={styles.button}
          TextStyle={styles.btntext}
          Indicator={indicator}
          btnPress={() => {
            onVerify();
          }}
        />
        <Text style={styles.opacity}>Did not receive the code?</Text>
        <Pressable onPress={() => Resend()}>
          <Text style={styles.resend}>Resend</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.purple,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.purple,
  },
  code: {
    marginHorizontal: wp(15),
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  mid: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.blue,
    alignSelf: 'center',
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
  text2: {
    textAlign: 'center',
    marginVertical: hp(1),
    fontSize: 14,
    color: colors.purple,
    fontFamily: 'Poppins-Regular',
  },
  email: {
    fontSize: hp(2.5),
    color: colors.main,
    alignSelf: 'center',
    width: wp(70),
    marginHorizontal: wp(10),
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: hp(1),
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

  opacity: {
    opacity: 0.25,
    color: colors.black,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  resend: {
    color: colors.black,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
