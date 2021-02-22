// pages/reservation/reservation.js
import {
  getAppointTime,
  appointTime,
  selectUserAppoint
} from '../../../service/profile'
import {
  H_config
} from '../../../service/config'
import { showToast } from '../../../utils/util'

Page({
  data: {
    reservation: [
      // {
      //   time: '1-28 20:30',
      //   direction: '前端组',
      //   progress: '第一轮面试',
      //   num: 3,
      //   maxNum: 5
      // },
      // {
      //   time: '1-28 20:30',
      //   direction: '前端组',
      //   progress: '第一轮面试',
      //   num: 5,
      //   maxNum: 5
      // },
      // {
      //   time: '1-28 20:30',
      //   direction: '前端组',
      //   progress: '第一轮面试',
      //   num: 0,
      //   maxNum: 5
      // }
    ],
    isReservated: true,
    currentReservation: {}
  },
  onLoad: async function (options) {
    await selectUserAppoint({
      userId: wx.getStorageSync('userId')
    }).then(res => {
      if(res.data.code === H_config.STATUSCODE_selectUserAppoint_SUCCESS) {
        this.setData({
          currentReservation: res.data.data[0],
          isReservated: true
        })
      } else if(res.data.code === 1500) {
        this.setData({
          isReservated: false
        })
      } else {
        showToast('加载失败')
      }
    })

    getAppointTime({
      direction: wx.getStorageSync('direction'),
      userId: wx.getStorageSync('userId')
    }).then(res => {
      wx.hideLoading()
      if(res.data.code === H_config.STATUSCODE_getAppointTime_SUCCESS) {
        for(let item of res.data.data) {
          item.time = item.time.slice(5, 16)
        }
        this.setData({
          reservation: res.data.data
        })
      } else if(res.data.code === 1500) {
        showToast('当前阶段无可预约时间')
      } else {
        showToast('加载失败')
      }
    })
  },
  appoint(e) {
    console.log(e.currentTarget.dataset.item);
    const appoint = e.currentTarget.dataset.item
    appointTime({
      appointTime: '2021-' + appoint.time + ':00',
      direction: appoint.direction,
      stage: appoint.stageName,
      userId: wx.getStorageSync('userId')
    }).then(res => {
      wx.hideLoading()
      if(res.data.code === H_config.STATUSCODE_appointTime_SUCCESS) {
        showToast('预约成功', 'success')
        this.setData({
          isReservated: true
        })
      }
    })
  }
})