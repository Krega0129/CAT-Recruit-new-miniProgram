const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export function showToast(showMsg, type, time) {
  wx.showToast({
    title: showMsg,
    icon: type || 'none',
    duration: time || 1000
  })
}

export function login() {
  wx.login({
    success: res => {
      if(res.errMsg === "login:ok") {
        const code = res.code
        wx.navigateTo({
          url: '/pages/login/login',
          success: res => {
            res.eventChannel.emit('code',{ code: code })
          }
        })
      } else {
        this.showToast('登录失败！')
      }
    }
  })
}

module.exports = {
  formatTime,
  showToast,
  login
}
