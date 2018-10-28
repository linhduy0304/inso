

import {
  NOTIFY_REQUEST,
  NOTIFY_SUCCESS,
  NOTIFY_FAIL,
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';

let HTTP = require('../services/HTTP');

//getHome
export const notifyRequest = () => {
  return {
    type: NOTIFY_REQUEST,
  }
}
export const notifySuccess = (data) => {
  return {
    type: NOTIFY_SUCCESS,
    data,
  }
}

export const notifyFail = () => {
  return {
    type: NOTIFY_FAIL,
  }
}

export const loadNoti = (body) => {
  return dispatch => {
    dispatch(notifyRequest())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(notifySuccess(res.result_data.list_notify));
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(notifyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(notifyFail())
      });
  };
}