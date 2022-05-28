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
import Button from '../../Components/Button';
import ProFlatlist from '../../Components/ProFlatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import InputIcon from '../../Components/InputIcon';
import {DrawerActions} from '@react-navigation/native';
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
export default function CategoriesBooks(props) {
  const [CatBook, setCatBook] = useState('');
  const [indicator, setindicator] = useState(false);
  const [search, setsearch] = useState(null);

  useEffect(() => {
    CatBooks();
  }, []);

  const GetSearch = async str => {
    console.log('chek the searxh string', str);
    // setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    let data = new FormData();
    data.append('search', str);
    const AuthStr = 'Bearer '.concat(token);
    axios
      .post(`${url}/search-books`, data, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          setCatBook(response.data.successData.books);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
        // Toast.show(error.response.data.message, Toast.SHORT);
        // setindicator(false)
        // // console.log(JSON.parse(JSON.stringify(error)))
        console.log(error.response);
        console.log(error.message);
      });
  };

  const CatBooks = async () => {
    /// This function is written to get books categories from Api
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);
    let level = await AsyncStorage.getItem('Level');
    var formdata = new FormData();

    formdata.append('category_id', props.route.params.ids);
    formdata.append('level', level);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/category-books`, formdata, {
        headers: {Authorization: AuthStr},
      })
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          setCatBook(response.data.successData.books);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Pressable
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              <Image
                source={require('../../Assets/drawer.png')}
                resizeMode={'contain'}
                style={{height: 25}}
              />
            </Pressable>
            <InputIcon
              ViewStyle={styles.viewstyle}
              IconName={'magnify'}
              IconType={'material-community'}
              IconColor={colors.blue}
              IconSize={hp(4)}
              Placeholder={'Search book title'}
              InputStyle={styles.inputstyle}
              TypeKeypad={'default'}
              secureTextEntry={false}
              onChangeText={text => GetSearch(text)}
              Value={search}
            />
          </View>
          <AdBanner />
          <Text style={styles.text}>Books</Text>
          <View>
            {CatBook.length > 0 ? (
              <ProFlatlist
                Data={CatBook}
                Column={3}
                Horizontal={false}
                Booktouchable={styles.booktouchable}
                Imgbook={styles.imgbook}
                Trendtext={styles.trendtext}
                btnPress={id =>
                  props.navigation.navigate('ProductDetail', {
                    ids: id,
                    others: 1,
                  })
                }
              />
            ) : (
              <Text style={styles.center}>No Books have to displayed yet</Text>
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
  viewstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(80),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 5,
    marginVertical: hp(1),
  },
  inputstyle: {
    width: wp(70),
    // backgroundColor:'red',
    paddingHorizontal: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
    alignSelf: 'center',
    color: colors.purple,
  },
});
