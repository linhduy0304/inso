
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';
import Communications from 'react-native-communications';

class CarClaimRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
    };
  }

	componentWillMount = () => {
		var body = {
		function: 'InsoClaimApi_getClaimRequirement',
		params: {
			claim_id: this.props.claim_id
		},
		}
		this.props.getClaimRequirement(body)
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.carClaim.requirements && this.props.carClaim.requirements != nextProps.carClaim.requirements) {
			this.setState({
			  data: nextProps.carClaim.requirements
			})
		}
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
		<Nav onPress={() => Actions.pop()} title='Hoàn thiện thủ tục bồi thường'/>
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
            renderItem={data => <ItemRequirement data = {data.item}/>}
        />
		<FooterButton>
			<Button
				label={'GỬI NGAY'}
				width={(screen.width-40)}
				marginTop={0}
				onPress={() => this.save()}
			/>
		</FooterButton>
		</View>
    );
  }
}

import {connect} from 'react-redux';
import {getClaimRequirement} from '../../actions/claim';
import { screen } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ItemRequirement from '../../components/claim/ItemRequirement';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getClaimRequirement: (body) => dispatch(getClaimRequirement(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimRequirement);
