
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ItemExclusion from '../buy/ItemExclusion';

const AccidentInfo = ({
    data,
}) => (
    <View style={css.ctItem}>
        <Text style={css.txtTitle}>C.Thông tin về tai nạn</Text>
        <Text style={[css.txtValue, {marginTop: 5}]}>1. Chi tiết về tai nạn</Text>
        <Text style={[css.txtValue, {color: '#999999', marginLeft: 10, marginVertical: 5}]}>Diễn biến và nguyên nhân tai nạn <Text style={css.txtValue}>{data.description}</Text></Text>

        <Text style={css.txtValue}>2. Tình hình thiệt hại</Text>
        {
            data.damages ? 
            data.damages.map((item, index) => {
                return <ItemExclusion data={item} key={index}/>
            })
            : null
        }
        
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
