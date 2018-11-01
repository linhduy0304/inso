

import {
    CAR_CLAIM_REQUEST,
  // CLAIM_SUCCESS,
  CAR_CLAIM_FAIL,
  CLAIM_TARGET_SUCCESS,
  CAR_CLAIM_REQUIREMENT_SUCCESS,
  CAR_CLAIM_CITY_SUCCESS,
  CAR_CLAIM_GARAGE_SUCCESS,
  CAR_CLAIM_GET_PROFILE_SUCCESS,
  CAR_CLAIM_LIST_TYPE_SUCCESS,
  CAR_CLAIM_UPDATE_IMAGE,
  CAR_CLAIM_SET_PATH_CORNER,
  CAR_CLAIM_MODAL_REQUIREMENT,
  CAR_CLAIM_CONTRACT_SUCCESS,
  CAR_CLAIM_MODAL_BOOK_GARA
} from '../../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import {Alert} from 'react-native'

let HTTP = require('../../services/HTTP');

//getClaimInfo
export const getClaimInfoSuccess =  (data) => {
    return {
        type: CAR_CLAIM_CONTRACT_SUCCESS,
        data
    }
}
export const getClaimInfo = (body) => {
    return dispatch => { 
        dispatch(request())
        return HTTP.post(body).then(res => {
            console.log(res)
            switch(res.result_code) {
                case '0000':
                    dispatch(getClaimInfoSuccess(res.result_data.claim))
                    dispatch(fail())
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

//checkClaimRequirement
export const checkClaimRequirement = (body) => {
  return dispatch => { 
      dispatch(request())
      return HTTP.post(body).then(res => {
        console.log(res)
          switch(res.result_code) {
              case '0000':
                if(res.result_data.accept) {
                    var body1 = {
                        function: 'InsoClaimApi_updateStatusClaimProfileRequest',
                        params: {
                            claim_id: body.params.claim_id
                        },
                    }
                    dispatch(updateStatusClaimProfileRequest(body1))
                }else {
                    Alert.alert(
                        'Thông báo!',
                        `Bạn chưa hoàn thành hồ sơ`,
                        [
                            {text: 'Ok', },
                        ],
                    )
                    dispatch(fail())
                }
                  // dispatch(modalClaimRequirement(true))
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

//setPathCorner
export const setPathCorner =(data) => {
    return {
        type: CAR_CLAIM_SET_PATH_CORNER,
        data
    }
}

//updateClaimData
export const updateClaimData = (body, car) => {
    return dispatch => {
        dispatch(request())
        return HTTP.post(body)
        .then(res => {
            switch(res.result_code) {
            case '0000':
                var body1 = {
                    function: "InsoClaimApi_getFormProfileData",
                    params: {
                        claim_id: body.params.claim_id,
                        form_code: body.params.data[0].form_code
                    },
                }
                dispatch(setPathCorner({}))
                HTTP.post(body1).then(res1 => {
                    switch(res1.result_code) {
                        case '0000':
                            dispatch(getFormProfileDataSuccess(res1.result_data.fields, body.params.data[0].form_code))
                            dispatch(getClaimRequirementSuccess(res.result_data.requirements));
                            dispatch(fail());
                            Actions.pop()
                        return
                        case '1001':
                            SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
                            Actions.login({type: 'reset'})
                            dispatch(fail())
                            return;
                        default:
                            dispatch(fail())
                            return;
                    }
                    })
                return;
            case '1001':
                SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
                Actions.login({type: 'reset'})
                dispatch(fail())
                return;
            default:
                SimpleToast.show(res.result_message)
                dispatch(fail());
                return;
            }
        })
        .catch((error) => {
            dispatch(fail());
        });
    };
}

//updateImage
export const updateImage = (data, action) => {
    return {
      type: CAR_CLAIM_UPDATE_IMAGE,
      data,
      action
    }
}

export const modalClaimRequirement = data => {
    return {
        type: CAR_CLAIM_MODAL_REQUIREMENT,
        data
    }
}

//updateStatusClaimProfileRequest
export const updateStatusClaimProfileRequest = (body) => {
    return dispatch => { 
        dispatch(request())
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(modalClaimRequirement(true))
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
// export const updateGarageLinkedSuccess = (data) => {
//   return {
//     type: CAR_CLAIM_GARAGE_SUCCESS,
//     data,
//   }
// }
export const modalBookGara = (data) => {
  return {
    type: CAR_CLAIM_MODAL_BOOK_GARA,
    data
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
            dispatch(modalBookGara(true))
            // dispatch(updateGarageLinkedSuccess(res.result_data.garages));
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
            dispatch(fail());
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
            dispatch(fail());
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
    type: CAR_CLAIM_REQUEST,
  }
}

export const fail = () => {
  return {
    type: CAR_CLAIM_FAIL,
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