// pages/sum/sum.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList:[
      {
        name: '我收到的货款',
        payments: 0
      },
      {
        name: '我支付的货款',
        payments: 0
      },
    ],
  },

  getTotalMoney: function () {
    util.request(api.getTotalMoneyOfSender).then(res => {
      if (!res.data.err) {
        const payList = this.data.payList;
        payList[0].payments = res.data.payments;
        this.setData({
          payList: payList,
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
    });
    util.request(api.getTotalMoneyOfReceive).then(res => {
      if (!res.data.err) {
        const payList = this.data.payList;
        payList[1].payments = res.data.payments;
        this.setData({
          payList: payList,
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
    this.getTotalMoney();
  }

})