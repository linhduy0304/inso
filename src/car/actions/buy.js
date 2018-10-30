



import {
  CAR_PRODUCER_SUCCESS,
  CAR_MODEL_SUCCESS,
  CAR_GET_PRICE_SUCCESS,
  CAR_CHECK_PRICE_SUCCESSS,
  CAR_CHECK_PRICE_FAIL,

  CAR_SEAT_SUCCESS,
  CAR_YEAR_SUCCESS,
  CAR_PACKAGE_REQUEST,
  CAR_PACKAGE_SUCCESS,
  CAR_PACKAGE_FAIL,
  CAR_REQUIREMENT_SUCCESS,
  CAR_UPDATE_IMAGE,
  ADD_PRICE,
  SET_PRICE,
  GET_PROFILE_SUCCESS,
  CAR_REQUEST,
  CAR_FAIL,
  SET_PRODUCER,
  CAR_CHECK_PRICE_REQUEST,
  SAVE_CONTRACT_SUCCESS,
  CLOSE_CONTRACT_SUCCESS,
  CLOSE_PACKAGE_NULL,
  OPEN_CHANGE_FEE,
  CAR_SET_PROFILE_ID,
  CAR_EXCLUSION_SUCCESS,
  CAR_SET_PATH_CORNER,
  CAR_MODAL_CHECK_PRICE,
  CAR_REQUIREMENT_REQUEST
} from '../../config/types';
import {Alert} from 'react-native'
import Toast from 'react-native-simple-toast'
import { Actions } from 'react-native-router-flux';
const HTTP = require('../../services/HTTP');

//confirmExclusion
export const confirmPriceExclusion = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            Actions.contractInfo({back: 'home', contract_id: body.params.contract_id, load: 'CONTRACT_PAYMENT', payment_amount: res.result_data.payment_amount})
            dispatch(fail())
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

export const checkPriceExclusion = (body, payment_amount) => {
  console.log(body)
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            if(res.result_data.confirm_insurance_amount != 0) {
              Actions.carPriceExclusion({contract_id: body.params.contract_id, insurance_amount: res.result_data.confirm_insurance_amount, payment_amount: res.result_data.total_fee});
            }else {
              Actions.contractInfo({contract_id: body.params.contract_id, load: 'CONTRACT_PAYMENT', payment_amount})
            }
            dispatch(fail())
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

export const confirmExclusion = (body) => {
  console.log(body)
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            var body1 = {
              function: 'InsoContractApi_getConfirmInsuranceAmount',
              params: {
                contract_id: body.params.contract_id,
              },
            }
            dispatch(checkPriceExclusion(body1, res.result_data.payment_amount))
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}
// getExclusion
export const getExclusionSuccess = (data) => {
  return {
    type: CAR_EXCLUSION_SUCCESS,
    data
  }
}
export const getExclusion = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(getExclusionSuccess(res.result_data.exclusions))
            dispatch(fail())
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

//setProducer
export const setProducer = (action) => {
  return {
    type: SET_PRODUCER,
    action
  }
}


//saveContract
export const closeContractSuccess = () => {
  return {
    type: CLOSE_CONTRACT_SUCCESS
  }
}
export const saveContractSuccess = () => {
  return {
    type: SAVE_CONTRACT_SUCCESS
  }
}
export const saveContract = (body, action) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            // if(action == 'save') {
            //   Alert.alert(
            //     'Thông báo!',
            //     `Lưu hồ sơ thành công`,
            //     [
            //       {text: 'Ok', },
            //     ],
            //   )
            //   Actions.tab({type: 'reset'})
            // }else {
              dispatch(saveContractSuccess())
            // }
            dispatch(fail())
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

//setPrice
export const setPrice = (price) => {
  return {
    type: SET_PRICE,
    price,
  }
}
//add sub price 
export const addPrice = (price) => {
  return {
    type: ADD_PRICE,
    price,
  }
}
//

export const getProfileSuccess = (data, code) => {
  return {
    type: GET_PROFILE_SUCCESS,
    data,
    code
  }
}
export const getProfile = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(getProfileSuccess(res.result_data.fields, body.params.form_code));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//update requirement when take photo
export const showChangeFee = () => {
  return {
    type: OPEN_CHANGE_FEE,
  }
}
export const checkChangeProfile = (body) => {
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            if(res.result_data.change_fee) {
              dispatch(showChangeFee());
              dispatch(setProfileId(res.result_data.profile_id))
              dispatch(fail())
              return;
            }
            var body1 = {
              function: 'InsoContractApi_updateContractProfile',
              params: body.params
            }
            console.log(body1)
            dispatch(updateContract(body1));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

export const setPathCorner =(data) => {
  return {
    type: CAR_SET_PATH_CORNER,
    data
  }
}

export const updateContract = (body, car) => {
  console.log(body)
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        console.log(res)
        switch(res.result_code) {
          case '0000':
            var body1 = {
              "function": "InsoContractApi_getFormProfileData",
              "params": {
                "contract_id": body.params.contract_id,
                "form_code": body.params.data[0].form_code
              },
            }
            dispatch(setPathCorner({}))
            HTTP.post(body1).then(res1 => {
              console.log(res1)
              switch(res1.result_code) {
                case '0000':
                  console.log(body.params.data[0].form_code)
                  dispatch(getProfileSuccess(res1.result_data.fields, body.params.data[0].form_code))
                  dispatch(getRequirementSuccess(res.result_data.requirements));
                  dispatch(fail());
                  if(car) {
                    var body2 = {
                      function: 'InsoSupplierApi_getInsuranceAmountCar',
                      params: {
                        vehicle_model_id: body.params.data[0].fields.VEHICLE_MODEL_ID,
                        manufacture_year: body.params.data[0].fields.MANUFACTURE_YEAR,
                        number_seats: body.params.data[0].fields.NUMBER_SEATS
                      },
                    }
                    dispatch(carGetPrice(body2, car, 'again'))
                  }else {
                    Actions.pop()
                  }
                  return
                case '1001':
                  Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
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
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail());
            return;
        }
      })
      .catch((error) => {
        dispatch(fail());
      });
  };
}
//updateInfo
export const updateInfo = (body) => {
  return dispatch => {
    dispatch(setPathCorner({}))
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            Actions.carRequirement({contract_id: body.params.contract_id});
            dispatch(fail());
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
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
    type: CAR_UPDATE_IMAGE,
    data,
    action
  }
}
export const setProfileId = (data) => {
  return {
    type: CAR_SET_PROFILE_ID,
    data
  }
}
//addContract
export const addContract = (body) => {
  return dispatch => {
    dispatch(setPathCorner({}))
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            Actions.carUpdateInfo({contract_id: res.result_data.contract_id});
            // if(!body.params.profile_id) {
            //   Actions.carUpdateInfo({contract_id: res.result_data.contract_id});
            // }else {
            //   Actions.carRequirement({contract_id: res.result_data.contract_id})
            // }
            dispatch(setProfileId(null))
            dispatch(fail());
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail());
            return;
        }
      })
      .catch((error) => {
        dispatch(fail());
      });
  };
}

//getRequirement
export const getRequirementRequest = () => {
  return {
    type: CAR_REQUIREMENT_REQUEST,
  }
}

export const getRequirementSuccess = (data) => {
  return {
    type: CAR_REQUIREMENT_SUCCESS,
    data,
  }
}

export const getRequirement = (body) => {
  return dispatch => {
    dispatch(getRequirementRequest())
    dispatch(request())
    dispatch(setPathCorner({}))
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(getRequirementSuccess(res.result_data.requirements));
            dispatch(fail())
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail());
      });
  };
}

//getPackageSuccess
export const getPackageRequest = () => {
  return {
    type: CAR_PACKAGE_REQUEST,
  }
}
export const getPackageSuccess = (data) => {
  return {
    type: CAR_PACKAGE_SUCCESS,
    data,
  }
}

export const getPackageFail = () => {
  return {
    type: CAR_PACKAGE_FAIL,
  }
}

export const closePackageNull = () => {
  return {
    type: CLOSE_PACKAGE_NULL,
  }
}

export const getPackage = (body) => {
  return dispatch => {
    dispatch(getPackageRequest())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            if(res.result_data.package) {
              dispatch(getPackageSuccess(res.result_data.package));
            }else {
              dispatch(getPackageFail());
            }
            dispatch(fail())
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

//checkPrice

export const showModalCheckPrice = (data) => {
  return {
    type: CAR_MODAL_CHECK_PRICE,
    data,
  } 
}
export const checkPriceSuccess = (data) => {
  return {
    type: CAR_CHECK_PRICE_SUCCESSS,
    data,
  }
}
export const checkPriceFail = (data) => {
  return {
    type: CAR_CHECK_PRICE_FAIL,
    data,
  }
}
export const checkPriceRequest = () => {
  return {
    type: CAR_CHECK_PRICE_REQUEST,
  }
}


export const checkPrice = (body) => {
  return dispatch => {
    dispatch(checkPriceRequest())
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            var data = {
              vehicle_model_id: body.params.vehicle_model_id,
              manufacture_year: body.params.manufacture_year,
              number_seats: body.params.number_seats,
              profile_id: body.params.profile_id,
              insurance_amount: res.result_data.insurance_amount,
            }
            Actions.carPackage({data})
            dispatch(fail())
            // dispatch(checkPriceSuccess(res.result_data.insurance_amount));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          case '2003':
          case '2004':
            dispatch(checkPriceFail(res.result_data.insurance_amount));
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail())
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//get Price
export const getPriceSuccess = (data) => {
  return {
    type: CAR_GET_PRICE_SUCCESS,
    data,
  }
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



export const carGetPrice = (body, car, back) => {
  // console.log()
  return dispatch => {
    dispatch(request())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            if(res.result_data.insurance_amount == 0) {
              Alert.alert(
                'Thông báo!',
                'Hiện tại hệ thống không hỗ trợ. Vui lòng thử lại',
                [
                  {text: 'Ok', },
                ],
              )
              dispatch(fail())
              return
            }
            dispatch(getPriceSuccess(res.result_data.insurance_amount));
            Actions.carPrice({data: body.params, car: car, back,})
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            dispatch(fail());
            return;
        }
      })
      .catch((error) => {
        dispatch(fail())
      });
  };
}

//getSeat
export const seatSuccess = (data) => {
  return {
    type: CAR_SEAT_SUCCESS,
    data,
  }
}
export const getSeat = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(seatSuccess(res.result_data.number_seats));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//getYear
export const yearSuccess = (data) => {
  return {
    type: CAR_YEAR_SUCCESS,
    data,
  }
}
export const getYear = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(yearSuccess(res.result_data.years));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}
//get model
export const modelSuccess = (data) => {
  return {
    type: CAR_MODEL_SUCCESS,
    data,
  }
}
export const getModel = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(modelSuccess(res.result_data.vehicle_models));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//producer
export const producerSuccess = (data) => {
  return {
    type: CAR_PRODUCER_SUCCESS,
    data,
  }
}
export const searchProducer = (body) => {
  return dispatch => {
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(producerSuccess(res.result_data.vehicle_producers));
            return;
          case '1001':
            Toast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
            Actions.login({type: 'reset'})
            dispatch(fail())
            return;
          default:
            Toast.show(res.result_message)
            return;
        }
      })
      .catch((error) => {
      });
  };
}