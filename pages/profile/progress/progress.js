// pages/progress/progress.js
import {
  selectSchedule
} from '../../../service/profile'
import { H_config } from '../../../service/config';

Page({
  data: {
    progress: [],
    color: ['grey', 'olive', 'red'],
    icon: ['title', 'check', 'close']
  },
  onLoad: function (options) {
    if(wx.getStorageSync('userId')) {
      selectSchedule({
        userId: wx.getStorageSync('userId')
      }).then(res => {
        wx.hideLoading()
        if(res && res.data && res.data.code && res.data.code === H_config.STATUSCODE_selectSchedule_SUCCESS) {
          for(let item of res.data.data) {
            if(item.currentTime) {
              item.currentTime = item.currentTime.slice(5, 10)
            }
          }
          this.setData({
            progress: res.data.data
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
})