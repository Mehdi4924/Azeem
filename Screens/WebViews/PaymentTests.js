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

const PaymentTests = ({route, navigation}) => {
  const {user, Chapter, payment} = route.params;
  const [indicator, setindicator] = useState(false);

  return (
    <View style={{flex: 1}}>
      <AdBanner />
      {console.log('web view data ', user.id, Chapter)}
      <WebView
        source={{
          uri: `https://admin.azeemdigitalsolutions.com/payment?user_id=${
            user.id
          }&amount=${parseInt(Chapter.price)}&type=${payment}`,
        }}
        onNavigationStateChange={async data => {
          console.log('check the back response of webview', data);
          console.log('check the back response of webview', data.canGoBack);
          if (
            data.canGoBack == true &&
            data.canGoForward == false &&
            data.loading == false &&
            data.title != 'JazzCash'
          ) {
            let token = await AsyncStorage.getItem('Auth');
            // navigation.navigate('ChapterS', { id:Chapter.id, time: Chapter.duration, subject: true })
            const AuthStr = 'Bearer '.concat(token);
            axios
              .get(`${url}/payment-status`, {headers: {Authorization: AuthStr}})
              .then(async response => {
                console.log('check save order response', response);
                let form = new FormData();
                form.append('subject_id', Chapter.subject_id);
                form.append('total', Chapter.price);
                form.append('transaction_id', response.data.successData.txn_no);
                form.append('type', 'chapterwise');
                axios
                  .post(`${url}/subject-test-payment`, form, {
                    headers: {Authorization: AuthStr},
                  })
                  .then(async response => {
                    console.log('check save order response', response);
                    if (response.data.status == 200) {
                      // Navigation.goBack()
                      Toast.show('Payment successfully');
                      // navigation.navigate('Chapters', { id:Chapter.id, time: Chapter.duration, subject: true })
                      navigation.navigate('Tests', {
                        id: Chapter.id,
                        key: 'chapter',
                      });

                      // ReadOffline(Chapter.file,Chapter);
                      //  props.navigation.navigate('ReadOffline', { link: Chapter.file })
                    }
                  })
                  .catch(error => {
                    console.log(
                      'error in api',
                      JSON.parse(JSON.stringify(error)),
                    );
                  });
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

export default PaymentTests;

const styles = StyleSheet.create({});
