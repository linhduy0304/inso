
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
        data: {
            customer: '',
            damage_info: '',
            target: '',
            driver: '',
            
        },
            note: 'Lưu ý quan trọng: Nguời kê khai phải đọc kỹ và hiểu rõ những yêu cầu trước khi kê khai. Doanh nghiệp bảo hiểm có thể từ chối hoặc giảm số tiền bồi thường nếu nhận được nội dung kê khai thiếu trung thực.',
            txtVerify: 'Tôi xác nhận đã được PTI giải quyết bồi thường qua ứng dụng INSO và không có bất cứ khiếu nại nào về việc giải quyết bồi thường của PTI'
        };
    }

	componentWillMount = () => {
		var body = {
		function: 'InsoClaimApi_getClaimInfo',
			params: {
				claim_id: this.props.claim_id
			},
		}	
		this.props.getClaimInfo(body)
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.carClaim.contractInfo) {
            this.setState({
                data: nextProps.carClaim.contractInfo
            })
        }
	};

    render() {
        const {note, txtVerify, data} = this.state;
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
                            <Text style={styles.txtBold}>{data.customer.fullname}</Text>
                        </View>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtNormal}>Điện thoại</Text>
                            <Text>{data.customer.mobile}</Text>
                        </View>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtNormal}>Địa chỉ</Text>
                            <Text>{data.customer.address}</Text>
                        </View>
                        <View style={styles.ctRow}>
                            <Text style={styles.txtNormal}>Email</Text>
                            <Text>{data.customer.email}</Text>
                        </View>
                    </View>

                    <CarInfo data = {data}/>
                    <AccidentInfo data = {data.damage_info}/>
                    <View style={styles.ctItem}>
                        <Text style={styles.txtTitle}>D. Yêu cầu bồi thường và đề xuất khác của chủ xe</Text>
                        <View style={styles.ctRow}>
                            <Text style={{color: '#999', marginRight: 15}}>Yêu cầu chủ xe:</Text>
                            <Text style={[styles.txtValue, {lineHeight: 20}]}>{data.claim_description}</Text>
                        </View>
                    </View>
                    <View style={styles.ctItem}>
                        <Text style={styles.txtTitle}>E. Bãi nại</Text>
                        <View style={styles.ctRow}>
                            <Text style={[styles.txtValue, {lineHeight: 20}]}>{data.dismissed_description}</Text>
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
                    onPress={() => Actions.carClaimGara()}
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
import {getClaimInfo} from '../../car/actions/claim';
import { screen, Color } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import AccidentInfo from '../../car/components/claim/AccidentInfo';
import CarInfo from '../../car/components/claim/CarInfo';
import Loading from '../../components/Loading';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
	getClaimInfo: (body) => dispatch(getClaimInfo(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractClaim);
