// pages/goodsedit/goodsedit.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      goodsName:'',
      prices:0,
      amount:0,
      reciveOpenid:'',
      sendDate:''
    }
  },
  bindDateChange: function (e) {
    const inspection_date =  e.detail.value
    this.setData({
      'form.sendDate': inspection_date
    })
  },
  initForm: function () {
    const inspection_date = util.dateformat(new Date(), 'yyyy-MM-dd');
    this.setData({
      'form.sendDate': inspection_date
    })
  },
  formSubmit: function (e) {
    this.setData({
      form: e.detail.value
    })
    util.request(api.Business, this.data.form, "POST")
    .then(res => {
      if (!res.data.err) {
        $Message({
          content: '发货成功',
          type: 'success'
        })
      } else {
        $Message({
          content: '发货失败',
          type: 'error'
        })
      }
    })
    .catch(err => {
      console.log(err)
      $Message({
        content: '发货失败',
        type: 'error'
      })
    })
  },
  formReset: function () {
    this.initForm()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initForm();
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