// app.js
import { getSignUpInfo } from './service/profile'
import { H_config } from './service/config'
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    // 判断是否报名
    if(wx.getStorageSync('userId')) {
      getSignUpInfo({
        userId: wx.getStorageSync('userId')
      }).then(res => {
        if(res.data && res.data.code && res.data.code === H_config.STATUSCODE_getSignUpInfo_SUCCESS) {
          wx.setStorageSync('direction', res.data.data.direction)
          this.globalData.isSignUp = true
          this.globalData.userInfo = res.data.data
        } else {
          this.globalData.isSignUp = false
        }
        wx.hideLoading()
      })
    }

    wx.setStorageSync('notice', [ 
      {
        content: '恭喜你，通过了我们的笔试，现在可以预约一轮面试啦，希望你接下来再接再厉，期待你的精彩表现！',
        isRead: false
      },
      {
        content: '这是第二条通知这是第二条通知这是第二条通知这是第二条通知这是第二条通知这是第二条通知',
        isRead: false
      },
      {
        content: '这是第三条通知这是第三条通知这是第三条通知这是第三条通知这是第三条通知这是第三条通知',
        isRead: true
      },
      {
        content: '这是第四条通知这是第四条通知这是第四条通知这是第四条通知这是第四条通知这是第四条通知',
        isRead: true
      }
    ])
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    })
  },
  
  globalData: {
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    userInfo: null,
    isSignUp: null
  }
})
