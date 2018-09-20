// pages/goods/goods.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
const statusNames = {
  '1': '已发货',
  '2': '已收货',
  '3': '已付款',
  '4': '已收款'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      goodsName:'',
      prices: '',
      amount: '',
      payments: '',
      reciveOpenid:'',
      sendDate:'',
      nickname: '',
      status: '1',
      statusName: '',
      paymethod: ''
    },
    id: '',
    flag: '',
    showmodal: false,
    runing: false,
    methodArray: [
      '微信支付',
      '支付宝支付',
      '银行卡支付',
      '现金支付'
    ]
  },
  getGoods: function (id) {
    util.request(api.GetGoodsById, { id: id, flag: this.data.flag })
    .then(res => {
      if(res.data.err) {
        $Message({
          content: res.data.err,
          type: 'error'
        })
        return;
      }
      const form = res.data;
      form.sendDate = util.dateformat(form.sendDate, 'yyyy/MM/dd');
      form.reciveDate = form.reciveDate && util.dateformat(form.reciveDate, 'yyyy/MM/dd');
      form.statusName = statusNames[form.status];
      this.setData({
        form: form
      })
    })
  },
  deleteGoos: function () {
    this.setData({
      showmodal: true,
      runing: true
    });
    util.request(`${api.Business}/${this.data.id}`, {}, 'DELETE')
    .then(res => {
      if(res.data.err) {
        $Message({
          content: res.data.err,
          type: 'error'
        })
        return;
      }
      this.setData({
        runing: false
      })
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    })
    .catch(err => {
      console.log(err);
      this.setData({
        runing: false
      });
    })
  },
  // 收货确认
  receiveGoods: function (e) {
    this.setData({
      runing: true
    });
    const form = this.data.form;
    const form_id = e.detail.formId;
    util.collectFormIds(form_id);
    form.status = '2';
    form.reciveDate = new Date().toLocaleDateString();
    util.request(`${api.Business}/${this.data.id}`, form, 'PUT')
    .then(res => {
      this.setData({
        runing: false
      });
      if(res.data.err) {
        $Message({
          content: res.data.err,
          type: 'error'
        })
        return;
      }
      const pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      } else {
        wx.redirectTo({
          url: '/pages/recive/recive'
        })
      } 
    })
    .catch(err => {
      console.log(err);
      this.setData({
        runing: false
      });
    })
  },
  payGoods: function (e) {
    this.setData({
      runing: true
    });
    const form = this.data.form;
    const form_id = e.detail.formId;
    util.collectFormIds(form_id);
    form.form_id = form_id;
    this.setData({
      form: form
    });
    form.status = '3';
    form.payMoneyDate = new Date().toLocaleDateString();
    util.request(`${api.Business}/${this.data.id}`, form, 'PUT')
    .then(res => {
      this.setData({
        runing: false
      });
      if(res.data.err) {
        $Message({
          content: res.data.err,
          type: 'error'
        })
        return;
      }
      const pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      } else {
        wx.redirectTo({
          url: '/pages/payment/payment'
        })
      } 
    })
    .catch(err => {
      console.log(err);
      this.setData({
        runing: false
      })
    })
  },
  payConfirm: function (e) {
    this.setData({
      runing: true
    });
    const form = this.data.form;
    const form_id = e.detail.formId;
    util.collectFormIds(form_id);
    form.status = '4';
    form.reciveMoneyDate = new Date().toLocaleDateString();
    util.request(`${api.Business}/${this.data.id}`, form, 'PUT')
    .then(res => {
      this.setData({
        runing: false
      });
      if(res.data.err) {
        $Message({
          content: res.data.err,
          type: 'error'
        })
        return;
      }
      const pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      } else {
        wx.redirectTo({
          url: '/pages/gather/gather'
        })
      } 
    }).catch(err => {
      console.log(err);
      this.setData({
        runing: false
      })
    })
  },
  showPayMethod: function () {
    const self = this;
    wx.showActionSheet({
      itemList: this.data.methodArray,
      success: function(res) {
        console.log(res.tapIndex);
        self.bindMethodChange(res.tapIndex);
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  bindMethodChange: function (index) {
    const paymethod = this.data.methodArray[index];
    this.setData({
      'form.paymethod': paymethod,
    })
  },
  okModal (e) {
    const form_id = e.detail.formId;
    util.collectFormIds(form_id);
    this.setData({
      showmodal: true
    });
  },

  cancelModal () {
      this.setData({
        showmodal: false
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    const flag = options.flag || '';
    this.setData({
      id: id,
      flag: flag
    })
    this.getGoods(id);
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