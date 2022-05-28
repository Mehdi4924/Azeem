import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import AdBanner from '../../Components/AdBanner';

export default function AboutUs({navigation}) {
  return (
    <>
      <AdBanner />
      <WebView
        source={{uri: 'https://admin.azeemdigitalsolutions.com/about-us'}}
      />
    </>
  );
}
