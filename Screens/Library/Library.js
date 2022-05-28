import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import ProFlatlist from '../../Components/ProFlatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
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
];
export default function Library({navigation}) {
  const [indicator, setindicator] = useState(false);
  const [BookView, setBookView] = useState([]);
  const [BookRead, setBookRead] = useState([]);

  useEffect(() => {
    GetBookView();
    GetBookRead();
  }, []);

  const GetBookView = async () => {
    ///// This Function is written to get All Books Which is viewed by user through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);

    axios
      .get(`${url}/view-books`, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log('Book View', response);
        if (response.data.status == 200) {
          setBookView(response.data.successData.books);
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
  const GetBookRead = async () => {
    ///// This Function is written to get All Books Which is readed by user through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);

    axios
      .get(`${url}/read-books`, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log('Book Read', response);
        if (response.data.status == 200) {
          setBookRead(response.data.successData.books);
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
      <AdBanner />

      {indicator ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={30} color={colors.blue} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>Recently Read</Text>
          <View>
            {BookRead.length > 0 ? (
              <ProFlatlist
                Data={BookRead}
                Column={3}
                Horizontal={false}
                Booktouchable={styles.booktouchable}
                Imgbook={styles.imgbook}
                Trendtext={styles.trendtext}
                btnPress={id => navigation.navigate('ProductDetail', {ids: id})}
              />
            ) : (
              <Text style={styles.center}>No Books Read Yet.</Text>
            )}
          </View>
          <Text style={styles.text}>Recently Viewed</Text>
          <View>
            {BookView.length > 0 ? (
              <ProFlatlist
                Data={BookView}
                Column={3}
                Horizontal={false}
                Booktouchable={styles.booktouchable}
                Imgbook={styles.imgbook}
                Trendtext={styles.trendtext}
                btnPress={id => navigation.navigate('ProductDetail', {ids: id})}
              />
            ) : (
              <Text style={styles.center}>No Books View Yet.</Text>
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
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.blue,
    marginTop: hp(1),
    marginLeft: hp(2),
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
    borderRadius: 10,
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
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.purple,
  },
});
