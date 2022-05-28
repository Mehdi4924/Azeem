import React from 'react';
import {
    FlatList,
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CatFlatlist = (props) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={props.Data}
            horizontal={props.Horizontal}
            numColumns={props.Column}
            renderItem={({ item }) => (
                <TouchableOpacity style={props.CatTouchable} onPress={ () => props.btnPress(item.id)} >
                    <Text numberOfLines={props.Lines} style={props.CatText} >{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    )
}
export default CatFlatlist;