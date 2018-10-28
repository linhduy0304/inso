

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput
} from 'react-native';
import Nav from '../../../components/Nav';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import {renderVND} from '../../../components/Functions';

class CarPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      product_targets: [],
      total:[],
      price: 0,
      sale: 0,
      open: null,
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoPackageApi_getPackageForCar',
      params: this.props.data
    }
    this.props.getPackage(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.package) {
      this.setState({
        data: nextProps.carBuy.package
      })
    }
    if(nextProps.carBuy.total) {
      this.setState({
        price: nextProps.carBuy.total
      })
    }
    if(nextProps.carBuy.showPackageNull) {
      this.setState({
        open: true
      })
    }
  };

  buy = () => {
    var body = {
      function: 'InsoContractApi_addForCar',
      params: {
        package_id: this.props.carBuy.package.id,
        product_targets: this.state.product_targets,
        vehicle_model_id: this.props.data.vehicle_model_id,
        manufacture_year:this.props.data.manufacture_year,
        number_seats: this.props.data.number_seats,
        insurance_amount: this.props.data.insurance_amount,
        gift_code: '',
        profile_id: this.props.data.profile_id,
      }
    }
    this.props.addContract(body)
  }

  setArrId = (data, price) => {
    var total = this.state.total;
    total.unshift(price);
    this.setState({total})
    var product_targets = this.state.product_targets;
    product_targets.unshift(data)
  }

  close = () => {
    this.setState({open: null})
    this.props.closePackageNull()
    Actions.carProducer({type: 'reset', back: 'again'})
  }

  render() {
    const {data, open} = this.state
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav title='Các quyền lợi khi mua'/>
        {
          data ? 
            <View style={{flex: 1}}>
          
            <ScrollView>
              <View style={{padding: 20, paddingTop: 0}}>
                {
                  data.products ?
                  data.products.map((item, index) => {
                    return <ItemBenefit
                            key={index}
                            data={item}
                            index={index}
                            setArrId={(data) => this.setArrId(data)}
                          />
                  })
                  : null
                }
              </View>
              <View style={{paddingLeft: 20, paddingRight: 20,padding: 5,backgroundColor: '#ececec',}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#333', fontSize: 13, flex: 1}}>Số tiền tạm tính</Text>
                  <Text style={{color: '#333', fontSize: 13}}>{renderVND(this.state.price)} đ</Text>
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 7, alignItems: 'center',}}>
                  <View style={{height: 40,width: 150, backgroundColor: '#fff', borderRadius: 5,}}>
                    <TextInput
                      placeholder='Mã khuyến mãi'
                      keyboardType='numeric'
                      placeholderTextColor='#999'
                      style={{padding: 0,flex: 1, textAlign: 'center'}}
                    />
                  </View>
                  <Text style={{color: '#000'}}>0 đ</Text>
                </View>
                
                <View style={{flexDirection: 'row',marginTop: 7}}>
                  <Text style={{color: '#000', flex: 1}}>Số tiền thanh toán</Text>
                  <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>{renderVND(this.state.price - this.state.sale)} đ</Text>
                </View>
              </View>
              

            </ScrollView>
            <FooterButton>
              <Button
                label='Mua ngay'
                marginTop={0}
                onPress={() => this.buy()}
              />
            </FooterButton>
          </View>
          : null
        }
        <ModalNoti
          open={open}
          onPress={() => this.setState({open: null})}
          text = 'Chúng tôi không tìm thấy gói bảo hiểm nào phù hợp với thông tin xe bạn cung cấp.'
          onClosed={() => this.close()}
        />
      </View>
    );
  }
}

import {connect} from 'react-redux';
import { getPackage, addContract, closePackageNull} from '../../actions/buy';
import ItemBenefit from '../../components/buy/ItemBenefit';
import FooterButton from '../../../components/FooterButton';
import Loading from '../../../components/Loading';
import ModalNoti from '../../../components/ModalNoti';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closePackageNull: () => dispatch(closePackageNull()),
    getPackage: (body) => dispatch(getPackage(body)),
    addContract: (body) => dispatch(addContract(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarPackage);
