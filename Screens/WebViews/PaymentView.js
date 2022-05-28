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

const PaymentView = ({route, navigation}) => {
  console.log('route sy any wala data', route);
  const {user, books, payment} = route.params;
  const [indicator, setindicator] = useState(false);
  const {config, fs} = RNFetchBlob;

  const ReadOffline = async (link, Book, orderId) => {
    setindicator(true);
    // console.log("check the offline URL", link)
    console.log('check the offline Book Data', Book);
    let date = new Date();

    Toast.show('Wait, Book move to Offline');
    let PictureDir = fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.

    let options = {
      fileCache: true,
      appendExt: 'pdf',
      path: PictureDir + '/path-to-file.anything',
      useDownloadManager: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: false,
        appendExt: 'png',
        path: 'Users/ranglerzoffice1/Desktop/MyApps', // this is the path where your downloaded file will live in
        description: 'Downloading image.',
      },
    };
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      appendExt: 'pdf',
      fileCache: true,
    })
      .fetch('GET', link, {})
      .then(async response => {
        // the temp file path
        setindicator(false);
        Toast.show('Successfully Stored !');
        let token = await AsyncStorage.getItem('Auth');
        let form = new FormData();
        form.append('order_id', orderId);
        form.append('status', 'completed');
        const AuthStr = 'Bearer '.concat(token);
        console.log(
          'fromdattatattatataattattatattattatattatattatat check kar broooo',
          form,
        );
        axios
          .post(`${url}/download-status`, form, {
            headers: {Authorization: AuthStr},
          })
          .then(async res => {
            console.log('respnse check kar broooo', res);
            let Book_Data = {};
            Book_Data.path = response.path();
            Book_Data.id = Book.id;
            Book_Data.image = Book.featured_image;
            Book_Data.title = Book.title;
            data.push(Book_Data);
            console.log('check data before setting', data);
            let allBooks = JSON.parse(
              await AsyncStorage.getItem('offlineData'),
            );
            console.log('check allBOOKS ', allBooks);
            console.log('check allBOOKS after adding new book', allBooks);
            if (allBooks != null && allBooks.length > 0) {
              console.log('yeh chala', data);
              if (allBooks.findIndex(val => val.id == Book_Data.id) == -1) {
                allBooks.push(Book_Data);
                await AsyncStorage.setItem(
                  'offlineData',
                  JSON.stringify(allBooks),
                );
                console.log('check allBOOKS after adding new book', allBooks);
              }
            } else {
              console.log('yeh chalaaaaaaaaa', data);
              await AsyncStorage.setItem('offlineData', JSON.stringify(data));
            }
            // await AsyncStorage.setItem('offlineData', JSON.stringify(data));
            // props.navigation.navigate('PaymentView',{user:user,books:Book});
            console.log('Console log check the', user);
            navigation.navigate('ReadOffline', {link: response.path()});
          })
          .catch(err => {
            // the temp file path
            console.log(' error to ', JSON.parse(JSON.stringify(err)));
          });
      })
      .catch(err => {
        // the temp file path
        setindicator(false);
        console.log('The file error to ', JSON.parse(JSON.stringify(err)));
      });
  };

  return (
    <View style={{flex: 1}}>
      <AdBanner />
      <WebView
        source={{
          uri: `https://admin.azeemdigitalsolutions.com/payment?user_id=${
            user.id
          }&amount=${parseInt(books.price)}&type=${payment}`,
        }}
        onNavigationStateChange={async data => {
          console.log('check the back response of webview', data);
          // console.log('check the back response of webview', data.canGoBack);

          if (
            data.canGoBack == true &&
            data.canGoForward == false &&
            data.loading == false &&
            data.title != 'JazzCash'
          ) {
            let token = await AsyncStorage.getItem('Auth');
            // let data = new FormData();
            // data.append("search", str);
            const AuthStr = 'Bearer '.concat(token);
            console.log('yehan a gye', AuthStr);
            try {
              axios
                .get(`${url}/payment-status`, {
                  headers: {Authorization: AuthStr},
                })
                .then(async response => {
                  console.log('check Payment status response before', response);
                  let form = new FormData();
                  form.append('book_id', books.id);
                  form.append('total', books.price);
                  form.append(
                    'transaction_id',
                    response.data.successData.txn_no,
                  );
                  console.log('form data of save order api is', form);
                  axios
                    .post(`${url}/save-order`, form, {
                      headers: {Authorization: AuthStr},
                    })
                    .then(async response => {
                      console.log('check save order response after', response);
                      if (response.data.status == 200) {
                        // Navigation.goBack()
                        Toast.show('payment successfully');
                        ReadOffline(
                          books.file,
                          books,
                          response.data.successData.order.id,
                        );
                        //  props.navigation.navigate('ReadOffline', { link: books.file })
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
                  console.log(
                    'error checkm payment stataus in api',
                    JSON.parse(JSON.stringify(error)),
                  );
                });
            } catch (error) {
              // either handle errors or don't
              console.log('try catch m sy yeh error niikala ha ', error);
            }
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

export default PaymentView;

const styles = StyleSheet.create({});
