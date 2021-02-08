// pages/profile/profile.js
const app = getApp()

Page({
  data: {
    btns: [
      {
        icon: 'edit',
        title: '进度',
        route: '/pages/progress/progress',
        content: '点击查看考核进度'
      },
      {
        icon: 'time',
        title: '预约',
        route: '/pages/reservation/reservation',
        content: '点击预约下一轮面试'
      },
      {
        icon: 'qrcode',
        title: '进群',
        route: '/pages/group/group',
        content: '点击扫码进群'
      },
      {
        icon: 'more',
        title: '其他',
        route: '/pages/more/more',
        content: '查看更多'
      },
    ],
    notice: [],
    noticeContent: '',
    modalName: '',
    dialog: false,
    cardBottom: null,
    flagBottom: null,
    unReadNoticeNum: 0
  },
  onLoad: function (options) {
    // 计算装四个按钮容器的高度
    wx.createSelectorQuery().select('.card').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        cardBottom: res[0].bottom
      })
    })
    wx.createSelectorQuery().select('.flag').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        flagBottom: res[0].bottom
      })
    })
    // 适应平板
    wx.createSelectorQuery().select('.action').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      if(res[0].width > 150) {
        this.setData({
          action: true
        })
      }
    })
    
  },
  onShow() {
    new Promise((resolve, reject) => {
      this.setData({
        notice: wx.getStorageSync('notice')
      })
      resolve()
    }).then(() => {
      let num = 0
      this.data.notice.forEach((data) => {
        if(data.isRead === false) {
          num++
        }
      })
      this.setData({
        unReadNoticeNum: num
      })
    })
  },
  navigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.route
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  openDialog(e) {
    let notice = this.data.notice.find(item => item.content === e.currentTarget.dataset.notice)
    if(!notice.isRead) {
      notice.isRead = true
      this.data.unReadNoticeNum--
    }
    this.setData({
      noticeContent: e.currentTarget.dataset.notice,
      notice: this.data.notice,
      unReadNoticeNum: this.data.unReadNoticeNum,
      dialog: true
    })
  }, 
  closeDialog() {
    this.setData({
      dialog: false
    })
  }
})