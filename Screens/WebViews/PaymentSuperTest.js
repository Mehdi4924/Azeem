import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import url from '../../Utilities/url';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import {WebView} from 'react-native-webview';
import AdBanner from '../../Components/AdBanner';
let data = [];
const PaymentSuperTest = ({route, navigation}) => {
  const {user, MCQ, payment} = route.params;
  const [indicator, setindicator] = useState(false);
  const {config, fs} = RNFetchBlob;
  return (
    <View style={{flex: 1}}>
      <AdBanner />
      <WebView
        source={{
          uri: `https://admin.azeemdigitalsolutions.com/payment?user_id=${
            user.id
          }&amount=${parseInt(MCQ.price)}&type=${payment}`,
        }}
        onNavigationStateChange={async data => {
          console.log(
            'check the back response of webview ==============================================================',
            data,
            MCQ,
          );
          console.log('check the back response of webview', data.canGoBack);
          if (
            data.canGoBack == true &&
            data.canGoForward == false &&
            data.loading == false &&
            data.title != 'JazzCash'
          ) {
            let token = await AsyncStorage.getItem('Auth');
            // navigation.navigate('MCQS', { id:MCQ.id, time: MCQ.duration, subject: true })
            const AuthStr = 'Bearer '.concat(token);
            axios
              .get(`${url}/payment-status`, {headers: {Authorization: AuthStr}})
              .then(async response => {
                console.log('check save order response1', response);
                if (response.data.status === 200) {
                  let form = new FormData();
                  form.append('subject_id', MCQ.subject_id);
                  form.append('total', MCQ.price);
                  form.append(
                    'transaction_id',
                    response.data.successData.txn_no,
                  );
                  form.append('type', 'super');

                  axios
                    .post(`${url}/subject-test-payment`, form, {
                      headers: {Authorization: AuthStr},
                    })
                    .then(async response => {
                      console.log('check save order response2', response);
                      if (response.data.status == 200) {
                        // Navigation.goBack()
                        Toast.show('payment successfully');
                        navigation.navigate('MCQS', {
                          id: MCQ.id,
                          time: MCQ.duration,
                          subject: true,
                          key: 'super',
                          subid: MCQ.subject_id,
                        });

                        // ReadOffline(MCQ.file,MCQ);
                        //  props.navigation.navigate('ReadOffline', { link: MCQ.file })
                      }
                    })
                    .catch(error => {
                      console.log(
                        'error in api',
                        JSON.parse(JSON.stringify(error)),
                      );
                    });
                } else {
                  Toast.show('Something went wrong');
                }
              })
              .catch(error => {
                console.log('error in api', JSON.parse(JSON.stringify(error)));
              });
          }
        }}
      />
      {indicator ? (
        <ActivityIndicator
          style={{position: 'absolute', alignSelf: 'center', top: '40%'}}
          size={'large'}
          color="blue"
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default PaymentSuperTest;

const styles = StyleSheet.create({});
