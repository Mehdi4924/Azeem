import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProFlatlist from '../../Components/ProFlatlist';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import AdBanner from '../../Components/AdBanner';

export default function ReadOfflineList({navigation}) {
  const [data, setdata] = useState('');
  const [indicator, setindicator] = useState(false);

  useEffect(() => {
    getOfflineData();
  }, []);

  const getOfflineData = async () => {
    setindicator(true);
    // let asdf = await AsyncStorage.removeItem('offlineData');
    let check = await AsyncStorage.getItem('offlineData');
    console.log('check the  offline book data from', JSON.parse(check));
    setdata(JSON.parse(await AsyncStorage.getItem('offlineData')));
    setindicator(false);
    // setindicator(true)
    // // console.log('check params data and offilne data', this.props.route.params.link);
    // let check = await AsyncStorage.getItem('offlineData');
    // console.log("check the  offline book data", JSON.parse(check));
    // setdata(JSON.parse(check))
    // setindicator(false)
    // setindicator(true)
    // let token = await AsyncStorage.getItem("Auth")
    // const AuthStr = 'Bearer '.concat(token);
    // console.log(AuthStr);
    // // var formdata = new FormData();
    // // formdata.append('book_id', props.route.params.ids);
    // // console.log('FormData===>>', formdata);

    // axios.get(`${url}/user-downloaded-books`, { headers: { Authorization: AuthStr } }
    // ).then(async (response) => {
    //     console.log(response);
    //     if (response.data.status == 200) {
    //         await AsyncStorage.setItem('offlineData', JSON.stringify(response.data.successData.books));
    //         setindicator(false)
    //         let check = await AsyncStorage.getItem('offlineData');
    //         console.log("check the  offline book data", JSON.parse(check));
    //         setdata(JSON.parse(await AsyncStorage.getItem('offlineData')))

    //     }
    // })
    //     .catch((error) => {
    //         // handle error
    //         console.log(error);
    //         setindicator(false)
    //         Toast.show(error.response.data.message, Toast.SHORT);
    //         // console.log(JSON.parse(JSON.stringify(error)))
    //         console.log(error.response);
    //         console.log(error.message);
    //     })
  };
  return (
    <View style={styles.container}>
      <AdBanner />
      <Text style={styles.text}>Offline Books</Text>
      {indicator ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={30} color={colors.blue} />
        </View>
      ) : (
        <View style={{alignSelf: 'center'}}>
          {data != null && data.length != 0 ? (
            <FlatList
              data={data}
              horizontal={false}
              numColumns={3}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.booktouchable}
                  onPress={() => {
                    //   console.log('HIII',item);
                    navigation.navigate('ReadOffline', {link: item.path});
                    // { console.log('clicked bok is ',item.path) }
                  }}>
                  <Image
                    source={{uri: item.image}}
                    resizeMode={'cover'}
                    style={styles.imgbook}
                  />
                  <Text style={styles.trendtext}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.crossView}
                    onPress={async () => {
                      console.log('this is item on press', item);
                      var filteredArray = data.filter(e => e.id !== item.id);
                      await AsyncStorage.setItem(
                        'offlineData',
                        JSON.stringify(filteredArray),
                      );
                      setdata(filteredArray);
                    }}>
                    <Image
                      source={require('../../Assets/close.png')}
                      style={styles.iconStyles}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.center}>No books have to displayed yet</Text>
          )}
        </View>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
    alignSelf: 'center',
    color: colors.purple,
  },
  crossView: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    position: 'absolute',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    top: 5,
  },
  iconStyles: {width: 15, height: 15, borderRadius: 20},
});
