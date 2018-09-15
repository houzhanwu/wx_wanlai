//app.js
const user = require('./services/users.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    // user.loginByWeixin().then(res => {
    //   console.log(res.data);
    // }).catch(err => {
    //   console.log(err);
    // })
  },
  globalData: {
    userInfo: null
  }
})