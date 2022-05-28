import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Utilities/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Authloading({ navigation }) {
    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.replace('Login')
    //     }, 4000);
    // }, [])

    useEffect(() => {
        tokendata();
    }, [])

    const tokendata = async () => {
        let token = await AsyncStorage.getItem('Auth');
        if (token && token != null) {
            navigation.replace('Drawer')
            console.log("yeh chala drawer walal",token);
        } else {
            setTimeout(() => {
                navigation.replace('Login')
            }, 5000);

        }

    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 2,justifyContent:'center' }}>
                <Image source={require('../../Assets/mainlogo.png')} resizeMode={"contain"} style={{ alignSelf: 'center',height:hp(30) }} />
            </View>
            <View style={{ flex: 1,justifyContent:'center' }}>
                <Image source={require('../../Assets/bottomlogo.jpg')} resizeMode={"contain"} style={{ alignSelf: 'center',alignSelf:'center',height:hp(15) }} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    text: {
        fontSize: hp(6.5),
        fontWeight: 'bold',
        color: 'purple',
        alignSelf: 'center'
    }
});