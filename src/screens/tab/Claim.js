import React, { Component } from 'react';
import {
  View,
  FlatList,
  RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Css from '../../config/Css';
import Nav from '../../components/Nav';
import ItemClaim from '../../components/claim/ItemClaim';
import LoadingSmall from '../../components/LoadingSmall';

class Claim extends Component {
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
    this.props.loadClaim(body)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.claim.claim) {
      this.setState({
        data: nextProps.claim.claim
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
      function: 'InsoContractApi_getListContract',
      params: {
      },
    }
    this.props.loadClaim(body)
    this.setState({
      refreshing: false,
    })
  }

  render() {
    const {data} = this.state
    return (
      <View style={Css.container}>
        <Nav title='Bồi thường bảo hiểm' show={false}/>
        {
          this.props.claim.loading ?
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
            renderItem={data => <ItemClaim data = {data.item}/>}
          />
        </View>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {loadClaim} from '../../actions/claim';
import { screen } from '../../config/System';

const mapStateToProps = (state) => {
  return {
    claim: state.claim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadClaim: (body) => dispatch(loadClaim(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
