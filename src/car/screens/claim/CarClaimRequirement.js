
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
        open: false,
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
        if(nextProps.carClaim.modalRequirement) {
            this.setState({
              open: true
            })
        }
    };

    close = () => {
        this.setState({open: false})
        this.props.modalClaimRequirement(null)
        Actions.tab({type: 'reset'})
      }
    
    save = () => {
        var body = {
            function: 'InsoClaimApi_checkClaimRequirement',
            params: {
                claim_id: this.props.claim_id
            },
            }
            this.props.checkClaimRequirement(body)
        // var body = {
        //     function: 'InsoClaimApi_updateStatusClaimProfileRequest',
        //     params: {
        //         claim_id: this.props.claim_id
        //     },
        //     }
        //     this.props.updateStatusClaimProfileRequest(body)
    }
  

    render() {
        console.log(this.props.carClaim.profile)
        const {data, open} = this.state;
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
                renderItem={data => <ItemRequirement claim_id={this.props.claim_id} data = {data.item}/>}
            />
            <FooterButton>
                <Button
                    label={'GỬI NGAY'}
                    width={(screen.width-40)}
                    marginTop={0}
                    onPress={this.save}
                />
            </FooterButton>
            <ModalNoti
                open={open}
                onPress={() => this.setState({open: false})}
                text = 'Gửi hồ sơ bồi thường thành công. Hồ sơ của bạn sẽ được duyệt trong 5 phút'
                onClosed={() => this.close()}
            />
            </View>
        );
    }
}

import {connect} from 'react-redux';
import {
    getClaimRequirement,
    updateStatusClaimProfileRequest,
    modalClaimRequirement,
    checkClaimRequirement
} from '../../actions/claim';
import { screen } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ItemRequirement from '../../components/claim/ItemRequirement';
import ModalNoti from '../../../components/ModalNoti';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getClaimRequirement: (body) => dispatch(getClaimRequirement(body)),
    updateStatusClaimProfileRequest: (body) => dispatch(updateStatusClaimProfileRequest(body)),
    modalClaimRequirement: (body) => dispatch(modalClaimRequirement(body)),
    checkClaimRequirement: (body) => dispatch(checkClaimRequirement(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimRequirement);
