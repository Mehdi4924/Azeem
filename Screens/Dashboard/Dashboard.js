import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import Button from '../../Components/Button';
import ProFlatlist from '../../Components/ProFlatlist';
import CatFlatlist from '../../Components/CatFlatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import InputIcon from '../../Components/InputIcon';
import AdBanner from '../../Components/AdBanner';
import InterstitialAdss from '../../Components/InterstitialAd';

const categories = [
  {title: 'Book category 1'},
  {title: 'Book category 2'},
  {title: 'Book category 3'},
  {title: 'Book category 4'},
  {title: 'Book category 5'},
];
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

export default function Dashboard(props) {
  const [Allcat, setAllcat] = useState([]);
  const [featured, setfeatured] = useState([]);
  const [trending, settrending] = useState([]);
  const [indicator, setindicator] = useState(false);
  const [search, setsearch] = useState(null);

  useEffect(() => {
    GetCategories();
    GetFeatured();
    GetTrending();
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
          settrending(
            response.data.successData.books.filter(itm => itm.is_featured == 0),
          );
          setfeatured(
            response.data.successData.books.filter(itm => itm.is_featured != 0),
          );
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

  const GetTrending = async () => {
    ///// This Function is written to get categories through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);

    let level = await AsyncStorage.getItem('Level');
    var formdata = new FormData();
    formdata.append('level', level);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/trending-books`, formdata, {
        headers: {Authorization: AuthStr},
      })
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          settrending(response.data.successData.books);
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

  const GetCategories = async () => {
    ///// This Function is written to get categories through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);
    let level = await AsyncStorage.getItem('Level');
    var formdata = new FormData();
    formdata.append('level', level);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/categories`, formdata, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          setAllcat(response.data.successData.categories);
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
          <InterstitialAdss />
          <Text style={styles.text}>Categories</Text>
          <View>
            {Allcat.length > 0 ? (
              <CatFlatlist
                Data={Allcat}
                Horizontal={true}
                Column={0}
                Lines={1}
                CatTouchable={styles.cattouchable}
                CatText={styles.cattext}
                btnPress={id =>
                  props.navigation.navigate('CategoriesBooks', {ids: id})
                }
              />
            ) : (
              <Text style={styles.center}>
                No categories have to displayed yet
              </Text>
            )}
          </View>
          <View style={styles.trendview}>
            <Text style={styles.text}>Featured Books</Text>
            <Button
              Title="See All"
              Button={styles.button}
              TextStyle={styles.btntext}
              btnPress={() => {
                props.navigation.navigate('FeaturedBooks');
              }}
            />
          </View>
          <View style={{marginVertical: hp(1)}}>
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
          <View style={styles.trendview}>
            <Text style={styles.text}>Trending Books</Text>
            <Button
              Title="See All"
              Button={styles.button}
              TextStyle={styles.btntext}
              btnPress={() => {
                props.navigation.navigate('TrendingBooks');
              }}
            />
          </View>
          <View style={{marginVertical: hp(1)}}>
            {trending.length > 0 ? (
              <ProFlatlist
                Data={trending}
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
                No trending books have to displayed yet
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
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.blue,
    marginTop: hp(1),
    marginLeft: hp(2),
  },
  cattouchable: {
    width: wp(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 10,
    height: hp(5),
    marginVertical: hp(2),
    marginHorizontal: wp(1),
  },
  cattext: {
    color: colors.purple,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  trendview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(1),
    // backgroundColor: 'red'
  },
  button: {
    justifyContent: 'center',
    width: wp(20),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(0.6),
  },
  btntext: {
    fontSize: 14,
    color: colors.purple,
    marginVertical: hp(1),
    fontFamily: 'Poppins-Medium',
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
