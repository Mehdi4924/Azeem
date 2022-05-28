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


const ProFlatlist = (props) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={props.Data}
            horizontal={props.Horizontal}
            numColumns={props.Column}
            renderItem={({ item }) => (
                <TouchableOpacity style={props.Booktouchable} onPress={()=>props.btnPress(item.id)}>
                    {/* <View style={{
                        width:120,
                        backgroundColor: 'transparent',
                        borderWidth:0.1,
                        shadowColor: '#000',
                        shadowOffset: { width:40, height: 40 },
                        shadowOpacity: 1,
                        shadowRadius: 20,
                        elevation: 20,
                    }}> */}
                    {/* <Image source={item.img} resizeMode={'stretch'} style={props.Imgbook} /> */}
                    <Image source={{uri:item.featured_image}} resizeMode={'cover'} style={props.Imgbook} />

                    {/* </View> */}
                    <Text style={props.Trendtext} numberOfLines={2} >{item.title}</Text>
                </TouchableOpacity>
            )}
        />
    )
}
export default ProFlatlist;