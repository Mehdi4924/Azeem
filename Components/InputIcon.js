import React from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const InputIcon = (props) => {
    return (
        <View style={props.ViewStyle}>
            <Icon
                name={props.IconName}
                type={props.IconType}
                color={props.IconColor}
                size={props.IconSize}
                style={{marginHorizontal:wp(3)}}
            />
            <TextInput
                placeholder={props.Placeholder}
                style={props.InputStyle}
                onChangeText={props.onChangeText}
                value={props.Value}
                keyboardType={props.TypeKeypad}
                secureTextEntry={props.secureTextEntry ? true : false}
            />
        </View>
    )
}
export default InputIcon;