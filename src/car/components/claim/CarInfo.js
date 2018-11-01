
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CarInfo = ({
    data,
}) => (
    <View style={css.ctItem}>
        <Text style={css.txtTitle}>B. Thông tin về xe được bảo hiểm</Text>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Biển số xe tai nạn</Text>
            <Text style={css.txtValue}>{data.target.number_plates}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Loại xe</Text>
            <Text style={css.txtValue}>{data.target.vehicle_model_code}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Năm sản xuất</Text>
            <Text style={css.txtValue}>{data.target.manufacture_year}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Hiệu xe</Text>
            <Text style={css.txtValue}>{data.target.vehicle_producer_name}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Số máy</Text>
            <Text style={css.txtValue}>{data.target.number_plates}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Chỗ ngồi</Text>
            <Text style={css.txtValue}>{data.target.number_seats}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtBold}>Tên lái xe</Text>
            <Text style={css.txtBold}>ddd</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>GPLX hạng</Text>
            <Text style={[css.txtValue, {flex: 1}]}>{data.driver.class}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text >Số:</Text>
                <Text style={[css.txtValue, {textAlign: 'right', flex: 1}]}>{data.driver.license_number}</Text>
            </View>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Hiệu lực</Text>
            <Text style={[css.txtValue, {flex: 1}]}>từ {data.driver.time_begin}</Text>
            <Text style={[css.txtValue, {flex: 1}]}>đến {data.driver.time_end}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Giấy đăng kiểm số</Text>
            <Text style={[css.txtValue, {flex: 1}]}>{data.driver.license_number}</Text>
        </View>
        <View style={css.ctRow}>
            <Text style={css.txtNormal}>Hiệu lực</Text>
            <Text style={[css.txtValue, {flex: 1}]}>từ {data.driver.time_begin}</Text>
            <Text style={[css.txtValue, {flex: 1}]}>đến {data.driver.time_end}</Text>
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
