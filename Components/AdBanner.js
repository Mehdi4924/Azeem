import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import admob, {
  MaxAdContentRating,
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  BannerAd,
  TestIds,
  BannerAdSize,
  AdMobRewarded,
} from '@react-native-firebase/admob';

const AdBanner = () => {
  useEffect(() => {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(resp => {
        // console.log('ad resp ====>>>', resp);
        // Request config successfully set!
      })
      .catch(err => {
        // console.log('add errr', err);
      });
  }, []);

  const bannerID = 'ca-app-pub-2905425236194464/2294048359';
  return (
    <BannerAd
      size={BannerAdSize.SMART_BANNER}
      unitId={bannerID}
      // requestOptions={}
      onAdLoaded={resp => {
        // console.log('Loaded', resp);
      }}
      onAdFailedToLoad={err => {
        // console.log('Failed', err);
      }}></BannerAd>
  );
};

export default AdBanner;
