// subPages/studio/studio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    top1: 500,
    top2: 1100,
    top3: 2000,
    top4: 2700,
    top5: 3600,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  async onReady(){
  },
  getTop(name) {
    wx.createSelectorQuery().select(name).boundingClientRect((rect) => {
      this.setData({
        [name]: rect.height
      })
    }).exec()
  },
  onPageScroll(e){
    const {top1,top2,top3,top4,top5} = this.data
    let currentTop = e.scrollTop
    if(top1 < currentTop  && currentTop < top2){
      console.log(top1,'top1');
      console.log(currentTop,'currentTop');
      console.log(top2,'top2');
      this.setData({
        color:1
      })
    }else if(top2 < currentTop  && currentTop < top3){
      console.log(top2,'top2');
      console.log(currentTop,'currentTop');
      console.log(top3,'top3');
      this.setData({
        color:2
      })
    }else if(top3 < currentTop  && currentTop < top4){
      console.log(top3,'top3');
      console.log(currentTop,'currentTop');
      console.log(top4,'top4');
      this.setData({
        color:3
      })
    }else if(top4 < currentTop && currentTop  < top5){
      console.log(top4,'top4');
      console.log(currentTop,'currentTop');
      console.log(top5,'top5');
      this.setData({
        color:4
      })
    }else if(top5 < currentTop){
      this.setData({
        color:5
      })
    }else if(currentTop < top1){
      this.setData({
        color:0
      })
    }
  }
})