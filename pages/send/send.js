// pages/send/send.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[]
  },

  getSendGoods: function (status) {
    util.request(api.GetAllGoodsOfSender, {status: status}).then(res => {
      if (!res.data.err) {
        const goods = res.data;
        this.setData({
          goodsList: goods
        });
      } else {
        $Message({
          content: res.data.err,
          type: 'error'
        });
      }
    }).catch(err => {
      console.log(err);
      $Message({
        content: '系统错误',
        type: 'error'
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSendGoods('2');
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