// pages/group/group.js
Page({
  data: {
    weChat: true
  },
  onLoad: function (options) {

  },
  weChat() {
    this.setData({
      weChat: true
    })
  },
  qq() {
    this.setData({
      weChat: false
    })
  }
})