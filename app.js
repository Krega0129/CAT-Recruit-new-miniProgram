// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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
