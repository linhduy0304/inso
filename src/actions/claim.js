

import {
  CLAIM_REQUEST,
  CLAIM_SUCCESS,
  CLAIM_FAIL,
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

let HTTP = require('../services/HTTP');

//get list compensation
export const request = () => {
    return {
        type: CLAIM_REQUEST,
    }
}
export const loadClaimSuccess = (data) => {
    return {
        type:CLAIM_SUCCESS,
        data,
    }
}

export const fail = () => {
    return {
        type: CLAIM_FAIL,
    }
}

export const loadClaim = (body) => {
    return dispatch => {
        dispatch(request())
        return HTTP.post(body)
        .then(res => {
            console.log(res)
            switch(res.result_code) {
            case '0000':
                dispatch(loadClaimSuccess(res.result_data.claims));
                return;
            case '1001':
                SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
                Actions.login({type: 'reset'})
                dispatch(fail());
                return;
            default:
                SimpleToast.show(res.result_message)
                dispatch(fail());
                return;
            }
        })
        .catch((error) => {
            dispatch(fail())
        });
    };
}