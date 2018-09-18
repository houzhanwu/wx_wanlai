// pages/home.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const user = require('../../services/users.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    operationList:[{
      page: 'gather',
      pageName: '收款记录',
    },{
      page: 'payment',
      pageName: '付款记录',
    },{
      page: 'recive',
      pageName: '收货记录',
    },{
      page: 'send',
      pageName: '发货记录',
    }],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowAuth: false
  },

  getBanners: function () {
    util.request(api.GetBanners, { imgtype: 'advert'}).then(res => {
      const banners = res.data.map(item => {
        item.imgUrl = api.SvrUrl + item.imgUrl;
        return item
      })
      this.setData({
        banners: banners,
      })
    })
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    if (!e.detail.userInfo) {
      return;
    }
    this.setData({
      isShowAuth: false
    })
    // 获取用户信息
    user.loginByWeixin().then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners();
    const self = this;
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userInfo']) {
          // 未授权，显示授权按钮
          self.setData({
            isShowAuth: true
          })
        } else {
          // 获取用户信息
          user.loginByWeixin().then(res => {
            console.log(res.data);
          }).catch(err => {
            console.log(err);
          });  
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})