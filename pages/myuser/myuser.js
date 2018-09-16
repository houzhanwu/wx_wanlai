// pages/myuser/myuser.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    page: {
      current: 1,
      limit: 10,
      total: 0
    },
    searchVaule: null,
  },
  getMyusers: function () {
    const search = { page: this.data.page };
    if (this.data.searchVaule) {
      search.value = this.data.searchVaule;
    }
    util.request(api.GetMyuserBypage, search).then(res => {
      if (!res.data.err) {
        const pageData = res.data;
        let users = pageData.results;
        const total = pageData.page.total;
        const limit = this.data.page.limit;
        const pageTotal = Math.ceil(total / limit);
        users = users.map(item => {
          item.switch = true;
          return item;
        });

        this.setData({
          userList: users,
          'page.total': pageTotal
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
  hasMoreRecord: function () {
    const page = this.data.page;
    if (page.current + 1 > page.total) {
      return false;
    }
    return true;
  },
  handlePageChange: function ({ detail }) {
    const type = detail.type;
    const page = this.data.page;
    if (type === 'next') {
      if (!this.hasMoreRecord()) {
        return;
      }
      page.current++;
      this.setData({
        page: page
      });
    } else if (type === 'prev') {
      page.current--;
      if (page.current < 1) {
        page.current = 1;
      }
      this.setData({
        page: page
      });
    }
    this.getMyusers();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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