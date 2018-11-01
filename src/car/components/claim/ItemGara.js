
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ItemGara = ({
    data,
}) => (
    <TouchableOpacity onPress={() => Actions.carClaimCalendar({gara: data})} style={css.ct}>
        <Image style={css.icon} source={require('../../../icons/ic_location.png')}/>
        <View style={css.content}>
            <Text style={css.name}>{data.name}</Text>
            <Text style={css.address}>{data.address}</Text>
        </View>
    </TouchableOpacity>
);

const css = StyleSheet.create({
    icon: {
        height: 35,
        width: 35
    },
    ct: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        flex: 1,
        paddingVertical: 10,
        marginLeft: 20
    },
    name:  {
        color: '#323643',
        fontSize: 16
    },
    address: {
        color: '#9e9e9e'
    },
})

export default ItemGara;
