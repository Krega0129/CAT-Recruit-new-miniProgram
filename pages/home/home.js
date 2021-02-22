// pages/home/home.js
Page({
  data: {

  },
  onLoad: function (options) {
    wx.redirectTo({
      url: '/subPages/studio/studio'
    })
  }
})