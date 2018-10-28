
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemExclusion from '../buy/ItemExclusion';

const AccidentInfo = ({
    params,
}) => (
    <View style={css.ctItem}>
        <Text style={css.txtTitle}>C.Thông tin về tai nạn</Text>
        <Text style={css.txtValue}>1. Chi tiết về tai nạn</Text>
        <Text style={css.txtValue}>2. Tình hình thiệt hại</Text>
        <ItemExclusion data=''/>
    </View>
);

const css = StyleSheet.create({
    ctItem: {
        marginTop: 20
    },
    txtValue: {
        color: '#333',
        fontSize: 13
    },
    txtTitle: {
        color: '#333',
        fontWeight: 'bold',
    },
    
})

export default AccidentInfo;
