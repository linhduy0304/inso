

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import ModalNoti from '../../../components/ModalNoti'

class CarRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      open: false,
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoContractApi_getFormRequirement',
      params: {
        contract_id: this.props.contract_id, //this.props.contract_id
      },
    }
    this.props.getRequirement(body)
  };
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.requirements) {
      this.setState({
        data: nextProps.carBuy.requirements
      })
    }
    if(nextProps.carBuy.showContractSuccess) {
      this.setState({
        open: true
      })
    }
  };

  save() {
    var a = this.renderLabel();
    if(a == 'save') {
      Alert.alert(
        'Thông báo!',
        `Lưu hồ sơ thành công`,
        [
          {text: 'Ok', },
        ],
      )
      Actions.tab({type: 'reset'})
      return
    }
    var body = {
      function: 'InsoContractApi_updateStatusProfileRequest',
      params: {
        contract_id: this.props.contract_id
      },
    }
    this.props.saveContract(body, a)
  }

  renderLabel = () => {
    for(let i of this.props.carBuy.requirements) {
      if(!i.validate) {
        return 'save'
      }
    }
    return 'send'
  }

  close = () => {
    this.setState({open: false})
    this.props.closeContractSuccess()
    Actions.tab({type: 'reset'})
  }

  render() {
    const {data, open} = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav title='Hoàn thiện hồ sơ xe'/>
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={{padding: 20}}>
            {
              data ?
                data.map((item, index)=> {
                return <ItemRequirement contract_id={this.props.contract_id} data={item} key={index}/>
                })
              : null
            }
          </View>
        </ScrollView>
        <FooterButton>
          {/* <ButtonNotColor
            label='LƯU HỒ SƠ'
            width={(screen.width-55)/2}
            color='#fff'
            backgroundColor='#ccc'
            marginTop={0}
          /> */}
          {
            this.props.carBuy.requirements ? 
              <Button
                label={this.renderLabel() == 'save' ? 'LƯU HỒ SƠ' : 'GỬI DUYỆT'}
                width={(screen.width-40)}
                marginTop={0}
                onPress={() => this.save()}
              />
            : null
          }
        </FooterButton>
        <ModalNoti
          open={open}
          onPress={() => this.setState({open: false})}
          text = 'Gửi hồ sơ thành công. Hồ sơ của bạn sẽ được duyệt trong 5 phút'
          onClosed={() => this.close()}
        />
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {getRequirement, saveContract, closeContractSuccess} from '../../actions/buy';
import ItemRequirement from '../../components/requirement/ItemRequirement';
import Nav from '../../../components/Nav';
import FooterButton from '../../../components/FooterButton';
import { screen, TxtBlack } from '../../../config/System';
import Loading from '../../../components/Loading';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeContractSuccess: () => dispatch(closeContractSuccess()),
    getRequirement: (body) => dispatch(getRequirement(body)),
    saveContract: (body, action) => dispatch(saveContract(body, action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarRequirement);
