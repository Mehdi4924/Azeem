import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import Button from '../../Components/Button';
import ProFlatlist from '../../Components/ProFlatlist';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../Utilities/url';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {DrawerActions} from '@react-navigation/native';
import AdBanner from '../../Components/AdBanner';
import {TextInput} from 'react-native';

export default class ReadOffline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      Total: 0,
      source: props.route.params.link,
    };
    this.pdf = null;
  }
  render() {
    return (
      <View style={styles.container}>
        {console.log('Path', this.props.route.params.link)}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              marginVertical: 15,
            }}
            onPress={() => {
              this.props.navigation.dispatch(DrawerActions.toggleDrawer());
            }}>
            <Image
              source={require('../../Assets/drawer.png')}
              resizeMode={'contain'}
              style={{height: 25}}
            />
          </Pressable>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              marginVertical: 15,
              color: colors.blue,
            }}>
            {this.state.page} / {this.state.Total}
          </Text>
          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              marginVertical: 15,
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              source={require('../../Assets/close.png')}
              resizeMode={'contain'}
              style={{height: 25}}
            />
          </Pressable>
        </View>
        <AdBanner />
        <Pdf
          // source={{uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf'}}
          //  source={{uri:'https://azeemebook.ranglerz.pw/public/storage/files/E0ltJnJQ4ha5qmZpXwgAdlxxbAITetSyg7Q8UPLu.pdf'}}
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={{uri: this.state.source}}
          onLoadComplete={(numberOfPages, filePath) => {
            this.setState({Total: numberOfPages});
            // setTotal(numberOfPages);
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            this.setState({page: page});
            // setpage(page);
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
        <TextInput
          placeholder={'Jump To'}
          onChangeText={text => {
            text != ''
              ? this.pdf.setPage(JSON.parse(text))
              : this.pdf.setPage(0);
          }}
          keyboardType={'number-pad'}
          style={{
            width: wp(20),
            borderRadius: 5,
            position: 'absolute',
            bottom: 5,
            backgroundColor: 'white',
            color: 'blue',
            alignSelf: 'center',
            zIndex: 1000,
          }}
        />
        {/* <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    width: 120,
                    backgroundColor: 'transparent',
                    borderWidth: 0.1,
                    shadowColor: '#000',
                    shadowOffset: { width: 40, height: 40 },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    elevation: 20,
                    alignSelf: 'center'
                }}>
                    <Image source={require('../../Assets/book.jpg')} resizeMode={'contain'} style={styles.bookimg} />
                </View>
                <View style={styles.chview}>
                    <Pressable>
                        <Image source={require('../../Assets/left.png')} />
                    </Pressable>
                    <Text style={styles.booktitle}>Chapter 1</Text>
                    <Pressable>
                        <Image source={require('../../Assets/right.png')} />
                    </Pressable>
                </View>
                <Text style={styles.text} >Heading</Text>
                <Text style={styles.detailtext} >There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                <Text style={styles.detailtext}> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
                <Text style={styles.detailtext}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
                <Text style={styles.text} >Heading</Text>
                <Text style={styles.detailtext} >There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
                <Text style={styles.detailtext}> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
            </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: colors.white,
    // paddingHorizontal: hp(3),
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: colors.black,
    // marginTop: hp(1)
    // alignSelf: 'center'
  },
  detailtext: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: hp(2.5),
    textAlign: 'justify',
    marginVertical: hp(1),
  },
  bookimg: {
    height: hp(26),
    width: wp(30),
    borderRadius: 20,
  },
  booktitle: {
    color: colors.purple,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    // fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    width: wp(30),
    marginVertical: hp(2),
    // backgroundColor:'blue'
  },
  chview: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wp(60),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(3),
    // backgroundColor:'red'
  },
});
