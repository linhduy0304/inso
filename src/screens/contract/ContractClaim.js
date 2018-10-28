
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FooterButton from '../../components/FooterButton';
import Css from '../../config/Css';
import Button from '../../components/Button';
import Nav from '../../components/Nav';

class ContractClaim extends Component {
    constructor(props) {
        super(props);
        this.state = {
        data: [],
            note: 'Lưu ý quan trọng: Nguời kê khai phải đọc kỹ và hiểu rõ những yêu cầu trước khi kê khai. Doanh nghiệp bảo hiểm có thể từ chối hoặc giảm số tiền bồi thường nếu nhận được nội dung kê khai thiếu trung thực.',
            txtVerify: 'Tôi xác nhận đã được PTI giải quyết bồi thường qua ứng dụng INSO và không có bất cứ khiếu nại nào về việc giải quyết bồi thường của PTI'
        };
    }

	componentWillMount = () => {
		// var body = {
		// function: 'InsoClaimApi_getListTargetsByClaimType',
		// 	params: {
		// 		claim_type_id: this.props.claim_type_id
		// 	},
		// }	
		// this.props.getListTargetsByClaimType(body)
	};

	componentWillReceiveProps = (nextProps) => {
		
	};

    render() {
        const {data, note, txtVerify} = this.state;
        return (
            <View style={Css.container}>
            {
                this.props.carClaim.loading ?
                <Loading/>
                : null
            }
            <Nav onPress={() => Actions.pop()} title='Hợp đồng điện tử'/>
            <ScrollView>
                <View style={styles.ct}>
                    <Text>THÔNG BÁO TAI NẠN, YÊU CẦU BỒI THƯỜNG VÀ BÃI NẠI</Text>
                    <Text style={styles.note}>{note}</Text>

                    <View style={styles.ctItem}>
                        <Text style={styles.txtTitle}>A. Thông tin khách hàng</Text>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtBold}>Tên chủ xe</Text>
                            <Text style={styles.txtBold}>ddd</Text>
                        </View>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtNormal}>Điện thoại</Text>
                            <Text>ddd</Text>
                        </View>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtNormal}>Địa chỉ</Text>
                            <Text>ddd</Text>
                        </View>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtNormal}>Email</Text>
                            <Text>ddd</Text>
                        </View>
                    </View>

                    <CarInfo/>
                    <AccidentInfo/>
                    <View style={styles.ctItem}>
                        <Text style={styles.txtTitle}>E. Bãi nại</Text>
                        <View style={styles.ctRow}>
                            <Text style={[styles.txtValue, {lineHeight: 20}]}>{txtVerify}</Text>
                        </View>
                    </View>
                    <Text style={[styles.txtTitle, {textAlign: 'right', marginTop: 7}]}>Ngày tháng năm</Text>

                    
                </View>
            </ScrollView>
            <FooterButton>
                <Button
                    label={'XÁC NHẬN'}
                    width={(screen.width-40)}
                    marginTop={0}
                    onPress={() => this.send()}
                />
            </FooterButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginTop: 8
    },
    ct: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    note:  {
        color: '#333',
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 22
    },
})

import {connect} from 'react-redux';
import {getListTargetsByClaimType, addClaim} from '../../car/actions/claim';
import { screen, Color } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import AccidentInfo from '../../car/components/claim/AccidentInfo';
import CarInfo from '../../car/components/claim/CarInfo';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
	getListTargetsByClaimType: (body) => dispatch(getListTargetsByClaimType(body)),
	addClaim: (body) => dispatch(addClaim(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractClaim);
