import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import Css from '../../../config/Css'
import Nav from '../../../components/Nav';
import Button from '../../../components/Button';
import Modal from 'react-native-modalbox';

class CarPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      price: this.props.carBuy.carPrice.toString(),
      price_suggest: '',
      profile_id: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    // if(nextProps.carBuy.carPrice) {
    //   this.setState({price: nextProps.carBuy.carPrice.toString()})
    // }
    if(nextProps.carBuy.showModalCheckPrice) {
      this.setState({open: true})
    }
    if(nextProps.carBuy.profile_id) {
      this.setState({profile_id: nextProps.carBuy.profile_id})
    }
  };

  onChange = text => {
    var b = text.replace(/\./g,'')
    var a = Number(b);
    // if(isNaN(a) || !isFinite(a)) {
    if(!isFinite(a)) {
      return
    }
    this.setState({price_suggest: a})
  }

  checkPrice = () => {
    Keyboard.dismiss()
    const {data} = this.props;
    if(this.state.price_suggest == '') {
      this.setState({price_suggest: this.props.carBuy.carPrice.toString()})
      var body = {
        function: 'InsoSupplierApi_checkInsuranceAmountCar',
        params: {
          "vehicle_model_id": data.vehicle_model_id,
          "manufacture_year": data.manufacture_year,
          "number_seats": data.number_seats,
          "amount": this.props.carBuy.carPrice.toString(),
          profile_id: this.props.carBuy.profile_id
        },
      }
      this.props.checkPrice(body);
      return;
    }
    var body = {
      function: 'InsoSupplierApi_checkInsuranceAmountCar',
      params: {
        "vehicle_model_id": data.vehicle_model_id,
        "manufacture_year": data.manufacture_year,
        "number_seats": data.number_seats,
        "amount": this.state.price_suggest,
        profile_id: this.props.carBuy.profile_id
      },
    }
    this.props.checkPrice(body)
  }

  back = () => {
    if(this.props.back == 'again') {
      this.props.setProfileId(null)
      Actions.tab({type: 'reset'})
    }else {
      Actions.pop()
    }
  }

  render() {
    const {price, price_suggest, open} = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav onPress={() => this.back()} title='Mua bảo hiểm cho ô tô'/>
          <ScrollView>
            <View style={{flex: 1, padding: 20,paddingTop: 0}}>
              <InfoCar data={this.props.car}/>
              <InputPrice 
                editable={false}
                value={renderVND(price)}
                label='Giá trị xe tạm tính'
                onChange={text => this.setState({price: text})}
                marginTop = {40}
              />
              <InputPrice 
                value={renderVND(price_suggest)}
                label='Giá trị xe khách hàng đề nghị'
                onChange={text => this.onChange(text)}
                marginTop = {10}
              />
              
            </View>
          </ScrollView>
          <View style={{alignItems: 'center',paddingTop:10, paddingBottom: 10}}>
            <Button
              label='XEM PHÍ'
              onPress={() => this.checkPrice()}
            />
          </View>
          <Modal
            isOpen={open}
            entry={'top'}
            onClosed={() => this.setState({open: false})}
            style={{backgroundColor: 'ababab', width: screen.width-80, justifyContent: 'center' }}
          >
          <View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingBottom: 20}}>
            <Image style={{height: 200, width: 200}} source={require('../../../icons/ic_modal.png')} />
            <Text style={{color: TxtBlack, fontSize: 16}}>Thông báo</Text>
            <Text style={{textAlign: 'center',lineHeight: 20, marginLeft: 30, marginRight: 30, color: '#333', marginTop:5}}>Sau khi tính toán, giá trị chúng tôi đưa ra cho xe của bạn là</Text>
            <Text style={{color: '#30cecb', fontWeight: 'bold'}}>{renderVND(parseInt(this.props.carBuy.priceSuggest))} đ</Text>
            <Button 
              label='ĐỒNG Ý'
              width={screen.width/2}
              marginTop={20}
              borderRadius={20}
              onPress = {() => {
                var data = {
                  vehicle_model_id: this.props.data.vehicle_model_id,
                  manufacture_year: this.props.data.manufacture_year,
                  number_seats: this.props.data.number_seats,
                  insurance_amount: this.props.carBuy.priceSuggest,
                }
                this.props.showModalCheckPrice(null)
                Actions.carPackage({data})
                this.setState({open: false, price_suggest: this.props.carBuy.priceSuggest.toString()})
              }}
            />
            <ButtonNotColor
              label='KHÔNG ĐỒNG Ý'
              backgroundColor={'#ccc'}
              width={screen.width/2}
              borderRadius={20}
              color='#fff'
              onPress = {() => Actions.tab({type: 'reset'})}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {carGetPrice, checkPrice, setProfileId, showModalCheckPrice} from '../../actions/buy';
import { screen, TxtBlack } from '../../../config/System';
import InfoCar from '../../components/buy/InfoCar';
import InputPrice from '../../components/buy/InputPrice';
import { renderVND } from '../../../components/Functions';
import ButtonNotColor from '../../../components/ButtonNoColor';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import Loading from '../../../components/Loading';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showModalCheckPrice: (data) => dispatch(showModalCheckPrice(data)),
    setProfileId: (data) => dispatch(setProfileId(data)),
    carGetPrice: (body) => dispatch(carGetPrice(body)),
    checkPrice: (body) => dispatch(checkPrice(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarPrice);
