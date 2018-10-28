
import React from 'react';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const URL = 'http://192.168.11.14/mtq/inso/api/web/app-customer/version1_0/';
export const os_version = DeviceInfo.getSystemVersion();
export const app_version = DeviceInfo.getVersion();
export const deviceId = DeviceInfo.getUniqueID();
export const screen = Dimensions.get('window');
export const Color = '#0bc5b8';
export const Background = '#e4faf3';
export const TxtBlack = '#161313';
export const TxtGrey = '#8a8989';
export const menu = [
  {
    icon: require('../icons/ic_user.png'),
    label: 'Hồ sơ của tôi',
    width: 18,
    type: 1,
    height: 18*27/24
  },
  {
    icon: require('../icons/ic_history.png'),
    label: 'Lịch sử giao dịch',
    width: 18,
    type: 1,
    height: 18*26/27
  },
  {
    icon: require('../icons/ic_share.png'),
    label: 'Giới thiệu bạn bè',
    width: 16,
    type: 1,
    height: 16*28/24
  },
  {
    icon: require('../icons/ic_logout.png'),
    label: 'Đăng xuất',
    width: 18,
    type: 'logout',
    height: 18*20/27
  },
];
