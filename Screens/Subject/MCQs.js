import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';
import {set} from 'react-native-reanimated';
import HTML from 'react-native-render-html';
import AdBanner from '../../Components/AdBanner';
const contentWidth = wp(100);
let itmarray = [];
export default function MCQs(props) {
  const [indicator, setindicator] = useState(false);
  const [disable, setdisable] = useState(false);
  const Timer = props.route.params.time;
  const [page, setpage] = useState(1);
  const [total, settotal] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [check, setcheck] = useState(0);
  const [checkstatus, setcheckstatus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Questions, setQuestions] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [ModalShow, setModalShow] = useState(false);

  useEffect(() => {
    // itmarray=[];
    console.log('check your comming state', props.route.params.subid);
    props.navigation.addListener('focus', () => {
      // The screen is focused
      console.log('userka data check hoga');
      GetMCQS(1);
      // Call any action
    });

    userdata();

    expiretest();
  }, [1000]);

  const gettime = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  };
  const userdata = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('userdata'));
    console.log('user ka daaaataaaa',data);
    setname(data.name);
    setemail(data.email);
    console.log('User Data ====', data);
  };
  const GetMCQS = async count => {
    console.log('1212121212', page);
    ///// This Function is written to get subjects through Api.
    setcheckstatus(false);
    // setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    console.log('Page ===', count);
    const AuthStr = 'Bearer '.concat(token);
    var formdata = new FormData();
    formdata.append('mcqs_id', props.route.params.id);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/mcqs-questions?page=${count}`, formdata, {
        headers: {Authorization: AuthStr},
      })
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          settotal(response.data.successData.total);
          setQuestions(response.data.successData.question);
          setpage(count);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
        Toast.show(error.response.data.message, Toast.SHORT);
        setindicator(false);
        console.log(error.response);
        console.log(error.message);
      });
  };
  const expiretest = async () => {
    if (props.route.params.key == 'super') {
      let userdata = JSON.parse(await AsyncStorage.getItem('userdata'));
      if (userdata.email == 'azeemdigitalsolutions@gmail.com') {
        console.log('NO Expire Api calll');
      } else {
        let token = await AsyncStorage.getItem('Auth');
        const AuthStr = 'Bearer '.concat(token);
        var formdata = new FormData();
        formdata.append('subject_id', props.route.params.subid);
        console.log('FormData===>>', formdata, AuthStr);

        axios
          .post(`${url}/expire-test`, formdata, {
            headers: {Authorization: AuthStr},
          })
          .then(async response => {
            console.log('response of subject-expire', response);
            // if (response.data.status == 200) {
            // }
          })
          .catch(error => {
            // handle error
            console.log(JSON.parse(JSON.stringify(error)));
            Toast.show(error.response.data.message, Toast.SHORT);
            setindicator(false);
          });
      }
    }
  };

  return (
    <>
      <AdBanner />
      <View
        style={{
          height: hp(10),
          backgroundColor: colors.white,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <Pressable
          style={{width: wp(10), height: hp(7), justifyContent: 'center'}}
          onPress={() => {
            setModalShow(true);
          }}>
          <Image
            source={require('../../Assets/back.png')}
            resizeMode={'contain'}
            style={{height: 25}}
          />
        </Pressable>
      </View>
      <View style={styles.container}>
        {/* /////////////////////Leave Test Modal Starts/////////////////////// */}
        <View>
          <Modal
            isVisible={ModalShow}
            animationIn={'flipInX'}
            animationInTiming={1000}
            animationOut={'flipOutX'}
            animationOutTiming={1000}
            onBackdropPress={() => {
              setModalShow(false);
            }}
            style={{alignSelf: 'center'}}>
            <View style={[styles.modalview, {height: 250, width: wp(75)}]}>
              <Text
                style={[
                  styles.text,
                  {marginTop: hp(16), fontSize: 18, paddingHorizontal: 15},
                ]}>
                Are you sure you want to leave the test?
              </Text>
              <Button
                Title="Leave the Test"
                Button={[styles.button, {width: wp(50)}]}
                TextStyle={styles.btntext}
                // Indicator={indicator}
                btnPress={() => {
                  expiretest();
                  props.navigation.navigate('CategoriesListing');
                }}
              />
            </View>
          </Modal>
        </View>
        {/* /////////////////////Leave Test Modal Ends/////////////////////// */}

        {/* /////////////////////Test Ends Modal Starts/////////////////////// */}

        <View>
          <Modal
            isVisible={isModalVisible}
            animationIn={'flipInX'}
            animationInTiming={1000}
            animationOut={'flipOutX'}
            animationOutTiming={1000}
            style={{alignSelf: 'center'}}>
            <View style={[styles.modalview, {height: 350, width: wp(75)}]}>
              <Text style={[styles.text, {marginTop: hp(15)}]}>Result</Text>
              <Text style={styles.optiontext}>Email-ID : {email}</Text>
              <Text style={styles.optiontext}>Name: {name}</Text>
              <Text style={styles.optiontext}>Total Questions : {total}</Text>
              <Text style={styles.optiontext}>
                Correct Answers : {itmarray.length}
              </Text>
              <Text style={styles.optiontext}>Time : {currentDate}</Text>
              <Button
                Title="OK"
                Button={[styles.button, {width: wp(30)}]}
                TextStyle={styles.btntext}
                Indicator={indicator}
                btnPress={() => {
                  setModalVisible(false);
                  itmarray = [];
                  props.navigation.navigate('CategoriesListing');
                }}
              />
            </View>
          </Modal>
        </View>

        {/* ///////////////////// Test Modal Ends/////////////////////// */}

        {indicator ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={30} color={colors.blue} />
          </View>
        ) : (
          <>
            <View style={styles.topview}>
              <View style={styles.topsubview}>
                <Text style={styles.toptext}>
                  {page} / {total}
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CountDown
                  size={16}
                  until={Timer * 60}
                  // onFinish={() => alert('Finished')}
                  onFinish={async () => {
                    gettime();
                    setModalVisible(true);
                  }}
                  digitStyle={{
                    backgroundColor: colors.white,
                    borderWidth: 2,
                    borderColor: colors.blue,
                  }}
                  digitTxtStyle={{color: colors.purple}}
                  timeLabelStyle={{fontWeight: 'bold'}}
                  separatorStyle={{color: colors.purple}}
                  timeToShow={['H', 'M', 'S']}
                  timeLabels={{h: '', m: '', s: ''}}
                  showSeparator
                />
              </View>
              <Pressable
                style={styles.topsubview}
                onPress={() => {
                  if (page == total) {
                    gettime();
                    setModalVisible(true);
                  } else {
                    setdisable(false);
                    let add = page + 1;

                    GetMCQS(add);
                  }
                }}>
                <Text style={styles.toptext}>Skip</Text>
              </Pressable>
            </View>

            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={Questions}
                horizontal={false}
                renderItem={({item}) => (
                  <>
                    <View style={styles.questionview}>
                      <HTML
                        source={{html: item.title}}
                        contentWidth={contentWidth}
                      />
                      {/* <Text style={styles.text}>{item.title}</Text> */}
                    </View>
                    {item.options.map(item1 => {
                      return (
                        <TouchableOpacity
                          // style={{ ...styles.optionview, ...{ backgroundColor: checkstatus == false ? colors.white : item1.id == check ? item1.is_true == 1 ? colors.success : colors.danger : item1.is_true == 1 ? colors.success : colors.white } }}
                          //  style={{...styles.optionview, ...{ borderColor: checkstatus == false? colors.blue : item1.id == check ? item1.is_true == 1 ? colors.success: colors.danger : colors.blue }}}
                          style={{
                            ...styles.optionview,
                            ...{
                              borderColor:
                                checkstatus == false
                                  ? colors.blue
                                  : item1.id == check
                                  ? item1.is_true == 1
                                    ? colors.success
                                    : colors.danger
                                  : item1.is_true == 1
                                  ? colors.success
                                  : colors.blue,
                            },
                          }}
                          disabled={disable}
                          onPress={() => {
                            setcheckstatus(true);
                            setcheck(item1.id);
                            setdisable(true);
                            if (item1.is_true == 1) {
                              itmarray.push(item1);
                              console.log('array pof items', itmarray);
                            }
                          }}>
                          <HTML
                            source={{html: '<p>' + item1.option + '</p>'}}
                            contentWidth={contentWidth}
                            style={[styles.optiontext, {width: wp(70)}]}
                          />
                          {/* <Text numberOfLines={3} style={[styles.optiontext, { width: wp(70) }]}>{item1.option}</Text> */}
                        </TouchableOpacity>
                      );
                    })}
                    <Button
                      Title="Next"
                      Button={[styles.button, {width: wp(30)}]}
                      TextStyle={styles.btntext}
                      Indicator={indicator}
                      btnPress={() => {
                        if (checkstatus == true) {
                          if (page == total) {
                            gettime();
                            setModalVisible(true);
                          } else {
                            setdisable(false);
                            let add = page + 1;

                            GetMCQS(add);
                          }
                        } else {
                          Toast.show('Please select any answer to continue');
                        }
                      }}
                    />
                  </>
                )}
              />
            </View>
          </>
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
    // paddingHorizontal: hp(3),
    paddingLeft: wp(2),
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blue,
    marginVertical: hp(1),
    // alignSelf: 'center'
  },
  optionview: {
    width: wp(80),
    borderWidth: 2,
    // height: hp(6),
    borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(0.8),
    borderRadius: 5,
  },
  optiontext: {
    color: colors.purple,
    // fontWeight: 'bold',
    //    backgroundColor:'red',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 5,
    // lineHeight: hp(3)
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  topsubview: {
    height: 60,
    justifyContent: 'center',
    width: 60,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 40,
  },
  toptext: {
    color: colors.purple,
    fontSize: 16,
  },
  questionview: {
    width: wp(90),
    // borderWidth: 1,
    // borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(6),
    borderRadius: 10,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.blue,
    borderColor: colors.blue,

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
  modalview: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
