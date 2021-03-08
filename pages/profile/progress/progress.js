// pages/progress/progress.js
import {
  selectSchedule
} from '../../../service/profile'
import { H_config } from '../../../service/config';

Page({
  data: {
    progress: [],
    color: ['grey', 'olive', 'red', 'cyan'],
    icon: ['title', 'check', 'close'],
    content: [
      [
        [
          '',
          ''
        ],
        '报名成功',
        ''
      ],
      [
        [
          '笔试还未开始',
          '笔试正在进行中'
        ],
        '恭喜你，通过了笔试',
        '很遗憾，你没有通过笔试，相信你的编程之路永不停息，继续加油！'
      ],
      [
        [
          '一轮面试还未开始',
          '一轮面试正在进行中'
        ],
        '恭喜你，通过了一轮面试',
        '很遗憾，你没有通过一轮面试，相信你的编程之路永不停息，继续加油！'
      ],
      [
        [
          '二轮面试还未开始',
          '二轮面试正在进行中'
        ],
        '恭喜你，通过了二轮面试',
        '很遗憾，你没有通过二轮面试，相信你的编程之路永不停息，继续加油！'
      ],
      [
        [
          '一轮考核还未开始',
          '一轮考核正在进行中'
        ],
        '恭喜你，通过了一轮考核',
        '很遗憾，你没有通过一轮考核，相信你的编程之路永不停息，继续加油！'
      ],
      [
        [
          '二轮考核还未开始',
          '二轮考核正在进行中'
        ],
        '恭喜你，通过了所有考核，如果想和我们一起进步，就加入我们吧！',
        '很遗憾，你没有通过二轮考核，相信你的编程之路永不停息，继续加油！'
      ],
    ]
  },
  onLoad: function (options) {
    if(wx.getStorageSync('userId')) {
      selectSchedule({
        userId: wx.getStorageSync('userId')
      }).then(res => {
        wx.hideLoading()
        if(res && res.data && res.data.code && res.data.code === H_config.STATUSCODE_selectSchedule_SUCCESS) {
          // res.data.data = res.data.data.slice(0, -1)
          
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
  },
  onShareAppMessage(options) {
    return {
      title: 'CAT Studio',
      path: '/subPages/studio/studio',
      imageUrl: '/assets/img/catlogo.jpg'
    }
  }
})