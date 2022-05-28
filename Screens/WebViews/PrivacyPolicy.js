import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import AdBanner from '../../Components/AdBanner';

export default function PrivacyPolicy({navigation}) {
  return (
    <>
      <AdBanner />
      <WebView
        source={{uri: 'https://admin.azeemdigitalsolutions.com/privacy-policy'}}
      />
    </>
  );
}
