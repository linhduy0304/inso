
import { deviceId, app_version, os_version } from '../config/System';
import Const from './Const';
import Store from './Store';

export const post = (data) => {
  return new Store().getSession(Const.SESSION_ID).then(session_id => {
    var body = {
      app_version: app_version,
      os_version: os_version,
      device_id: deviceId,
      session_id: session_id ? session_id : '',
    };
    body['function'] = data.function;
    body['params'] = data.params;
    return fetch(
      'http://101.99.7.132:8080/mtq/inso/api/web/app-customer/version1_0/', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(body)
      }
    ).then(res => {
      return res.json()
    })
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return {
        code: 500
      }
    })
  })
}


