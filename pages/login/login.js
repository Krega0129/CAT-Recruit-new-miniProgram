// pages/WCH/login/login.js
import {
  login,
  getSignUpInfo
} from '../../service/profile'

import {
  H_config
} from '../../service/config'

const app = getApp()

Page({
  data: {
    code: null
  },
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('code', data => {
      this.data.code = data.code
    })
  },
  showLogin(e) {
    if (e.detail.errMsg == "getUserInfo:ok"){
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      wx.showLoading({
        title: '正在登录中...',
        icon: 'loading',
        mask: true
      })
      login({
        code: this.data.code,
        encryptedData: encryptedData,
        iv: iv
      }).then(res => {
        const id = res.data.data.id
        const token = res.data.data.token
        if(res.data.code === 2203 || res.data.code === 2204) {
          wx.setStorageSync('token', token)
          wx.setStorageSync('userId', id)
          wx.hideLoading()

          getSignUpInfo({
            userId: id
          }).then(res => {
            if(res.data && res.data.code && res.data.code === H_config.STATUSCODE_getSignUpInfo_SUCCESS) {
              wx.setStorageSync('direction', res.data.data.direction)
              app.globalData.isSignUp = true
              app.globalData.userInfo = res.data.data
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                  wx.showToast({
                    title: '登录成功',
                    duration: 1000
                  })
                  setTimeout(() => {
                    wx.navigateBack()
                  }, 100)
                }
              })
            } else {
              app.globalData.isSignUp = false
              wx.showToast({
                title: '登录成功',
                duration: 1000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 100)
            }
            wx.hideLoading()
          }).catch((err) => {
            console.log(err);
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      showToast('登录失败')
    }
  },
  onShareAppMessage(options) {
    return {
      title: 'CAT Studio',
      path: '/subPages/studio/studio',
      imageUrl: '/assets/img/catlogo.jpg'
    }
  }
})