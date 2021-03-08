// pages/reservation/reservation.js
import {
  getAppointTime,
  appointTime,
  selectUserAppoint,
  cancelAppoint
} from '../../../service/profile'
import {
  H_config
} from '../../../service/config'
import { showToast } from '../../../utils/util'
const app = getApp()

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
    isReservated: false,
    currentReservation: {},
    userInfo: app.globalData.userInfo
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })

    this._selectUserAppoint()
  },
  _selectUserAppoint() {
    selectUserAppoint({
      userId: wx.getStorageSync('userId')
    }).then(res => {
      wx.hideLoading()
      if(res.data.code === H_config.STATUSCODE_selectUserAppoint_SUCCESS) {
        let item = res.data.data
        item.time = item.time.slice(5, 16)
        this.setData({
          currentReservation: item,
          isReservated: true
        })
      } else if(res.data.code === 1500) {
        this._getAppointTime()
        this.setData({
          isReservated: false
        })
      } else {
        showToast('加载失败')
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  _getAppointTime() {
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
    }).catch((err) => {
      console.log(err);
    })
  },
  appoint(e) {
    const appoint = e.currentTarget.dataset.item
    appointTime({
      time: '2021-' + appoint.time + ':00',
      timeId: appoint.timeId,
      userId: wx.getStorageSync('userId')
    }).then(res => {
      wx.hideLoading()
      if(res.data.code === H_config.STATUSCODE_appointTime_SUCCESS) {
        showToast('预约成功', 'success')
        this._selectUserAppoint()
        // this.setData({
        //   isReservated: true,
        //   currentReservation: appoint
        // })
      } else {
        showToast('预约失败')
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  _cancelAppoint() {
    wx.showModal({
      // title: '提示',
      content: '确定取消预约？',
      success: res => {
        if(res.confirm) {
          cancelAppoint({
            time: '2021-' + this.data.currentReservation.time + ':00',
            timeId: this.data.currentReservation.timeId,
            userId: wx.getStorageSync('userId')
          }).then(res => {
            wx.hideLoading()
            if(res.data.code === 1200) {
              wx.showToast({
                title: '取消成功',
              })
              this._getAppointTime()
              this.setData({
                isReservated: false
              })
            } else {
              showToast('取消失败')
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    })
  },
  onShareAppMessage(options) {
    return {
      title: 'CAT Studio',
      path: '/subPages/studio/studio',
      imageUrl: '/assets/img/catlogo.jpg'
    }
  }
})