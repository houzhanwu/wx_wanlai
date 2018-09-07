// pages/home.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    operationList:[{
      page: 'gather',
      pageName: '已收款',
    },{
      page: 'payment',
      pageName: '未付款',
    },{
      page: 'recive',
      pageName: '已收货',
    },{
      page: 'send',
      pageName: '已发货',
    }]
  },

  getBanners: function () {
    util.request(api.GetBanners).then(res => {
      const banners = res.data.map(item => {
        item.imgUrl = api.SvrUrl + item.imgUrl;
        return item
      })
      this.setData({
        banners: banners,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners();
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