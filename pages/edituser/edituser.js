// pages/edituser/edituser.js
// pages/goodsedit/goodsedit.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message, $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name:'',
    },
    receiveUsers:[],
    showmodal: false
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
      this.setData({
        receiveUsers: receiveUsers,
      })
    }).catch( err => {
      console.log(err);
    })
  },
  // 校验必须输入的值
  checkRequire: function (e) {
    let value = e.detail.value;
    const id = e.currentTarget.id
    value = value && value.replace(/\s+/g,"");
    if (!value || value.length === 0) {
      $Toast({
        content: `昵称不能为空`,
        type: 'error'
      });
      return;
    }
    const receiveUsers = this.data.receiveUsers;
    for(let n = 0; n < receiveUsers.length; n++) {
      const item = receiveUsers[n];
      if (item.name === value && item.weixin_openid !== this.data.form.weixin_openid) {
        $Toast({
          content: `昵称已经存在`,
          type: 'error'
        });
        return;
      }
    }
  },
  formSubmit: function (e) {
    const form = this.data.form;
    const form_id = e.detail.formId;
    util.collectFormIds(form_id);
    Object.assign(form, e.detail.value);
    this.setData({
      form: form
    })
    const id = this.data.form._id;
    const url = `${api.GetMyusers}/${id}`;
    util.request(url, form, "PUT")
    .then(res => {
      if (!res.data.err) {
        $Message({
          content: '修改昵称成功',
          type: 'success'
        })
      } else {
        $Message({
          content: '修改昵称失败',
          type: 'error'
        })
      }
    })
    .catch(err => {
      console.log(err)
      $Message({
        content: '修改昵称失败',
        type: 'error'
      })
    })
  },
  formReset: function () {
    this.setData({
      showmodal: true
    });
  },
  cancelModal () {
    this.setData({
      showmodal: false
    });
  },
  deleteMyUser: function() {
    this.setData({
      showmodal: false
    });
    const id = this.data.form._id;
    const url = `${api.GetMyusers}/${id}`;
    util.request(url, {}, 'DELETE').then(res => {
      if (res.data.err) {
        $Message({
          content: '系统错误',
          type: 'error'
        });
        return;
      }
      wx.navigateBack({delta : 1});
    }).catch(err => {
      console.log(err)
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
    const form = {
      _id: options.id,
      name: options.name,
      weixin_openid: options.openid
    }
    this.getMyusers();
    this.setData({
      form: form
    });
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