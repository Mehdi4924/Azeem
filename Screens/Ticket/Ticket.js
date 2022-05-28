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

export default function Ticket({navigation}) {
  const [indicator, setindicator] = useState(false);
  const [GenTicket, setGenTicket] = useState(null);

  useEffect(() => {
    Ticket();
  }, []);

  const Ticket = async () => {
    /// This function is written to get ticket from Api
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);

    axios
      .get(`${url}/ticket-generate`, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log(response);
        setGenTicket(response.data.successData.code);
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
            <Text style={styles.title}>Enjoy</Text>
            <Text style={styles.subtitle}>
              Your ticket code and get exciting discounts from our store!
            </Text>
            <View style={styles.codeview}>
              <Text style={styles.codetxt}>
                {GenTicket != null ? (
                  GenTicket
                ) : (
                  <Text style={styles.center}>AZMBST500</Text>
                )}
              </Text>
            </View>
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
  codeview: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.purple,
    borderWidth: 1,
    width: wp(75),
    height: hp(8),
    borderRadius: 10,
    marginVertical: hp(3),
  },
  codetxt: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.purple,
  },
  center: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.purple,
  },
});
