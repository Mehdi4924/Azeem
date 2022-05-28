import React, { useState } from 'react';
import { Pressable, StyleSheet, Image,View,Text } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import colors from '../Utilities/colors';
import InputIcon from '../Components/InputIcon';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AuthNav from './AuthNav';
import Dashboard from '../Screens/Dashboard/Dashboard';
import SideBar from '../Navigation/Drawer';
import ProductDetail from '../Screens/ProductDetail/ProductDetail';
import ReadNow from '../Screens/ReadNow/ReadNow';
import AllListing from '../Screens/AllListing/AllListing';
import Library from '../Screens/Library/Library';
import Status from '../Screens/Status/Status'
import Generate from '../Screens/Ticket/Generate';
import Ticket from '../Screens/Ticket/Ticket';
import Categories from '../Screens/Categories/Categories';
import CategoriesBooks from '../Screens/Categories/CategoriesBooks';
import ReadOffline from '../Screens/ReadOffline/ReadOffline';
import ReadOfflineList from '../Screens/ReadOffline/ReadOfflineList';
import CategoriesListing from '../Screens/Categories/CategoriesListing';
import TrendingBooks from '../Screens/Books/TrendingBooks';
import FeaturedBooks from '../Screens/Books/FeaturedBooks';
import PrivacyPolicy from '../Screens/WebViews/PrivacyPolicy';
import AboutUs from '../Screens/WebViews/AboutUs';
import TermsConditions from '../Screens/WebViews/TermsConditions';
import Subjects from '../Screens/Subject/Subjects';
import Chapters from '../Screens/Subject/Chapters'
import Tests from '../Screens/Subject/Tests';
import MCQs from '../Screens/Subject/MCQs';
// import MidSuper from '../Screens/Subject/MidSuper';
import PaymentView from '../Screens/WebViews/PaymentView';
import PaymentSuperTest from '../Screens/WebViews/PaymentSuperTest'
import PaymentTests from '../Screens/WebViews/PaymentTests';
import Button from '../Components/Button';
import Modal from 'react-native-modal';


const Stack = createStackNavigator();
const drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

function Main({ navigation }) {
  const [search, setsearch] = useState(null)
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Categories"
        component={Categories}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: '',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="CategoriesListing"
        component={CategoriesListing}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="TrendingBooks"
        component={TrendingBooks}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="FeaturedBooks"
        component={FeaturedBooks}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      {/* <MainStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: () =>
            <InputIcon
              ViewStyle={styles.viewstyle}
              IconName={'magnify'}
              IconType={'material-community'}
              IconColor={colors.blue}
              IconSize={hp(4)}
              Placeholder={"Search book title"}
              InputStyle={styles.inputstyle}
              TypeKeypad={'default'}
              secureTextEntry={false}
              onChangeText={(text) => OnChangeText(text)}
              Value={search}
            />          
          // <SearchBar
          //   placeholder="Type Here..."
          //   onChangeText={text =>setsearch(text)}
          //   value={search}
          //   lightTheme
          // />
          ,
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      /> */}
      <MainStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="ReadNow"
        component={ReadNow}
        options={{ headerShown: false }}
      // options={({ navigation }) => ({
      //   headerStyle: {
      //     height: hp(10),
      //     elevation: 0
      //   },
      //   headerTitle: " ",
      //   headerLeft: () =>
      //     <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
      //       <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
      //     </Pressable>
      //   ,
      //   headerRight: () =>
      //     <Pressable onPress={() => { navigation.goBack() }}>
      //       <Image source={require('../Assets/close.png')} resizeMode={'contain'} style={{ height: 25 }} />
      //     </Pressable>
      //   ,
      //   headerLeftContainerStyle: {
      //     padding: 10,
      //     marginHorizontal: 5
      //   },
      //   headerRightContainerStyle: {
      //     padding: 10,
      //     marginHorizontal: 5
      //   },
      // })}
      />
      <MainStack.Screen
        name="ReadOffline"
        component={ReadOffline}
        options={{ headerShown: false }}
      // options={({ navigation }) => ({
      //   headerStyle: {
      //     height: hp(10),
      //     elevation: 0
      //   },
      //   headerTitle: " ",
      //   headerLeft: () =>
      //     <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
      //       <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
      //     </Pressable>
      //   ,
      //   headerRight: () =>
      //     <Pressable onPress={() => { navigation.goBack() }}>
      //       <Image source={require('../Assets/close.png')} resizeMode={'contain'} style={{ height: 25 }} />
      //     </Pressable>
      //   ,
      //   headerLeftContainerStyle: {
      //     padding: 10,
      //     marginHorizontal: 5
      //   },
      //   headerRightContainerStyle: {
      //     padding: 10,
      //     marginHorizontal: 5
      //   },
      // })}
      />
      <MainStack.Screen
        name="ReadOfflineList"
        component={ReadOfflineList}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.navigate('Dashboard') }}>
              <Image source={require('../Assets/close.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="AllListing"
        component={AllListing}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CategoriesBooks"
        component={CategoriesBooks}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Subjects"
        component={Subjects}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      // options={{headerShown:false}}

      />
      <MainStack.Screen
        name="Chapters"
        component={Chapters}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      // options={{headerShown:false}}

      />
            <MainStack.Screen
        name="Tests"
        component={Tests}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: " ",
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.navigate('Chapters') }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="MCQS"
        component={MCQs}
        options={{headerShown:false}}
        // options={({ navigation }) => ({
        //   headerStyle: {
        //     height: hp(10),
        //     elevation: 0
        //   },
        //   headerTitle: " ",
        //   headerLeft: () => ""
        //   // <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
        //   //   <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
        //   // </Pressable>
        //   ,
        //   headerRight: () =>
        //     <Pressable onPress={() => {setModalVisible(true)}}>
        //       <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
        //     </Pressable>
        //   ,
        //   headerLeftContainerStyle: {
        //     padding: 10,
        //     marginHorizontal: 5
        //   },
        //   headerRightContainerStyle: {
        //     padding: 10,
        //     marginHorizontal: 5
        //   },
        // })}
      />
      <MainStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Privacy Policy",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "About Us",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Terms & Condition",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="Library"
        component={Library}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Library",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="Status"
        component={Status}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Status",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="Generate"
        component={Generate}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Ticket",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="Ticket"
        component={Ticket}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Ticket",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />

      <MainStack.Screen
        name="PaymentView"
        component={PaymentView}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Payment",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />


      <MainStack.Screen
        name="PaymentSuperTest"
        component={PaymentSuperTest}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Payment",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />
      <MainStack.Screen
        name="PaymentTests"
        component={PaymentTests}
        options={({ navigation }) => ({
          headerStyle: {
            height: hp(10),
            elevation: 0
          },
          headerTitle: "Payment",
          headerTitleStyle: {
            color: colors.blue,
            fontSize: 24,
            fontFamily: "Poppins-Bold",
          },
          headerTitleAlign: 'center',
          headerLeft: () =>
            <Pressable onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
              <Image source={require('../Assets/drawer.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerRight: () =>
            <Pressable onPress={() => { navigation.goBack() }}>
              <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
            </Pressable>
          ,
          headerLeftContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
          headerRightContainerStyle: {
            padding: 10,
            marginHorizontal: 5
          },
        })}
      />



    </MainStack.Navigator>
  )
}


function Drawer(navigation) {
  return (
    <drawer.Navigator drawerContent={props => <SideBar {...props} />}>
      <drawer.Screen
        component={Main} name="Main"
      // options={{ headerShown: false }} 
      />
    </drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthNav" component={AuthNav} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 10
  },
  modalview: {
    height: 350,
    width: wp(75),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
text: {
  fontSize: 20,
  fontWeight: 'bold',
  color: colors.blue,
  marginVertical: hp(1),
  // alignSelf: 'center'
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
  shadowOffset: { width: 5, height: 5 },
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
})