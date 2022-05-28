import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import admob, {
  MaxAdContentRating,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

const adUnitId = 'ca-app-pub-2905425236194464/6780088277';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
const InterstitialAdss = () => {
  const isFocused = useIsFocused();
  const [useloaded, setuseloaded] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (isFocused) {
        admob()
          .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.PG,
            tagForChildDirectedTreatment: true,
            tagForUnderAgeOfConsent: true,
          })
          .then(resp => {
            console.log('interstitial ad Configuration resp ====>>>', resp);
          })
          .catch(err => {
            console.log('interstitial add errr', err);
          });
        interstitial.load()
        return () =>
          interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
              setuseloaded(!useloaded);
              console.log('interstitial loaded ');
              interstitial.show();
            }
            if (type === AdEventType.CLOSED) {
              console.log('interstitial ad closed');
            }
          });
      }
    }, [isFocused]),
  );
  return null;
};

export default InterstitialAdss;
