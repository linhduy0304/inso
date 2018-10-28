

import {
  CAR_REQUEST,
  // CLAIM_SUCCESS,
  CAR_FAIL,
  CLAIM_TARGET_SUCCESS,
  CAR_CLAIM_REQUIREMENT_SUCCESS
} from '../../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

let HTTP = require('../../services/HTTP');

//getClaimRequirement
export const getClaimRequirementSuccess = (data) => {
  return {
    type: CAR_CLAIM_REQUIREMENT_SUCCESS,
    data,
  }
}

export const getClaimRequirement = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            // dispatch(getListTargetsByClaimTypeSuccess(res.result_data.targets));
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

//add claim
export const addClaim = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            // dispatch(getListTargetsByClaimTypeSuccess(res.result_data.targets));
            Actions.carClaimRequirement();
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

export const request = () => {
  return {
    type: CAR_REQUEST,
  }
}

export const fail = () => {
  return {
    type: CAR_FAIL,
  }
}
export const getListTargetsByClaimTypeSuccess = (data) => {
  return {
    type:CLAIM_TARGET_SUCCESS,
    data,
  }
}


export const getListTargetsByClaimType = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            dispatch(getListTargetsByClaimTypeSuccess(res.result_data.targets));
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