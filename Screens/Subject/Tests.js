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
import AdBanner from '../../Components/AdBanner';

const Test = [
  {
    img: require('../../Assets/book.jpg'),
    name: 'Test 1',
    disable: false,
    value: 'test1',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Test 2',
    disable: false,
    value: 'test2',
  },
  {
    img: require('../../Assets/book.jpg'),
    name: 'Test 3',
    disable: false,
    value: 'test3',
  },
];
export default function Tests(props) {
  const [indicator, setindicator] = useState(false);
  const [Test, setTest] = useState([]);
  const [Subjecttype, setSubjecttype] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    GetTests();
    // console.log('Time=========',props.route.params.time);
  }, []);

  const GetTests = async () => {
    ///// This Function is written to get Chapter of Specific Subject through Api.
    setindicator(true);
    let token = await AsyncStorage.getItem('Auth');
    setToken(token);
    const AuthStr = 'Bearer '.concat(token);
    var formdata = new FormData();
    formdata.append('chapter_id', props.route.params.id);
    console.log('FormData===>>', formdata);

    axios
      .post(`${url}/chapter-mcqs`, formdata, {
        headers: {Authorization: AuthStr},
      })
      .then(async response => {
        console.log('get Test response', response);
        if (response.data.status == 200) {
          //    setAllcat(response.data.successData.categories)
          setTest(response.data.successData.tests);
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
        {indicator ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={30} color={colors.blue} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>Tests</Text>
            <View>
              {Test.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={Test}
                  horizontal={false}
                  numColumns={2}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={styles.cattouchable}
                      onPress={() =>
                        token != null
                          ? props.navigation.navigate('MCQS', {
                              id: item.id,
                              time: item.duration,
                              subject: Subjecttype,
                              key: props.route.params.key,
                            })
                          : Toast.show('To attempt Test You Must Login First')
                      }>
                      {console.log('hbsvhbvdv ', item)}
                      <Text style={styles.cattext}>Test {index + 1}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.center}>
                  No Tests have to displayed yet
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
});
