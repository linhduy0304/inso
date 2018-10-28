
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';
import Communications from 'react-native-communications';
import ItemExclusion from '../../components/buy/ItemExclusion';

class CarClaimDamage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [
            {}
        ],
    };
  }

  componentWillMount = () => {
    // Communications.phonecall('0123456789', true)
    // var body = {
    //   function: 'InsoClaimApi_getListTargetsByClaimType',
    //   params: {
    //     claim_type_id: this.props.claim_type_id
    //   },
    // }
    // this.props.getListTargetsByClaimType(body)
  };
  

  render() {
    const {data} = this.state;
    return (
		<View style={Css.container}>
            {
                this.props.carClaim.loading ?
                <Loading/>
                : null
            }
            <Nav onPress={() => Actions.pop()} title='Xác nhận tổn thất'/>
            <ScrollView>
                <View style={{padding: 20}}>
                    <View style={styles.ctImage}>
                        <Image style={{height: 180, width: screen.width-60, borderRadius: 5}} source={{uri: data.image}}/>
                    </View>
                    <Text style={styles.txt}>{'data.description'}</Text>
                </View>
            </ScrollView>
            <FooterButton>
                <View style={{flexDirection: 'row',width: screen.width - 40, justifyContent: 'space-between'}}>
                    <ButtonNoColor
                        label={'GỌI HỖ TRỢ'}
                        width={((screen.width-80)*2/3)}
                        marginTop={0}
                        backgroundColor='#999'
                        color='#fff'
                        fontSize={16}
                        onPress={() => Communications.phonecall('0123456789', true)}
                    />
                    <Button
                        label={'GỬI'}
                        width={(screen.width-40)/3}
                        marginTop={0}
                        onPress={() => this.save()}
                    />
                </View>
            </FooterButton>
		</View>
    );
  }
}

const styles = StyleSheet.create({
    ct: {
      marginTop: 20
    },
    txt: {
      color: '#f97c7c',
      marginTop: 5,
    },
    ctImage: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: 200,
      borderRadius: 7
    },
  })

import {connect} from 'react-redux';
import {getListTargetsByClaimType} from '../../actions/claim';
import { screen } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ItemRequirement from '../../components/claim/ItemRequirement';
import ButtonNoColor from '../../../components/ButtonNoColor';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListTargetsByClaimType: (body) => dispatch(getListTargetsByClaimType(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimDamage);
