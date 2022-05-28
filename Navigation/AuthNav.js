import React from 'react';
import { Image,Pressable} from 'react-native'
import colors from '../Utilities/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Authloading from '../Screens/Authloading/Authloading';
import Login from '../Screens/Login/Login';
import SignUp from '../Screens/SignUp/SignUp';
import Forgot from '../Screens/ForgotPassword/Forgot';
import OTP from '../Screens/ForgotPassword/OTP';
import Reset from '../Screens/ForgotPassword/Reset';



const defaultNavOptions = {
    headerShown: false,
};

const AuthStack = createStackNavigator();

function AuthNav({ navigation }) {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Authloading" component={Authloading} options={{ headerShown: false }} />
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <AuthStack.Screen
                name="Forgot"
                component={Forgot}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: hp(10),
                        elevation: 0
                    },
                    headerTitle: " ",
                    headerTitleStyle: {
                        color: colors.blue,
                        fontSize: 24,
                        fontFamily: "Poppins-Bold",
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () =>
                        <Pressable onPress={() => { navigation.goBack() }}>
                            <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
                        </Pressable>
                    ,
                    headerLeftContainerStyle: {
                        padding: 10,
                        marginHorizontal: 5
                    },
                })}
            />
            <AuthStack.Screen
                name="OTP"
                component={OTP}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: hp(10),
                        elevation: 0
                    },
                    headerTitle: " ",
                    headerTitleStyle: {
                        color: colors.blue,
                        fontSize: 24,
                        fontFamily: "Poppins-Bold",
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () =>
                        <Pressable onPress={() => { navigation.goBack() }}>
                            <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
                        </Pressable>
                    ,
                    headerLeftContainerStyle: {
                        padding: 10,
                        marginHorizontal: 5
                    },
                })}
            />
            <AuthStack.Screen
                name="Reset"
                component={Reset}
                options={({ navigation }) => ({
                    headerStyle: {
                        height: hp(10),
                        elevation: 0
                    },
                    headerTitle: " ",
                    headerTitleStyle: {
                        color: colors.blue,
                        fontSize: 24,
                        fontFamily: "Poppins-Bold",
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () =>
                        <Pressable onPress={() => { navigation.goBack() }}>
                            <Image source={require('../Assets/back.png')} resizeMode={'contain'} style={{ height: 25 }} />
                        </Pressable>
                    ,
                    headerLeftContainerStyle: {
                        padding: 10,
                        marginHorizontal: 5
                    },
                })}
            />
        </AuthStack.Navigator>
    )
}
export default AuthNav;