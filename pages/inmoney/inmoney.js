// pages/inmoney/inmoney.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
  },

  getInMoney: function () {
    util.request(api.GetSumPayOfSender).then(res => {
      if (!res.data.err) {
        this.setData({
          goodsList: res.data,
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
    this.getInMoney();
  },
})