import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import ItemBuy from '../../components/buy/ItemBuy';
import LoadingSmall from '../../components/LoadingSmall';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoContractApi_getListContract',
      params: {
      },
    }
    this.props.loadBuy(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.buy.buy) {
      this.setState({
        data: nextProps.buy.buy
      })
    }
  };

  renderHeader = () => {
    if(this.state.data.length == 0) {
      return (
        <View style={{alignItems: 'center', width: screen.width-40}}>
          <Text>Bạn chưa có hồ sơ mua nào</Text>
        </View>
      )
    }else return null
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    var body = {
      function: 'InsoContractApi_getListContract',
      params: {
      },
    }
    this.props.loadBuy(body)
    this.setState({
      refreshing: false,
    })
  }

  render() {
    console.log(this.state.data)
    const {data, refreshing} = this.state
    return (
      <View style={Css.container}>
        <Nav title='Mua bảo hiểm' show={false}/>
        {
          this.props.buy.loading ?
            <LoadingSmall/>
          : null
        }
        <View style={{flex: 1}}>
          <FlatList
            data = {data}
            ListHeaderComponent={() => this.renderHeader()}
            contentContainerStyle={{padding: 20,}}
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => this._onRefresh()}
              />
            }
            removeClippedSubviews
            keyExtractor={(item, index) => index.toString()}
            renderItem={data => <ItemBuy data = {data.item}/>}
          />
        </View>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {loadBuy} from '../../actions/buy';
import { screen } from '../../config/System';

const mapStateToProps = (state) => {
  return {
    buy: state.buy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadBuy: (body) => dispatch(loadBuy(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Buy);
