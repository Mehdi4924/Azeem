import React from 'react';
import {
    TextInput,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../Utilities/colors';

const IconButton = (props) => {
    return (
        <TouchableOpacity onPress={props.btnPress} style={props.Button}>
            {props.Indicator ?
                <ActivityIndicator
                    color={props.IndColor}
                    size={20}
                    style={{alignSelf:'center',width:wp(80)}}
                />
                :
                <>
                    <Image
                        source={props.ImgSource}
                        style={props.ImgStyle}
                    />
                    <Text style={props.TextStyle} >{props.Title}</Text>
                </>
            }
        </TouchableOpacity>
    )
}
export default IconButton;