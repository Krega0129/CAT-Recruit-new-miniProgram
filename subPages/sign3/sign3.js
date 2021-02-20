// subPages/sign3/sign3.js
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
    class:'',
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
    const {stage} = this.data
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
        this.setData({
          stage:4
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
        stage:1
      })
    }else if(stage == 3){
      this.setData({
        stage:2
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
    if(this.data.class.trim() == ''){
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
  }
 
})