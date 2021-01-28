// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

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
  },
  globalData: {
    userInfo: null,
  }
})
