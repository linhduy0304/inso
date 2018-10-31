
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';

class CarClaimPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  data: [],
	  show: false,
	  car: {},
    };
  }

	componentWillMount = () => {
		var body = {
		function: 'InsoClaimApi_getListTargetsByClaimType',
			params: {
				claim_type_id: this.props.claim_type_id
			},
		}	
		this.props.getListTargetsByClaimType(body)
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.carClaim.targets && this.props.carClaim.targets != nextProps.carClaim.targets) {
			this.setState({
				data: nextProps.carClaim.targets
			})
		}
	};

	onPress = (data) => {
		this.setState({
			car: data,
			show: false
		})
	}

	send = () => {
		var body = {
			function: 'InsoClaimApi_addClaim',
			params: {
				claim_type_id: this.props.claim_type_id,
				contract_id: this.state.car.contract_id,
			},
		}
		this.props.addClaim(body)
	}

  render() {
    const {data, show, car} = this.state;
    return (
		<View style={Css.container}>
		{
			this.props.carClaim.loading ?
			<Loading/>
			: null
		}
		<Nav onPress={() => Actions.pop()} title='Chọn ô tô bồi thường'/>
		<ScrollView>
			<View style={{flex: 1, padding: 20,paddingTop: 0}}>
				{
					data.length == 0 ?
					<View style={{alignItems: 'center'}}>
						<Text>Bạn không có ô tô nào đăng ký bảo hiẻm</Text>
					</View>
					: null
				}
				<TouchableOpacity onPress={() => this.setState({show: !this.state.show})} style={styles.ctPick}>
					<Text>{car.name ? car.name : 'Chọn ô tô đã đăng ký bảo hiểm'}</Text>
					<Image style={{ width: 10, height: 10*9/17}} source={require('../../../icons/ic_down.png')}/>
				</TouchableOpacity>
				{
					show ? 
						data.map((item, index) => {
							return (
								<TouchableOpacity onPress={() => this.onPress(item)} key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 15, alignItems: 'center', borderBottomColor: '#dedede' }}>
									<Image source={require('../../../icons/ic_oto_4.png')}/>
									<Text style={{ color: '#333', flex: 1, marginLeft: 15}}>{item.name}</Text>
								</TouchableOpacity>
							)
						})
					: null
				}
			</View>
		</ScrollView>
		<FooterButton>
			<Button
				label={'YÊU CẦU BỒI THƯỜNG'}
				width={(screen.width-40)}
				marginTop={0}
				onPress={() => this.send()}
			/>
		</FooterButton>
		</View>
    );
  }
}

const styles = StyleSheet.create({
	ctPick: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: Color,
		borderBottomWidth: 1,
		height: 45
	},

})

import {connect} from 'react-redux';
import {getListTargetsByClaimType, addClaim} from '../../actions/claim';
import { screen, Color } from '../../../config/System';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
	getListTargetsByClaimType: (body) => dispatch(getListTargetsByClaimType(body)),
	addClaim: (body) => dispatch(addClaim(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimPick);
