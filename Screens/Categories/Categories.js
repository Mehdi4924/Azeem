import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import CatFlatlist from '../../Components/CatFlatlist';
import NetInfo from '@react-native-community/netinfo';
import Button from '../../Components/Button';
import {ActivityIndicator} from 'react-native-paper';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import AdBanner from '../../Components/AdBanner';
const Category = [
  {
    img: require('../../Assets/book.jpg'),
    name: '9th Class',
    disable: false,
    value: '9th',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: '10th Class',
    disable: false,
    value: '10th',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: '11th Class',
    disable: false,
    value: '11th',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: '12th Class',
    disable: false,
    value: '12th',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Graduation',
    disable: false,
    value: 'graduation',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Others',
    disable: false,
    value: 'others',
  },
];
// let conncection = false;
export default function Categories({navigation}) {
  const [conncection, setconncection] = useState(true);
  const [indicator, setindicator] = useState(false);

  useEffect(() => {
    setindicator(true);
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setconncection(state.isConnected);
      console.log('check the variable', conncection);
      setindicator(false);
    });
  }, [conncection]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {conncection != false ? (
          <View>
            {indicator ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size={30} color={colors.blue} />
              </View>
            ) : (
              <View>
                <AdBanner />
                <Text style={styles.text}>Categories</Text>
                <View style={{alignItems: 'center', marginBottom: 5}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={Category}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.cattouchable}
                        onPress={() =>
                          navigation.navigate('CategoriesListing', {
                            levelname: item.value,
                          })
                        }>
                        <Text style={styles.cattext}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => {
                      //  setname(item.name);

                      Share.share(
                        {
                          title: 'Recruit Me',
                          message: `Install the application to get your favourite books ${'https://play.google.com/store/apps/details?id=com.azeem'} `,
                          subject: 'online and offline book reading for you',
                        },
                        {
                          dialogTitle: 'Share your profile',
                        },
                      );
                    }}>
                    <Image
                      source={require('../../Assets/share.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Image
              source={require('../../Assets/giphy.gif')}
              style={{width: 300, height: 300}}
            />
            <Button
              Title="Go to offline"
              Button={styles.button}
              TextStyle={styles.btntext}
              btnPress={() => {
                navigation.navigate('ReadOfflineList');
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: hp(3),
  },
  text: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: colors.blue,
    marginTop: hp(1),
    marginLeft: hp(2),
  },
  cattouchable: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.purple,
    borderRadius: hp(20),
    marginVertical: hp(2),
    marginHorizontal: wp(6),
  },
  cattext: {
    color: colors.purple,
    fontWeight: 'bold',
    fontSize: 16,
    width: wp(25),
    textAlign: 'center',
    lineHeight: hp(3),
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(50),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(1),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  btntext: {
    fontSize: 14,
    // paddingVertical: 6
    // alignSelf:'center',
    color: colors.white,
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  shareButton: {
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.blue,
    // backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
