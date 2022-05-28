import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import ProFlatlist from '../../Components/ProFlatlist';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import AdBanner from '../../Components/AdBanner';

const Books = [
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 1 is the best book',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 2',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 3',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 4',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 5',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 2',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 3',
  },
  {
    img: require('../../Assets/book.jpg'),
    title: 'Book 4',
  },
];
export default function FeaturedBooks(props) {
  const [indicator, setindicator] = useState(false);
  const [featured, setfeatured] = useState([]);

  useEffect(() => {
    GetFeatured();
  }, []);

  const GetFeatured = async () => {
    ///// This Function is written to get categories through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);
    let level = await AsyncStorage.getItem('Level');
    var formdata = new FormData();
    formdata.append('level', level);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/featured-books`, formdata, {
        headers: {Authorization: AuthStr},
      })
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          setfeatured(response.data.successData.books);
          setindicator(false);
        }
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
    <View style={styles.container}>
      {indicator ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={30} color={colors.blue} />
        </View>
      ) : (
        <ScrollView>
          <AdBanner />
          <Text style={styles.text}>Featured Books</Text>
          <View>
            {featured.length > 0 ? (
              <ProFlatlist
                Data={featured}
                Horizontal={true}
                Column={0}
                Booktouchable={styles.booktouchable}
                Imgbook={styles.imgbook}
                Trendtext={styles.trendtext}
                btnPress={id =>
                  props.navigation.navigate('ProductDetail', {ids: id})
                }
              />
            ) : (
              <Text style={styles.center}>
                No featured books have to displayed yet
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: colors.white,
    // paddingHorizontal: hp(3),
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    // fontWeight: 'bold',
    color: colors.blue,
    marginTop: hp(1),
    marginLeft: wp(2),
    // alignSelf: 'center'
  },
  booktouchable: {
    // width: wp(20),
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor:'red',
    // borderWidth: 1,
    borderColor: colors.purple,
    // borderRadius: 10,
    height: hp(32),
    marginVertical: hp(2),
    marginHorizontal: wp(1),
    // backgroundColor:'red'
  },
  imgbook: {
    height: hp(26),
    width: wp(30),
    borderRadius: 20,
  },
  trendtext: {
    color: colors.purple,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    width: wp(25),
    marginVertical: hp(1),
    // backgroundColor:'red'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
    alignSelf: 'center',
    color: colors.purple,
  },
});
