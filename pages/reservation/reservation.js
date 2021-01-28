// pages/reservation/reservation.js
Page({
  data: {
    reservation: [
      {
        time: '1-28 20:30',
        direction: '前端组',
        progress: '第一轮面试',
        num: 3,
        maxNum: 5
      },
      {
        time: '1-28 20:30',
        direction: '前端组',
        progress: '第一轮面试',
        num: 5,
        maxNum: 5
      },
      {
        time: '1-28 20:30',
        direction: '前端组',
        progress: '第一轮面试',
        num: 0,
        maxNum: 5
      }
    ]
  },
  onLoad: function (options) {

  },
  onPullDownRefresh: function () {

  }
})