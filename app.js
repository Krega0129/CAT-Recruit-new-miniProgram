// app.js
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
