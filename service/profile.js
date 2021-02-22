import request from './network'

import {
  BASE_URL,
  H_config
} from './config'

export function baomin(data){
  return request({
    method:'POST',
    url:'/user/signUp',
    data
  })
}
// 登录
export function login(data) {
  return request({
    url: H_config.API_login_URL,
    method: 'post',
    data: data
  })
}

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: H_config.API_getUserInfo_URL,
    data: data
  })
}

// 获取用户报名信息
export function getSignUpInfo(data) {
  return request({
    url: H_config.API_getSignUpInfo_URL,
    data: data
  })
}

// 获取用户进度
export function selectSchedule(data) {
  return request({
    url: H_config.API_selectSchedule_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取可预约时间
export function getAppointTime(data) {
  return request({
    url: H_config.API_getAppointTime_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 预约
export function appointTime(data) {
  return request({
    url: H_config.API_appointTime_URL,
    method: 'post',
    data: data
  })
}

// 获取用户已预约时间
export function selectUserAppoint(data) {
  return request({
    url: H_config.API_selectUserAppoint_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 取消预约
export function cancelAppoint(data) {
  return request({
    url: H_config.API_cancelAppoint_URL,
    method: 'post',
    data: data
  })
}