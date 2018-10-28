
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Css from '../../config/Css';
import Header from '../../components/pay/Header';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { screen } from '../../config/System';
import Shadow from '../../components/Shadow';
import SimpleToast from 'react-native-simple-toast';
import ModalPay from '../../components/pay/ModalPay';

class PayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      data: [],
      open: false
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'CheckoutOrderApi_getMethods',
      params: {
        amount: this.props.payment_amount
      },
    }
    this.props.getPay(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.buy.pays) {
      this.setState({
        data: nextProps.buy.pays
      })
    }
    if(nextProps.buy.webPay) {
      this.setState({
        open: true
      })
    }
  };

  renderImage = (code) => {
    switch(code) {
      case 'ATM-CARD':
        return require('../../icons/ic_pay_3.png');
      case "IB-ONLINE":
        return require('../../icons/ic_pay_3.png');
      case "WALLET":
        return require('../../icons/ic_pay_2.png');
      default:
        return
    }
  }

  next = () => {
    if(!this.state.active) {
      SimpleToast.show('Bạn chưa chọn phương thức thanh toán nào');
      return;
    }
    var body = {
      function: 'CheckoutOrderApi_addForContract',
      params: {
        contract_id: this.props.contract_id,
        method_id: this.state.active
      },
    }
    this.props.submitPay(body)
  }

  close = () => {
    this.setState({open: false})
    this.props.closeWebPay()
    var body = {
      function: 'InsoContractApi_getPaymentstatus',
      params: {
        contract_id: this.props.contract_id
      }
    };
    this.props.getPayStatus(body)
  }

  render() {
    const {active, data, open} = this.state
    return (
      <View style={[Css.container, {backgroundColor: '#f7f7f7',}]}>
        <Header payment_amount={this.props.payment_amount ? this.props.payment_amount : 0}/>
        <ScrollView>
          <View style={styles.ct}>
            <Text style={{color: '#333'}}>Chọn phương thức thanh toán</Text>
            {
              data.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => this.setState({active: item.id})} style={[styles.ctItem, {borderWidth: active == item.id ? 1 : 0,}]}>
                    <Image style={{width: 30, resizeMode: 'contain'}} source={this.renderImage(item.code)}/>
                    <Text style={styles.txt}>{item.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
        <FooterButton>
          <Button
            label='TIẾP THEO'
            marginTop={0}
            onPress={() => this.next()}
          />
        </FooterButton>
        <ModalPay
          open={open}
          onClosed={() => this.close()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    color: '#000',
    fontSize: 16,
    marginLeft: 15,
    flex: 1
  },
  ctItem: {
    width: screen.width-40,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#30cecb',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  ct: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    
  },
})

import {connect} from 'react-redux';
import {getPay, submitPay, closeWebPay, getPayStatus} from '../../actions/buy';

const mapStateToProps = (state) => {
  return {
    buy: state.buy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPay: (body) => dispatch(getPay(body)),
    closeWebPay: () => dispatch(closeWebPay()),
    submitPay: (body) => dispatch(submitPay(body)),
    getPayStatus: (body) => dispatch(getPayStatus(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayList);
