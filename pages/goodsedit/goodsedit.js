// pages/goodsedit/goodsedit.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message, $Toast } = require('../../dist/base/index');
const fieldNames = {
  'goodsName': '货物名称',
  'prices': '单价',
  'amount': '数量',
  'nickname': '收货人'
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
      reciveOpenid:'',
      sendDate:'',
      nickname: ''
    },
    receiveIndex: 0,
    receiveUsers: [],
    receiveArray:[],
    showSheet: false
  },
  // 绑定日期改变的事件
  bindDateChange: function (e) {
    const inspection_date =  e.detail.value
    this.setData({
      'form.sendDate': inspection_date
    })
  },
  // 绑定收货人改变的事件
  bindReceiveChange: function ({ detail }) {
    const index = detail.index;
    const reciveOpenid = this.data.receiveUsers[index].weixin_openid;
    const nickname = this.data.receiveUsers[index].name;
    this.setData({
      receiveIndex: index,
      'form.reciveOpenid': reciveOpenid,
      'form.nickname': nickname,
      showSheet: false
    })
  },
  showMyusers: function () {
    this.setData(
      {
        showSheet: true
      }
    )
  },
  // 获取我的客户列表
  getMyusers: function () {
    util.request(api.GetMyusers)
    .then(res => {
      if (res.data.err) {
        console.log(err);
        return;
      }
      if (res.data.length === 0) {
        return;
      } 
      const receiveUsers = res.data;
      const usrList = receiveUsers.map(item => {
        const actions = {
          name: item.name
        }
        return actions;
      })
      this.setData({
        receiveUsers: receiveUsers,
        receiveArray: usrList,
      })
    }).catch( err => {
      console.log(err);
    })
  },
  // 校验数字输入的值
  checkNumsValue: function (e) {
    const value = Number(e.detail.value);
    const id = e.currentTarget.id
    if (isNaN(value) || value <= 0) {
      $Toast({
        content: `${fieldNames[id]}请输入大于0的数字`,
        type: 'error'
      });
    }
  },
  // 校验必须输入的值
  checkRequire: function (e) {
    let value = e.detail.value;
    const id = e.currentTarget.id
    value = value && value.replace(/\s+/g,"");
    if (!value || value.length === 0) {
      $Toast({
        content: `${fieldNames[id]}不能为空`,
        type: 'error'
      });
    }
    if (id === 'nickname') {
      const index = this.data.receiveIndex;
      const nickname = this.data.receiveUsers[index] && this.data.receiveUsers[index].name;
      if (nickname !== value) {
        $Toast({
          content: `收货人不存在`,
          type: 'error'
        });
      }
    }
  },
  initForm: function () {
    const inspection_date = util.dateformat(new Date(), 'yyyy-MM-dd');
    this.setData({
      'form.sendDate': inspection_date
    })
  },
  formSubmit: function (e) {
    const form = this.data.form;
    const form_id = e.detail.formId;
    Object.assign(form, e.detail.value);
    form.form_id = form_id;
    this.setData({
      form: form
    })
    util.request(api.Business, form, "POST")
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
    this.initForm();
  },
  mngMyuser: function () {
    this.setData({
      showSheet: false
    })
    wx.navigateTo({
      url: '/pages/myuser/myuser'
    })
  },
  hideSheet: function () {
    this.setData({
      showSheet: false
    })
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
    this.getMyusers();
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