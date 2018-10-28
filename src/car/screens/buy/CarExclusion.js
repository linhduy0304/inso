import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import LoadingSmall from '../../../components/LoadingSmall';
import FooterButton from '../../../components/FooterButton';
import Button from '../../../components/Button';
import Css from '../../../config/Css';
import Nav from '../../../components/Nav';
import ItemExclusion from '../../components/buy/ItemExclusion';

class CarExclusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoContractApi_getListExclusion',
      params: {
        contract_id: this.props.contract_id,
      },
    }
    this.props.getExclusion(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.exclusions) {
      this.setState({
        data: nextProps.carBuy.exclusions
      })
    }
  };

  next = () => {
    var body = {
      function: 'InsoContractApi_confirmProfileDataExclusion',
      params: {
        contract_id: this.props.contract_id,
      },
    }
    this.props.confirmExclusion(body)
  }

  render() {
    const {data} = this.state;
    return (
      <View style={Css.container}>
      <Nav
        title='Xác nhận các điểm loại trừ'
      />
      {
        this.props.carBuy.loading ?
          <LoadingSmall/>
        : null
      }
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          contentContainerStyle={{padding: 20, paddingTop: 0}}
          removeClippedSubviews
          keyExtractor={(item, index) => index.toString()}
          renderItem = {data => <ItemExclusion data = {data.item}/>}
        />
        <FooterButton>
          <Button
            label='XÁC NHẬN'
            marginTop={0}
            onPress={() => this.next()}
          />
        </FooterButton>
      </View>
    </View>
    );
  }
}

import {connect} from 'react-redux';
import { getExclusion, confirmExclusion} from '../../actions/buy';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getExclusion: (body) => dispatch(getExclusion(body)),
    confirmExclusion: (body) => dispatch(confirmExclusion(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarExclusion);
