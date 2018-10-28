
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Nav from '../../components/Nav';
import InfoBuyer from '../../components/contract/InfoBuyer';
import Css from '../../config/Css';
import InfoCar from '../../components/contract/InfoCar';
import InfoPackage from '../../components/contract/InfoPackage';
import InfoReject from '../../components/contract/InfoReject';
import Shadow from '../../components/Shadow';
import { screen } from '../../config/System';
import Button from '../../components/Button';
import ButtonNoColor from '../../components/ButtonNoColor';
import LoadingSmall from '../../components/LoadingSmall';

class ContractInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'Dưới đây là các thông tin bảo hiểm bạn đã đăng ký và sẽ là căn cứ để bồi thường bảo hiểm cho bạn. Hãy vui lòng đọc kỹ và xác nhận lại',
      check: true,
      check1: true,
      data: {}
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoContractApi_getInfo',
      params: {
        contract_id: this.props.contract_id
      },
    }
    this.props.contractInfo(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.buy.contractInfo) {
      this.setState({
        data: nextProps.buy.contractInfo
      })
    }
  };

  render() {
    const {intro, check, check1, data} = this.state;
    console.log(data)
    return (
      <View style={Css.container}>
        <Nav title='Thông tin đăng ký bảo hiểm xe'/>
        {
          this.props.buy.loading ?
            <LoadingSmall/>
            : null
        }
        <ScrollView>
          <Text style={styles.intro}>{intro}</Text>
          <InfoBuyer data={data.customer ? data.customer : ''}/>
          <InfoCar data={data.target ? data.target : ''}/>
          <InfoPackage
            total_fee={data.total_fee ? data.total_fee : 0}
            discount_amount={data.discount_amount ? data.discount_amount : 0}
            data={data.products ? data.products : []}
          />
          {
            data.exclusions ?
              data.exclusions.length == 0 ?
              null
              :
              <InfoReject
                data = {data.exclusions}
              />
            : null
          }
        </ScrollView>
        
        <View>
          {/* <Shadow
            height={2}
            width={screen.width}
            x={0}
            y={-1}
          /> */}
          {
            this.props.load == 'CONTRACT_DETAIL' ?
            null
            :
            <View style={styles.ctBottom}>
              <View style={{flexDirection: 'row', alignItems: 'center',}}>
                {
                  check ? 
                    <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>
                      <Image style={styles.icon} source={require('../../icons/ic_check.png')}/>
                    </TouchableOpacity>
                  : 
                    <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={styles.ctCheck}>
                    </TouchableOpacity>
                }
                <Text style={styles.txt}>Tôi xác nhận các thông tin trên là đúng</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                {
                  check1 ? 
                    <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={[styles.ctCheck, {backgroundColor: '#30cecb', borderWidth: 0}]}>
                      <Image style={styles.icon} source={require('../../icons/ic_check.png')}/>
                    </TouchableOpacity>
                  : 
                    <TouchableOpacity onPress={() => this.setState({check1: this.state.check1 ? null : true})} style={styles.ctCheck}>
                    </TouchableOpacity>
                }
                <Text style={styles.txt}>Tôi xác nhận đã đọc, hiểu và đồng ý với các <Text style={styles.txtActive}>Điểm loại trừ </Text>và <Text style={styles.txtActive}>Quy tắc bảo hiểm</Text></Text>
              </View>
              {
                !check || !check1 ?
                <ButtonNoColor
                  label='THANH TOÁN'
                  marginTop = {10}
                  backgroundColor={'#ccc'}
                  color='#fff'
                  disabled = {true}
                />
                :
                <Button
                  label='THANH TOÁN'
                  marginTop = {10}
                  onPress={() => Actions.payList({payment_amount: this.props.payment_amount, contract_id: this.props.contract_id})}
                />
              }
            </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtActive: {
    color: '#30cecb',
    fontWeight: 'bold',
  },
  txt: {
    color: '#333',
    flex: 1
  },
  icon: {
    width: 15,
    height: 15*22/27
  },
  ctBottom: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  ctCheck: {
    height: 20,
    width: 20,
    marginRight: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    color: '#333',
    margin: 20,
    marginTop: 10,
    marginBottom: 10
  },
})

import {connect} from 'react-redux';
import {contractInfo} from '../../actions/buy';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    buy: state.buy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    contractInfo: (body) => dispatch(contractInfo(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContractInfo);
