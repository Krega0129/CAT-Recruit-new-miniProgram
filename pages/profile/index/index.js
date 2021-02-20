// pages/profile/profile.js
const app = getApp()
import {
  formatTime,
  showToast,
  login
} from '../../../utils/util'

import {
  getUserInfo
} from '../../../service/profile'

Page({
  data: {
    btns: [
      {
        icon: 'edit',
        title: '进度',
        route: '/pages/profile/progress/progress',
        content: '点击查看考核进度'
      },
      {
        icon: 'time',
        title: '预约',
        route: '/pages/profile/reservation/reservation',
        content: '点击预约下一轮面试'
      },
      {
        icon: 'qrcode',
        title: '进群',
        route: '/pages/profile/group/group',
        content: '点击扫码进群'
      },
      {
        icon: 'more',
        title: '其他',
        route: '/pages/profile/more/more',
        content: '查看更多'
      },
    ],
    notice: [],
    noticeContent: '',
    modalName: '',
    dialog: false,
    cardBottom: null,
    flagBottom: null,
    unReadNoticeNum: 0,
    date: '2021-02-18 周四',
    userInfo: app.globalData.userInfo,
    time: '上午好',
    isLogin: wx.getStorageSync('userId')
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

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

    const time = new Date()
    let day = ''
    switch(time.getDay()) {
      case 0: day = '日'; break;
      case 1: day = '一'; break;
      case 2: day = '二'; break;
      case 3: day = '三'; break;
      case 4: day = '四'; break;
      case 5: day = '五'; break;
      case 6: day = '六'; break;
    }
    
    const hour = time.getHours()
    if (hour >= 6 && hour < 11) {
      this.setData({
        time: '早上好'
      })
    } else if (hour >= 11 && hour < 13) {
      this.setData({
        time: '中午好'
      })
    } else if (hour >= 13 && hour < 18) {
      this.setData({
        time: '下午好'
      })
    } else {
      this.setData({
        time: '晚上好'
      })
    }

    this.setData({
      date: formatTime(time).split(' ')[0] + ' 周' + day,
      isLogin: wx.getStorageSync('userId')
    })
  },
  navigate(e) {
    if(wx.getStorageSync('userId')) {
      wx.navigateTo({
        url: e.currentTarget.dataset.route
      })
    } else {
      login()
    }
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
  },
  toLogin() {
    login()
  }
})