import React from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../Utilities/colors';

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.btnPress} style={props.Button}>
            {props.Indicator ?
                <ActivityIndicator
                    color={colors.white}
                    size={20}
                />
                :
                <Text style={props.TextStyle} >{props.Title}</Text>
            }
        </TouchableOpacity>
    )
}
export default Button;