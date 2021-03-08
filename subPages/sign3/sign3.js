// subPages/sign3/sign3.js
import {baomin} from '../../service/profile'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage:1,
    none:1,
    direction:1,
    name:'',
    nameTrue:1,
    phone:'',
    phoneTrue:1,
    number:'',
    numberTrue:1,
    clazz:'',
    classTrue:1,
    introduce:'',
  },
  getFont(){
    this.setData({
      stage:2,
      direction:1
    })
  },
  getBack(){
    this.setData({
      stage:2,
      direction:2
    })
  },
  nextStep(){
    const {stage,name,phone,number,clazz,introduce,direction} = this.data
    if(stage == 1){
      this.setData({
        stage:2
      })
    }else if(stage == 2){
      const {nameTrue,classTrue,numberTrue} = this.data
      if(nameTrue == 2 && classTrue == 2 && numberTrue == 2){
        this.setData({
          stage:3
        })
      }else{
        this.nameReg()
        this.numberReg()
        this.classReg()
      }
    }else if(stage == 3){
      const {phoneTrue} = this.data
      if(phoneTrue == 2){
        console.log(123);
        baomin({
          userId:wx.getStorageSync('userId'),
          clazz,
          name,
          phoneNumber:phone,
          introduce,
          dirSummary:introduce,
          stuNumber:number,
          direction:direction == 1?'前端':'后端'})
          .then(res=>{
            if(res.data.code == 2205){
              this.setData({
                stage:4
              })
              app.globalData.isSignUp = true
            }else if(res.data.code == 2511){
              wx.showToast({
                duration:2000,
                title: '不可重复报名,有问题可以咨询师兄师姐',
              })
            }
            else{
              wx.showToast({
                duration:2000,
                title: '报名失败',
              })
            }
            wx.hideLoading({
              success: (res) => {},
            })

          }).catch((err) => {
            console.log(err);
          })
      }else{
        this.phoneReg()
      }
    }
  },
  preStep(){
    const {stage} = this.data
    if(stage == 2){
      this.setData({
        stage:1,
        nameTrue:1,
        numberTrue:1,
        classTrue:1,
        name:'',
        number:'',
        clazz:''
      })
    }else if(stage == 3){
      this.setData({
        stage:2,
        phoneTrue:1,
        phone:''
      })
    }else if(stage == 4){
      this.setData({
        stage:3
      })
    }
  },
  getInput(e){
    const {type} = e.currentTarget.dataset
    this.setData({
      [type]:e.detail.value
    })
  },
  nameReg(){
    const reg = /^(?:[\u4e00-\u9fa5·]{2,16})$/
    if(!reg.test(this.data.name.trim())){
      this.setData({
        nameTrue:3
      })
    }else{
      this.setData({
        nameTrue:2
      })
    }
  },
  numberReg(){
    const reg = /^3(1|2)2\d{7}$/
    if(!reg.test(this.data.number.trim())){
      this.setData({
        numberTrue:3
      })
    }else{
      this.setData({
        numberTrue:2
      })
    }
  },
  classReg(){
    if(this.data.clazz.trim() == ''){
      this.setData({
        classTrue:3
      })
    }else{
      this.setData({
        classTrue:2
      })
    }
  },
  phoneReg(){
    const reg = /^(?:(?:\+|00)86)?1\d{10}$/
    if(!reg.test(this.data.phone.trim())){
      this.setData({
        phoneTrue:3
      })
    }else{
      this.setData({
        phoneTrue:2
      })
    }
  },
  goToProfile(){
    wx.navigateTo({
      url: '/pages/profile/index/index',
    })
  },
  onShareAppMessage(options) {
    return {
      title: 'CAT Studio',
      path: '/subPages/studio/studio',
      imageUrl: '/assets/img/catlogo.jpg'
    }
  }
})