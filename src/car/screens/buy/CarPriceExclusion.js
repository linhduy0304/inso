import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import LoadingSmall from '../../../components/LoadingSmall';
import FooterButton from '../../../components/FooterButton';
import Button from '../../../components/Button';
import ButtonNoColor from '../../../components/ButtonNoColor';
import Css from '../../../config/Css';
import Nav from '../../../components/Nav';
import ItemExclusion from '../../components/buy/ItemExclusion';

class CarPriceExclusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  submit = () => {
    var body = {
      function: 'InsoContractApi_confirmProfileDataInsuranceAmount',
      params: {
        contract_id: this.props.contract_id,
      },
    }
    this.props.confirmPriceExclusion(body)
  }

  render() {
    const {data} = this.state;
    return (
      <View style={Css.container}>
      <Nav
        title='Thông báo'
      />
      {
        this.props.carBuy.loading ?
          <LoadingSmall/>
        : null
      }
      <View style={{flex: 1, alignItems: 'center', paddingTop: 40}}>
        <Text style={{color: '#333',fontSize: 16, textAlign: 'center', margin: 20}}>Sau khi xem xét, chúng tôi đã đề xuất giá trị xe mới là <Text style={{color: Color, fontWeight: 'bold'}}>{renderVND(parseInt(this.props.insurance_amount))}đ</Text> và phí bảo hiểm phải trả là <Text style={{color: Color, fontWeight: 'bold'}}>{renderVND(this.props.payment_amount)}đ</Text></Text>
        <Button
          label='ĐỒNG Ý'
          marginTop={10}
          onPress={() => this.submit()}
        />
        <ButtonNoColor
          label='TỪ CHỐI'
          marginTop={10}
          onPress={() => Actions.tab({type: 'reset'})}
        />
       
      </View>
    </View>
    );
  }
}

import {connect} from 'react-redux';
import {confirmPriceExclusion} from '../../actions/buy';
import { Actions } from 'react-native-router-flux';
import { renderVND } from '../../../components/Functions';
import { Color } from '../../../config/System';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    confirmPriceExclusion: (body) => dispatch(confirmPriceExclusion(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarPriceExclusion);
