import React, { Component } from 'react';
import {
  View,
  FlatList,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Css from '../../../config/Css';
import Nav from '../../../components/Nav';
import LoadingSmall from '../../../components/LoadingSmall';

class CarClaimList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoClaimApi_getListClaimType',
      params: {
      },
    }
    this.props.getListClaimType(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carClaim.listType) {
      this.setState({
        data: nextProps.carClaim.listType
      })
    }
  };

  renderHeader = () => {
    if(this.state.data.length == 0) {
      return (
        <View style={{alignItems: 'center', width: screen.width-40}}>
          <Text>Bạn chưa có hồ sơ bồi thường nào</Text>
        </View>
      )
    }else return null
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    var body = {
      function: 'InsoClaimApi_getListClaimType',
      params: {
      },
    }
    this.props.getListClaimType(body)
    this.setState({
      refreshing: false,
    })
  }

  render() {
    const {data} = this.state
    return (
      <View style={Css.container}>
        <Nav onPress={() => Actions.pop()} title='Bồi thường bảo hiểm'/>
        {
          this.props.carClaim.loading ?
            <LoadingSmall/>
          : null
        }
        <View style={{flex: 1}}>
          <FlatList
            data = {data}
            contentContainerStyle={{padding: 20,}}
            removeClippedSubviews
            // refreshControl={
            //   <RefreshControl
            //       refreshing={refreshing}
            //       onRefresh={() => this._onRefresh()}
            //   />
            // }
            keyExtractor={(item, index) => index.toString()}
            renderItem={data => <ItemType data = {data.item}/>}
          />
        </View>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {getListClaimType} from '../../actions/claim';
import { screen } from '../../../config/System';
import ItemType from '../../components/claim/ItemType';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListClaimType: (body) => dispatch(getListClaimType(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimList);
