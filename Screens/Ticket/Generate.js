import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Linking,
  Pressable,
  TextBase,
  ScrollView,
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
import {SliderBox} from 'react-native-image-slider-box';
import color from 'color';
import {useLinkBuilder} from '@react-navigation/native';
import AdBanner from '../../Components/AdBanner';

// let SliderImages = [
//     '../../Assets/uniworth.jpg',
//     '../../Assets/uniworth.jpg'
// ]

export default function Generate({navigation}) {
  const [indicator, setindicator] = useState(false);
  const [ad, setad] = useState([]);
  const [status, setstatus] = useState('');
  const [SliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    GetStatus();
    GetAdds();
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

  const GetAdds = async () => {
    let myarr = [];
    setSliderImages([]);
    /// This function is written to get Book Details from Api
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    const AuthStr = 'Bearer '.concat(token);
    axios
      .get(`${url}/ad`, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          setad(response.data.successData.ad);
          // response.data.successData.ad.reduce(item =>
          //     // console.log('itemmmm============',item),
          //     //     myarr.push({'image' : item.image,
          //     //     'image_url': item.url
          //     // }),
          //     myarr.push(item.image)
          //     // setSliderImages([...SliderImages, item.image])
          // )
          myarr = response.data.successData.ad.reduce((images, item) => {
            images.push(item.image);
            return images;
          }, []);
          setSliderImages(myarr);

          setindicator(false);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
        setindicator(false);
        Toast.show(error.response.data.message, Toast.SHORT);
        // console.log(JSON.parse(JSON.stringify(error)))
        console.log(error.response);
        console.log(error.message);
      });
  };
  const linkUrl = index => {
    let ad_url = ad.find(el => el.image == SliderImages[index]);
    console.log('vjcdsbakv', ad_url.link);
    if (ad_url) return Linking.openURL(ad_url.link);
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
          <ScrollView>
            {ad && status == 'active' ? (
              <View style={{alignItems: 'center'}}>
                <View style={styles.center}>
                  <Text style={styles.title}>Generate</Text>
                  <Text style={styles.subtitle}>
                    Generate Ticket number to avail special discounts from our
                    below mentioned partners
                  </Text>
                  <Button
                    Title="Generate"
                    Button={styles.button}
                    TextStyle={styles.btntext}
                    Indicator={indicator}
                    btnPress={() => {
                      navigation.replace('Ticket');
                    }}
                  />
                </View>

                <SliderBox
                  images={SliderImages}
                  resizeMode={'contain'}
                  resizeMethod={'auto'}
                  autoplay={true}
                  circleLoop={true}
                  autoplayInterval={10000}
                  sliderBoxHeight={250}
                  imageLoadingColor={colors.blue}
                  dotColor={colors.purple}
                  inactiveDotColor={colors.blue}
                  parentWidth={wp(90)}
                  onCurrentImagePressed={index => {
                    linkUrl(index);
                  }}
                />
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <View style={styles.center}>
                  <Text style={styles.title}>Generate</Text>
                  <Text style={styles.subtitle}>
                    You are not able to Generate Ticket. You are an In-active
                    User
                  </Text>
                </View>

                <SliderBox
                  images={SliderImages}
                  resizeMode={'contain'}
                  resizeMethod={'auto'}
                  autoplay={true}
                  circleLoop={true}
                  autoplayInterval={10000}
                  sliderBoxHeight={250}
                  imageLoadingColor={colors.blue}
                  dotColor={colors.purple}
                  inactiveDotColor={colors.blue}
                  parentWidth={wp(90)}
                  onCurrentImagePressed={index => {
                    linkUrl(index);
                  }}
                />
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
    width: wp(55),
    alignSelf: 'center',
    textAlign: 'justify',
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
    fontWeight: 'bold',
  },
  center: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(6),
    // backgroundColor:'red'
  },
});
