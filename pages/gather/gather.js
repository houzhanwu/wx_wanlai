// pages/gather/gather.js
const util = require('../../utils/util.js');
const api = require('../../config/config.js');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    page: {
      current: 1,
      limit: 10,
      total: 0
    },
    searchVaule: null
  },

  getPayGoods: function (status) {
    const search = {status: status, page: this.data.page};
    if (this.data.searchVaule) {
      search.value = this.data.searchVaule;
    }
    util.request(api.GetPayGoodsOfSender, search).then(res => {
      if (!res.data.err) {
        const pageData = res.data;
        let goods = pageData.results;
        const total = pageData.page.total;
        const limit = this.data.page.limit;
        const pageTotal = Math.ceil(total / limit);
        goods = goods.map(item => {
          const date = item.status === '3' ? item.payMoneyDate : item.reciveMoneyDate;
          item.reciveMoneyDate = util.dateformat(date, 'yyyy/MM/dd');
          return item;
        });

        this.setData({
          goodsList: goods,
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
    this.getPayGoods('3');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const searchVaule = options.value;
    if (searchVaule) {
      this.setData({
        searchVaule: searchVaule
      })
    }
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
    this.getPayGoods('3');
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