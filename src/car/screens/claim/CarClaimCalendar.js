
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';
import Communications from 'react-native-communications';
import { Calendar, CalendarList, Agenda } from '../../../config/react-native-calendars';
import DatePicker from 'react-native-datepicker'

class CarClaimCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            markedDates: {},
            time: '07:00'
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
        const date = new Date();
        a = `${date.getFullYear()}-${(date.getMonth()+1)<10 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1)}-${date.getDate()}`
        this.setState({date: a})
    };

    getNow() {
        const date = new Date();
        a = `${date.getFullYear()}-${(date.getMonth()+1)<10 ? '0'+(date.getMonth()+1).toString() : (date.getMonth()+1)}-${date.getDate()}`
        return a
    }

    onDayPress = (date) => {
        const a ={};
        a[date] = {selected: true, selectedColor: Color}
        this.setState({
        markedDates: a,
        date
        })
    }

    save = () => {
        const {date, time} = this.state;
        var body = {
            function: 'InsoClaimApi_updateGarageLinked',
            params: {
                claim_id: 4,
                garage_id: 4,
                date_repair: convertDate(date),
                time_repair: time,
            },
        }
        this.props.updateGarageLinked(body)
    }
  

  render() {
      console.log(this.state)
    const {time} = this.state;
    return (
		<View style={Css.container}>
            {
                this.props.carClaim.loading ?
                <Loading/>
                : null
            }
            <Nav onPress={() => Actions.pop()} title='Chọn ngày và thời gian'/>
            <ScrollView>
                <View style={{padding: 20}}>
                    <Calendar
                        style={{
                        height: 350
                        }}
                        markedDates={this.state.markedDates}
                        theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        todayTextColor: Color,
                        dayTextColor: TxtBlack,
                        textDisabledColor: '#b0b0b0',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#fff',
                        monthTextColor: Color,
                        textMonthFontWeight: 'bold',
                        textDayFontSize: 14,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                        }}
                        current={this.getNow()}
                        minDate={this.getNow()}
                        maxDate={'2100-08-30'}
                        onDayPress={(day) => this.onDayPress(day.dateString)}
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        monthFormat={'MM /yyyy'}
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                    />
                    <Text style={{color: TxtGrey, fontSize: 12, marginTop: 15, }}>Chọn thời gian mang xe đến</Text>
                    <View style={{borderBottomWidth: 1,borderBottomColor:'#d5d5d5'}}>
                    <DatePicker
                        style={{width: screen.width-40,}}
                        date={time}
                        mode="time"
                        placeholder="select date"
                        format="hh:mm A"
                        showIcon={false}
                        minDate="2016-05-01"
                        maxDate="2100-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={
                        {
                            dateInput: {
                            borderWidth: 0,
                            // padding: 0,
                            alignItems: 'flex-start',
                            // flex: 1,
                            },
                            placeholderText:{color:'#c2c5d0',fontSize: 15}
                        }}
                        onDateChange={(date) => {this.setState({time: date})}}
                    />
                    </View>
                </View>
            </ScrollView>
            <FooterButton>
                <Button
                    label={'XÁC NHẬN'}
                    width={(screen.width-40)}
                    marginTop={0}
                    onPress={() => this.save()}
                />
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
import {updateGarageLinked} from '../../actions/claim';
import { screen, Color, TxtBlack, TxtGrey } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import { convertDate } from '../../../components/Functions';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateGarageLinked: (body) => dispatch(updateGarageLinked(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimCalendar);
