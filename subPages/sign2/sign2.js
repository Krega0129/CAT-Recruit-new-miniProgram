// pages/sign2/sign2.js
Page({

  data:{
    currentIndex:0
  },
  switch(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.index
    })
  }
})