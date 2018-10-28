
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { screen } from '../../../config/System';

const FormCamera = ({
    params,
}) => (
    <TouchableOpacity style={css.ct}>
        <Image source={require('../../../icons/ic_camera.png')}/>
        <Image style={[css.icon, {top:10, right: 10}]} source={require('../../../icons/ic_top_right.png')}/>
        <Image style={[css.icon, {top:10, left: 10}]} source={require('../../../icons/ic_top_left.png')}/>
        <Image style={[css.icon, {bottom:10, right: 10}]} source={require('../../../icons/ic_bot_right.png')}/>
        <Image style={[css.icon, {bottom:10, left: 10}]} source={require('../../../icons/ic_bot_left.png')}/>
    </TouchableOpacity>
);

const css = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        position: 'absolute'
    },
    ct: {
        width: screen.width-40,
        height: (screen.width-40)*3/4,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default FormCamera;
