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
import AdBanner from '../../Components/AdBanner';

export default function CategoriesListing(props) {
  const [indicator, setindicator] = useState(false);

  const Category = [
    {
      img: require('../../Assets/subcat1.jpg'),
      title: 'e-Books',
      description:
        props.route.params.levelname != 'others'
          ? 'Smart E-bag All In One'
          : 'Islamic',
      txt1:
        props.route.params.levelname != 'others'
          ? 'All Syllabus Books'
          : 'Poetry',
      txt2:
        props.route.params.levelname != 'others'
          ? 'Solved Papers/key Books'
          : 'Novels',
      txt3:
        props.route.params.levelname != 'others'
          ? 'Smart Syllabus Books'
          : 'Magzines',
      disable: false,
      option: '01',
    },
    {
      img: require('../../Assets/subcat2.jpg'),
      title: 'Video Lectures',
      description: 'COMING SOON',
      disable: true,
      option: '02',
    },
    {
      img: require('../../Assets/subcat3.jpg'),
      description:
        props.route.params.levelname != 'others'
          ? 'Self Assessment Tests'
          : 'ECAT',
      txt1:
        props.route.params.levelname != 'others'
          ? 'All Subjects Chapterwise/Comprehensive'
          : 'MDCAT',
      txt2:
        props.route.params.levelname != 'others'
          ? 'Time Bound Instant Results'
          : 'ENTRY TEST',
      title: 'Azeem Tests',
      disable: false,
      option: 3,
      super: false,
    },
    {
      img: require('../../Assets/subcat4.jpg'),
      description:
        props.route.params.levelname != 'others' ? 'Self Assessment' : 'ECAT',
      txt1:
        props.route.params.levelname != 'others'
          ? 'Weekly Course Assessment'
          : 'MDCAT',
      txt2:
        props.route.params.levelname != 'others'
          ? 'Healthy Competition Based'
          : 'ENTRY TEST',
      title: 'Azeem Super Tests',
      disable: false,
      option: 4,
      super: true,
    },
  ];

  useEffect(() => {
    console.log('hbvsjhvhvhvhvhvh', props.route.params.levelname);
    CatList();
  }, []);
  const CatList = async () => {
    await AsyncStorage.setItem('Level', props.route.params.levelname);
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <AdBanner />
      <View style={styles.container}>
        <Text style={styles.text}>Categories</Text>
        <View style={{alignItems: 'center'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Category}
            horizontal={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.cattouchable}
                onPress={() => {
                  if (item.title == 'e-Books') {
                    props.navigation.navigate('Dashboard');
                  } else if (item.title == 'Azeem Tests') {
                    props.navigation.navigate('Subjects', {
                      supertest: item.super,
                    });
                  } else if (item.title == 'Azeem Super Tests') {
                    console.log('check super item', item);
                    props.navigation.navigate('Subjects', {
                      supertest: item.super,
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
                      <Text style={styles.cattext}>{item.title}</Text>
                    </View>
                    <View style={{height: hp(10)}}>
                      <Text style={styles.destext}>{item.description}</Text>
                      <Text style={styles.destext}>{item.txt1}</Text>
                      <Text style={styles.destext}>{item.txt2}</Text>
                      <Text style={styles.destext}>{item.txt3}</Text>
                    </View>
                  </View>
                  {/* <View style={{ justifyContent: 'center', marginHorizontal: wp(5) }}>
                                    <Text style={{ width: 55, alignSelf: 'center', fontSize: 28, color: colors.purple }}>{item.option}</Text>
                                    <Text style={{ width: 55, alignSelf: 'center', color: colors.purple }}>OPTION</Text>
                                </View> */}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginRight: 10,
                    }}>
                    <Image
                      source={item.img}
                      style={{width: wp(15), height: hp(15)}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
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
    fontSize: hp(3),
    fontWeight: 'bold',
    color: colors.blue,
    marginTop: hp(1),
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
    paddingLeft: 10,
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
});
