
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import Store from '../services/Store';
const HTTP = require('../services/HTTP');
const Const = require('../services/Const');


//logout
export const logout = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res =>  {
        switch(res.result_code) {
          case '0000':
            new Store().storeSession(Const.IS_LOGIN, null);
            new Store().storeSession(Const.SESSION_ID, null);
            new Store().storeSession(Const.SESSION_KEY, null);
            return;
          default:
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//
export const checkLogin = () => {
  return dispatch => {
    return new Store().getSession(Const.IS_LOGIN).then(is_login => {
      if(is_login) {
        Actions.tab({type: 'reset'})
        return;
        // return Auth.getUser().then(res => {
        //   switch(res.meta.code) {
        //     case 1:
        //       dispatch(profileUserSuccess(res.data.info));
        //       Actions.tab({type: 'reset'})
        //       return;
        //     default:
        //       SimpleToast.show(res.meta.message)
        //       return;
        //   }
        // })
      }else {
        Actions.login({type: 'reset'})
      }
    })
  };
}

//regiter email
export const register = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return HTTP.post(body)
      .then(res =>  {
        switch(res.result_code) {
          case '0000':
            new Store().storeSession(Const.IS_LOGIN, true);
            new Store().storeSession(Const.SESSION_ID, res.result_data.session_id);
            new Store().storeSession(Const.SESSION_KEY, res.result_data.session_key);
            Actions.tab({type: 'reset'})
            dispatch(loginSuccess());
            // dispatch(carGetYearSuccess(res.result_data));
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail());
      });
  };
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  }
}
export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  }
}
export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  }
}
export const login = (body) => {
  return dispatch => {
    dispatch(loginRequest());
    return HTTP.post(body)
      .then(res =>  {
        switch(res.result_code) {
          case '0000':
            new Store().storeSession(Const.IS_LOGIN, true);
            new Store().storeSession(Const.SESSION_ID, res.result_data.session_id);
            new Store().storeSession(Const.SESSION_KEY, res.result_data.session_key);
            Actions.tab({type: 'reset'})
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.result_message);
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}