

import {
  CAR_REQUEST,
  // CLAIM_SUCCESS,
  CAR_FAIL,
  CLAIM_TARGET_SUCCESS,
  CAR_CLAIM_REQUIREMENT_SUCCESS,
  CAR_CLAIM_CITY_SUCCESS,
  CAR_CLAIM_GARAGE_SUCCESS,
  CAR_CLAIM_GET_PROFILE_SUCCESS,
  CAR_CLAIM_LIST_TYPE_SUCCESS
} from '../../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

let HTTP = require('../../services/HTTP');

//updateStatusClaimProfileRequest
export const updateStatusClaimProfileRequest = (body) => {
    return dispatch => { 
        dispatch(request())
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    // dispatch(getFormProfileDataSuccess(res.result_data.fields, body.params.form_code));
                    return;
                case '1001':
                    SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(fail())
                return;
            default:
                SimpleToast.show(res.result_message)
                dispatch(fail())
                return;
          }
        })
        .catch((error) => {
            dispatch(fail())
        });
    };
  }
//getFormProfileData
export const getFormProfileDataSuccess = (data, code) => {
    return {
      type: CAR_CLAIM_GET_PROFILE_SUCCESS,
      data,
      code
    }
  }
export const getFormProfileData = (body) => {
    return dispatch => {
      return HTTP.post(body)
        .then(res => {
          switch(res.result_code) {
            case '0000':
                dispatch(getFormProfileDataSuccess(res.result_data.fields, body.params.form_code));
                return;
            case '1001':
                SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
                Actions.login({type: 'reset'})
                dispatch(fail())
                return;
            default:
                SimpleToast.show(res.result_message)
                dispatch(fail())
                return;
          }
        })
        .catch((error) => {
            dispatch(fail())
        });
    };
  }
//updateGarageLinked
export const updateGarageLinkedSuccess = (data) => {
  return {
    type: CAR_CLAIM_GARAGE_SUCCESS,
    data,
  }
}

export const updateGarageLinked = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            dispatch(updateGarageLinkedSuccess(res.result_data.garages));
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

//getListGarage
export const getListGarageSuccess = (data) => {
  return {
    type: CAR_CLAIM_GARAGE_SUCCESS,
    data,
  }
}

export const getListGarage = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            dispatch(getListGarageSuccess(res.result_data.garages));
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

//getListCity
export const getListCitySuccess = (data) => {
  return {
    type: CAR_CLAIM_CITY_SUCCESS,
    data,
  }
}

export const getListCity = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            dispatch(getListCitySuccess(res.result_data.cities));
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
        console.log(res)
        switch(res.result_code) {
          case '0000':
            dispatch(getClaimRequirementSuccess(res.result_data.requirements));
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
    console.log(body)
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            // dispatch(getListTargetsByClaimTypeSuccess(res.result_data.targets));
            Actions.carClaimRequirement({claim_id: res.result_data.claim_id, contract_id: body.params.contract_id});
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
  console.log(body)
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

//getListClaimType
export const getListClaimTypeSuccess = (data) => {
    return {
      type: CAR_CLAIM_LIST_TYPE_SUCCESS,
      data,
    }
  }
export const getListClaimType = (body) => {
    return dispatch => {
      dispatch(request())
      return HTTP.post(body)
        .then(res => {
          switch(res.result_code) {
            case '0000':
              dispatch(getListClaimTypeSuccess(res.result_data.claim_types));
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