import React from 'react';
import { View, TextInput, Text } from 'react-native';
import colors from '../Utilities/colors';

const TitleInput = (props) => {
    return (
        <View>
            <Text style={props.titleStyles} >{props.title}</Text>
            <TextInput
                placeholder={props.Placeholder}
                placeholderTextColor={colors.purple}
                onChangeText={props.OnChange}
                keyboardType={props.Type}
                value={props.Value}
                style={props.Styles}
            />
        </View>
    )
}
export default TitleInput;