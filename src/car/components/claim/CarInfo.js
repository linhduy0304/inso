
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CarInfo = ({
    params,
}) => (
    <View style={css.ctItem}>
        <Text style={css.txtTitle}>B. Thông tin về xe được bảo hiểm</Text>
        <View style={css.ctRow}>
            <Text style={css.txtBold}>Biển số xe tai nạn</Text>
            <Text style={css.txtBold}>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Loại xe</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Năm sản xuất</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Hiện xe</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Số máy</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Chỗ ngồi</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtBold}>Tên lái xe</Text>
            <Text style={css.txtBold}>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>GPLX hạng</Text>
            <Text>ddd</Text>
            <Text>Số</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Hiện lực</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Giấy đăng kiểm số</Text>
            <Text>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Hiệu lực</Text>
            <Text>ddd</Text>
        </View>
    </View>
);

const css = StyleSheet.create({
    txtValue: {
        color: '#333',
        fontSize: 13
    },
    txtTitle: {
        color: '#333',
        fontWeight: 'bold',
    },
    txtNormal:  {
        color: '#999',
        width: 150
    },
    ctItem: {
        marginTop: 20
    },
    txtBold: {
        color: '#333',
        fontSize: 13,
        fontWeight: 'bold',
        width: 150
    },
    ctRow: {
        flexDirection: 'row',
        marginTop: 10
    },
})

export default CarInfo;
