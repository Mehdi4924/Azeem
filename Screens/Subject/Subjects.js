import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import Modal from 'react-native-modal';
import Button from '../../Components/Button';
import AdBanner from '../../Components/AdBanner';
const Subject = [
  {
    img: require('../../Assets/subcat1.jpg'),
    title: 'English',
    description: 'MCQs',
    txt1: 'Short Questions',
    txt2: 'Chapter / Half Book / Full Book wise',
    // txt3: 'Smart Syllabus',
    disable: false,
    option: '01',
  },
  {
    img: require('../../Assets/subcat2.jpg'),
    title: 'Urdu',
    description: 'MCQs',
    txt1: 'Short Questions',
    txt2: 'Chapter / Half Book / Full Book wise',
    // txt3: 'Smart Syllabus',
    disable: true,
    option: '02',
  },
  {
    img: require('../../Assets/subcat3.jpg'),
    title: 'Biology',
    description: 'MCQs',
    txt1: 'Short Questions',
    txt2: 'Chapter / Half Book / Full Book wise',
    // txt3: 'Smart Syllabus',
    disable: true,
    option: '03',
  },
  {
    img: require('../../Assets/subcat4.jpg'),
    title: 'Zoology',
    description: 'MCQs',
    txt1: 'Short Questions',
    txt2: 'Chapter / Half Book / Full Book wise',
    // txt3: 'Smart Syllabus',
    disable: true,
    option: '04',
  },
];
export default function Subjects(props) {
  const [indicator, setindicator] = useState(false);
  const [Subject, setSubject] = useState([]);
  const [MCQ, setMCQ] = useState(null);
  const [checked, setChecked] = React.useState('MWALLET');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetSubjects();
  }, []);

  const GetSubjects = async () => {
    ///// This Function is written to get subjects through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');

    const AuthStr = 'Bearer '.concat(token);
    let level = await AsyncStorage.getItem('Level');
    var formdata = new FormData();
    formdata.append('level', level);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/subjects`, formdata, {headers: {Authorization: AuthStr}})
      .then(async response => {
        console.log(response);
        if (response.data.status == 200) {
          //    setAllcat(response.data.successData.categories)
          setSubject(response.data.successData.subjects);
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
  const getMCQ = async item => {
    ///// This Function is written to get Chapter of Specific Subject through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    const AuthStr = 'Bearer '.concat(token);
    var formdata = new FormData();
    formdata.append('subject_id', item.id);
    console.log('FormData===>>', formdata);
    axios
      .post(`${url}/super-mcqs`, formdata, {
        headers: {Authorization: AuthStr},
      })
      .then(async response => {
        console.log('HII RES==', response.data.successData.mcqs);
        setMCQ(response.data.successData.mcqs);
        if (response.data.successData.mcqs != null) {
          if (
            response.data.successData.open === false &&
            response.data.successData.mcqs != null
          ) {
            let userdata = JSON.parse(await AsyncStorage.getItem('userdata'));
            if (userdata == null) {
              Toast.show('Please Login First');
              props.navigation.goBack();
            } else {
              if (
                userdata &&
                userdata.email == 'azeemdigitalsolutions@gmail.com'
              ) {
                console.log('Check DATAA===============================', MCQ);
                props.navigation.navigate(
                  'MCQS',
                  response.data.successData.mcqs && {
                    id: response.data.successData.mcqs.id,
                    time: response.data.successData.mcqs.duration,
                    subject: true,
                    key: 'super',
                    subid: response.data.successData.mcqs.subject_id,
                  },
                );
              } else if (
                response.data.successData.mcqs &&
                response.data.successData.mcqs.price != null
              ) {
                setModalVisible(true);
                setindicator(false);
              } else {
                Toast.show('No price added for this test!');
                setindicator(false);
              }
            }
          } else {
            Toast.show('No Test Added yet!');
            // let data = JSON.parse(await AsyncStorage.getItem('userdata'));
            // props.navigation.navigate('MCQS', { id: MCQ.id, time: MCQ.duration, subject: true, key: 'super', subid:MCQ.subject_id });
            setindicator(false);
          }
        } else {
          Toast.show('No MCQS Added yet!');
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

  return indicator ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {console.log('chck your MCQ Hooks', MCQ)}
      <ActivityIndicator size={30} color={colors.blue} />
    </View>
  ) : (
    <View style={styles.container}>
      <AdBanner />
      <View>
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
              By paying Rs {MCQ && MCQ.price} you will be able to attempt
              Scheduled Azeem Super Test
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
                if (data == null) {
                  Toast.show('Please Login First');
                } else {
                  props.navigation.navigate('PaymentSuperTest', {
                    user: data,
                    MCQ: MCQ,
                    payment: checked,
                  });
                }
              }}
            />
          </View>
        </Modal>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, {fontSize: hp(3)}]}>Subjects</Text>
        <View style={{alignItems: 'center'}}>
          {Subject.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={Subject}
              horizontal={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.cattouchable}
                  onPress={() => {
                    console.log(
                      'superrrr test check',
                      props.route.params.supertest,
                    );
                    if (props.route.params.supertest == true) {
                      // let userdata = JSON.parse(await AsyncStorage.getItem("userdata"))
                      // if (userdata.email == "azeemdigitalsolutions@gmail.com") {
                      //   console.log("Check DATAA===============================",MCQ)
                      //   props.navigation.navigate('MCQS', { id: MCQ.id, time: MCQ.duration, subject: true, key: 'super', subid:MCQ.subject_id })

                      // }else{

                      // }
                      console.log(
                        'Check Item===============================',
                        item,
                      );

                      getMCQ(item);
                    } else {
                      props.navigation.navigate('Chapters', {
                        id: item.id,
                        title: item.name,
                      });
                    }
                  }}
                  disabled={item.disable == true ? true : false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: wp(90),
                    }}>
                    <View style={{marginVertical: hp(3)}}>
                      <View style={styles.titleview}>
                        <Text numberOfLines={1} style={styles.cattext}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{height: hp(10)}}>
                        <Text style={styles.destext}>MCQs</Text>
                        <Text style={styles.destext}>Short Questions</Text>
                        <Text style={styles.destext}>
                          Chapter / Half Book / Full Book wise
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.center}>No subjects have to displayed yet</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: colors.white,
    // paddingHorizontal: hp(3),
    // paddingLeft: wp(2),
  },
  text: {
    fontWeight: 'bold',
    color: colors.blue,
    marginTop: hp(1),
    marginLeft: wp(2),
    // alignSelf: 'center'
  },
  cattouchable: {
    // width: wp(35),
    width: wp(92),
    height: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // borderWidth: 0.1,
    borderColor: colors.purple,
    elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // borderRadius:hp(20),
    // height: hp(21),
    marginVertical: hp(1),
    marginHorizontal: wp(2),
    // backgroundColor:'red'
  },
  cattext: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    // width: wp(65),
    textAlign: 'center',
    lineHeight: hp(3),
    width: '80%',
  },
  destext: {
    fontSize: 12,
    width: wp(65),
    color: colors.purple,
    fontFamily: 'Poppins-Regular',
    // textAlign: 'justify'
  },
  titleview: {
    // borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.purple,
    // borderColor: colors.blue,
    width: wp(50),
    height: hp(4),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(1),
    // shadowColor: colors.blue,
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 5,
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
