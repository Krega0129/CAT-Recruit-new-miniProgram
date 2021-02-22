const BASE_URL = 'http://www.lizeqiang.top:8083'

const H_config = {}

// 登录
H_config.API_login_URL = '/user/login'

// 获取用户信息
H_config.API_getUserInfo_URL = '/user/selectUserInfo'
H_config.STATUSCODE_getUserInfo_SUCCESS = 3208
H_config.STATUSCODE_getNull_FAILD = 3554

// 查询报名信息
H_config.API_getSignUpInfo_URL = '/user/getSignUpInfo'
H_config.STATUSCODE_getSignUpInfo_SUCCESS = 2208
H_config.STATUSCODE_getSignUpInfo_FAILED = 2513

// 获取用户进度
H_config.API_selectSchedule_URL = '/schedule/selectSchedule'
H_config.STATUSCODE_selectSchedule_SUCCESS = 1200

// 获取可预约时间
H_config.API_getAppointTime_URL = '/appoint/selectTime'
H_config.STATUSCODE_getAppointTime_SUCCESS = 1200

// 预约
H_config.API_appointTime_URL = '/appoint/appointTime'
H_config.STATUSCODE_appointTime_SUCCESS = 1200

// 获取用户已预约时间
H_config.API_selectUserAppoint_URL = '/appoint/selectUserAppoint'
H_config.STATUSCODE_selectUserAppoint_SUCCESS = 1200

// 取消预约
H_config.API_cancelAppoint_URL = '/appoint/cancelAppoint'
// H_config.STATUSCODE_getAppointTime_SUCCESS

export {
  BASE_URL,
  H_config
}