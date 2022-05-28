import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  TextBase,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import Button from '../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import AdBanner from '../../Components/AdBanner';

export default function Status({navigation}) {
  const [indicator, setindicator] = useState(false);
  const [status, setstatus] = useState('');

  useEffect(() => {
    GetStatus();
  }, []);

  const GetStatus = async () => {
    /// This function is written to get Status from Api
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    const AuthStr = 'Bearer '.concat(token);

    axios
      .get(`${url}/check-status`, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log(response);
        setstatus(response.data.successData.status);
        setindicator(false);
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
  };
  const DelToken = async () => {
    await AsyncStorage.removeItem('Auth');
    navigation.navigate('AuthNav');
  };
  return (
    <>
      <AdBanner />
      <View style={styles.container}>
        {indicator ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={30} color={colors.blue} />
          </View>
        ) : (
          <View>
            {status != 'inactive' ? (
              <View
              // style={{ top: hp(8) }}
              >
                <Text style={styles.title}>Active</Text>
                <Text style={styles.subtitle}>
                  If you don't login within 15 days,your status will be
                  in-active
                </Text>
              </View>
            ) : (
              <View
              // style={{ top: hp(8) }}
              >
                <Text style={styles.title}>In-Active</Text>
                <Text style={styles.subtitle}>
                  Due to in-activity for 15 days your account has been logged
                  out
                </Text>
                <Button
                  Title="Login"
                  Button={styles.button}
                  TextStyle={styles.btntext}
                  Indicator={indicator}
                  btnPress={() => {
                    DelToken();
                  }}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: hp(3),
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: colors.blue,
    marginTop: hp(1),
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.purple,
    marginTop: hp(1),
    width: wp(50),
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(30),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(2),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  btntext: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
    marginVertical: hp(1),
  },
});
