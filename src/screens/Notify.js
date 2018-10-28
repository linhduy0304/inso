

import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native';
import Item from '../components/notify/Item';

const Css = require('../config/Css');

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'NotifyApi_getListNotify',
      params: {},
    }
    this.props.loadNoti(body)
  };
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.notify.notify) {
      this.setState({
        data: nextProps.notify.notify
      })
    }
  };
  
  renderHeader = () => {
    if(this.state.data.length == 0) {
      return <View>
        <Text>Bạn chưa có thông báo nào</Text>
      </View>
    }else return null
  }

  render() {
    const {data} = this.state;
    return (
      <View style={[Css.container]}>
        <Nav title='Thông báo'/>
        <View style={{alignItems: 'center'}}>
          <FlatList 
            data={data}
            ListHeaderComponent={() => this.renderHeader()}
            renderItem={data => <Item data={data.item}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})

import {connect} from 'react-redux';
import {loadNoti} from '../actions/notify';
import Nav from '../components/Nav';

const mapStateToProps = (state) => {
  return {
    notify: state.notify
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadNoti: (body) => dispatch(loadNoti(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
