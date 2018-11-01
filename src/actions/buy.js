

import {
  BUY_REQUEST,
  BUY_SUCCESS,
  BUY_FAIL,
  CONTRACT_INFO_SUCCESS,
  GET_PAY_SUCCESS,
  WEB_PAY_SUCCESS,
  CLOSE_WEB_PAY
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

let HTTP = require('../services/HTTP');

//sendEmail
export const sendEmail = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            Alert.alert(
              'Thông báo!',
              'Hệ thống đã gửi giấy chứng nhận điện tử đến email của bạn',
              [
                {text: 'OK'},
              ],
            )
            Actions.tab({type: 'reset'})
            return;
          case '1001':
            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(buyFail());
            return;
          default:
            SimpleToast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//get pay status
export const getPayStatus = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            if(res.result_data.payment_status.code == 'PAYMENT_STATUS_PAID') {
              Actions.paySuccess({contract_id: body.params.contract_id, back: 'home'})
            }
            return;
          case '1001':
            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(buyFail());
            return;
          default:
            SimpleToast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//submitPay
export const closeWebPay = () => {
  return {
    type: CLOSE_WEB_PAY,
  }
}
export const submitPaySuccess = (data) => {
  return {
    type: WEB_PAY_SUCCESS,
    data,
  }
}
export const submitPay = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(submitPaySuccess(res.result_data.payment_url));
            return;
          case '1001':
            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(buyFail());
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(buyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(buyFail())
      });
  };
}

//getPay
export const getPaySuccess = (data) => {
  return {
    type: GET_PAY_SUCCESS,
    data,
  }
}
export const getPay = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(getPaySuccess(res.result_data.methods));
            return;
          case '1001':
            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(buyFail());
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(buyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(buyFail())
      });
  };
}

// contract detail
export const contractInfoSuccess = (data) => {
  return {
    type: CONTRACT_INFO_SUCCESS,
    data,
  }
}

export const contractInfo = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(contractInfoSuccess(res.result_data.contract));
            return;
          case '1001':
            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(buyFail());
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(buyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(buyFail())
      });
  };
}

//get list buy
export const request = () => {
  return {
    type: BUY_REQUEST,
  }
}
export const buySuccess = (data) => {
  return {
    type:BUY_SUCCESS,
    data,
  }
}

export const buyFail = () => {
  return {
    type: BUY_FAIL,
  }
}

export const loadBuy = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(buySuccess(res.result_data.contracts));
            return;
          case '1001':
            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(buyFail());
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(buyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(buyFail())
      });
  };
}