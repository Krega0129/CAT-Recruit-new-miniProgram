// pages/progress/progress.js
import {
  selectSchedule
} from '../../../service/profile'
import { H_config } from '../../../service/config';

Page({
  data: {
    progress: []
  },
  onLoad: function (options) {
    if(wx.getStorageSync('userId')) {
      selectSchedule({
        // userId: wx.getStorageSync('userId')
        userId: 1
      }).then(res => {
        console.log(res);
        wx.hideLoading()
        if(res && res.data && res.data.code && res.data.code === H_config.STATUSCODE_selectSchedule_SUCCESS) {
          for(let item of res.data.data) {
            item.currentTime = item.currentTime.slice(5, 10)
          }
          this.setData({
            progress: res.data.data
          })
        }
      })
    }
  }
})