import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useLinkProps, DrawerActions} from '@react-navigation/native';
import {Icon, Divider} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Navigation from './Navigation';
import colors from '../Utilities/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
let conncection = '';
export default function SideBar(props) {
  const [authToken, setAuthToken] = useState();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      conncection = state.isConnected;
      console.log('check the variable', conncection);
    });
    getUser();
  }, []);
  const OnLogOut = async () => {
    await AsyncStorage.removeItem('Auth');
    await AsyncStorage.removeItem('userdata');
    props.navigation.navigate('AuthNav');
  };
  const getUser = async () => {
    let token = await AsyncStorage.getItem('Auth');
    setAuthToken(token);
  };

  return (
    <View style={{flex: 1, alignItems: 'flex-start'}}>
      {conncection != false ? (
        <ScrollView
          style={{margin: wp(2), marginVertical: hp(6)}}
          showsVerticalScrollIndicator={false}>
          {console.log('here in else', conncection)}
          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('Dashboard');
            }}>
            {/* <Icon name="store-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('AllListing');
            }}>
            {/* <Icon name="store-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>Book Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('Categories');
            }}>
            {/* <Icon name="account-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>Categories</Text>
          </TouchableOpacity>
          {authToken != null ? (
            <>
              <TouchableOpacity
                style={styles.tabstyle}
                onPress={() => {
                  props.navigation.navigate('Library');
                }}>
                {/* <Icon name="shopping-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
                <Text style={styles.screentxt}>My Library</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabstyle}
                onPress={() => {
                  props.navigation.navigate('ReadOfflineList');
                }}>
                {/* <Icon name="shopping-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
                <Text style={styles.screentxt}>Offline Books</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabstyle}
                onPress={() => {
                  props.navigation.navigate('Status');
                }}>
                {/* <Icon name="shape-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
                <Text style={styles.screentxt}>Status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabstyle}
                onPress={() => {
                  props.navigation.navigate('Generate');
                }}>
                {/* <Icon name="cart" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
                <Text style={styles.screentxt}>Generate Ticket</Text>
              </TouchableOpacity>
            </>
          ) : null}
          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('PrivacyPolicy');
            }}>
            {/* <Icon name="heart-multiple-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('AboutUs');
            }}>
            {/* <Icon name="card-account-mail-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('TermsConditions');
            }}>
            {/* <Icon name="credit-card-multiple-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              if (authToken != null) {
                OnLogOut();
              } else {
                props.navigation.navigate('AuthNav');
              }
            }}>
            {/* <Icon name="logout" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>
              {authToken != null ? 'Logout' : 'Login'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <Image
            source={require('../Assets/giphy.gif')}
            style={{width: 300, height: 300}}
          />

          <TouchableOpacity
            style={styles.tabstyle}
            onPress={() => {
              props.navigation.navigate('ReadOfflineList');
            }}>
            {/* <Icon name="shopping-outline" type="material-community" color='#F47E23' size={30} style={{ marginTop: 5 }} /> */}
            <Text style={styles.screentxt}>Offline Books</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topview: {
    height: hp(20),
    //backgroundColor: '#e52d27',
    width: '100%',
  },
  tabstyle: {
    marginVertical: 5,
    borderBottomColor: colors.purple,
    borderBottomWidth: 1,
    width: wp(60),
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  screentxt: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.blue,
    margin: 8,
  },

  usertxt: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    margin: 2,
  },
});
