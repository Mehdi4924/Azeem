import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import Button from '../../Components/Button';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import AdBanner from '../../Components/AdBanner';

const Chapter = [
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 1',
    disable: false,
    value: 'Chap1',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 2',
    disable: false,
    value: 'Chap2',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 3',
    disable: false,
    value: 'Chap3',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 4',
    disable: false,
    value: 'Chap4',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 5',
    disable: false,
    value: 'Chap5',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 6',
    disable: false,
    value: 'Chap6',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Chapter 7',
    disable: false,
    value: 'Chap7',
  },
];
// let conncection = false;
export default function Chapters(props) {
  const [indicator, setindicator] = useState(false);
  const [Chapter, setChapter] = useState([]);
  const [checked, setChecked] = React.useState('MWALLET');
  const [isModalVisible, setModalVisible] = useState(false);
  const [Chap, setChap] = useState('');

  useEffect(() => {
    GetChapters();
  }, []);

  const GetChapters = async () => {
    ///// This Function is written to get Chapter of Specific Subject through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);
    var formdata = new FormData();
    formdata.append('subject_id', props.route.params.id);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/chapters`, formdata, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log('chapters check kar looo ', response);
        if (response.data.status == 200) {
          //    setAllcat(response.data.successData.categories)
          setChapter(response.data.successData.chapters);
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
    <>
      <AdBanner />
      <View style={styles.container}>
        <View>
          {console.log('Chap===================', Chap)}
          <Modal
            isVisible={isModalVisible}
            animationIn={'flipInX'}
            animationInTiming={1000}
            animationOut={'flipOutX'}
            animationOutTiming={1000}
            onBackdropPress={() => {
              setModalVisible(false);
            }}
            style={{alignSelf: 'center'}}>
            <View style={styles.modalview}>
              <Text
                style={[
                  styles.text,
                  {marginTop: hp(16), fontSize: 18, paddingHorizontal: 20},
                ]}>
                By paying Rs {Chap.price} you will be able to attempt all Azeem
                Tests for next 24hrs
              </Text>
              <View style={styles.radioview}>
                <Text style={[styles.radiotext, {paddingRight: 20}]}>
                  Mobile Account
                </Text>
                <RadioButton
                  value="MWALLET"
                  status={checked === 'MWALLET' ? 'checked' : 'unchecked'}
                  color={colors.blue}
                  onPress={() => setChecked('MWALLET')}
                />
              </View>
              <View style={styles.radioview}>
                <Text style={styles.radiotext}>Credit/Debit Cards</Text>
                <RadioButton
                  value="MIGS"
                  color={colors.blue}
                  status={checked === 'MIGS' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('MIGS')}
                />
              </View>

              <Button
                Title="OK"
                Button={styles.button}
                TextStyle={styles.btntext}
                Indicator={indicator}
                btnPress={async () => {
                  let data = JSON.parse(await AsyncStorage.getItem('userdata'));
                  props.navigation.navigate('PaymentTests', {
                    user: data,
                    Chapter: Chap,
                    payment: checked,
                  });
                }}
              />
            </View>
          </Modal>
        </View>
        {indicator ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={30} color={colors.blue} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>{props.route.params.title}</Text>
            <View style={{alignItems: 'center'}}>
              {Chapter.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={Chapter}
                  horizontal={false}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.cattouchable}
                      onPress={async () => {
                        let userdata = JSON.parse(
                          await AsyncStorage.getItem('userdata'),
                        );
                        if (
                          userdata &&
                          userdata.email == 'azeemdigitalsolutions@gmail.com'
                        ) {
                          props.navigation.navigate('Tests', {
                            id: item.id,
                            key: 'chapter',
                          });
                        } else if (item.open === false) {
                          if (userdata == null) {
                            Toast.show('Please Login First');
                          } else {
                            setChap(item);
                            // let data = JSON.parse(await AsyncStorage.getItem('userdata'));
                            if (item.price != null) {
                              setModalVisible(true);
                            } else {
                              Toast.show('No price added for this chapter');
                            }
                          }
                          // props.navigation.navigate('PaymentTests', { user: data, Chapter: item });
                        } else {
                          props.navigation.navigate('Tests', {
                            id: item.id,
                            key: 'chapter',
                          });
                        }
                      }}>
                      {console.log('ITMMMMM', item)}
                      <Text style={styles.cattext} numberOfLines={3}>
                        {item.name}
                      </Text>
                      {item.open ? (
                        <Image
                          source={require('../../../App/Assets/unlock.png')}
                          style={{top: 5, width: 20, height: 20}}
                        />
                      ) : (
                        <Image
                          source={require('../../../App/Assets/lock.png')}
                          style={{top: 5, width: 20, height: 20}}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.center}>
                  No chapters have to displayed yet
                </Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: hp(3),
  },
  text: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: colors.blue,
    marginTop: hp(1),
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
    alignSelf: 'center',
    color: colors.purple,
  },
  modalview: {
    height: 350,
    width: wp(80),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    width: wp(30),
    height: hp(6.5),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(5),
    marginBottom: hp(15),
    shadowColor: colors.blue,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  btntext: {
    fontSize: 14,
    color: colors.white,
    marginVertical: hp(1),
    fontFamily: 'Poppins-SemiBold',
  },
  BoxContainer: {
    width: wp(70),
    height: hp(8),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightbackground,
    borderColor: colors.gray,
    marginTop: hp(3),
  },
  radioview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(70),
    marginVertical: 10,
  },
  radiotext: {
    alignSelf: 'center',
    fontSize: 16,
    color: colors.blue,
  },
});
