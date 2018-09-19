var api = require('../config/config.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateformat = (strdate, fmt) => {
  const self = new Date(strdate)
  var o = {
      'M+': self.getMonth() + 1, // 月份
      'd+': self.getDate(), // 日
      'h+': self.getHours(), // 小时
      'm+': self.getMinutes(), // 分
      's+': self.getSeconds(), // 秒
      'q+': Math.floor((self.getMonth() + 3) / 3), // 季度
      'S': self.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (self.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
  }
  return fmt;
}
/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: function (res) {
        console.log("success");

        if (res.statusCode == 401) {
            //需要登录后才可以操作
            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              //登录远程服务器
              request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
                if (!res.data.err) {
                  //存储用户信息
                  wx.setStorageSync('userInfo', res.data.user);
                  wx.setStorageSync('token', res.data.token);

                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
        } else if(res.statusCode == 200) {
          resolve(res)
        }else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log(res)
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res)
    //           resolve(res);

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           // if (this.userInfoReadyCallback) {
    //           //   this.userInfoReadyCallback(res)
    //           // }
    //         },
    //         fail: function (err) {
    //           reject(err);
    //         }
    //       })
    //     }
    //   }
    // })
  });
}


function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function wanlaiLogin() {
  return new Promise(function (resolve, reject) {
    let code = null;
    return login().then((res) => {
      code = res.code;
      return getUserInfo();
    }).then((userInfo) => {
      //登录远程服务器
      request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
        if (!res.data.err) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.user);
          wx.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 收集formid
 * @param {*} formid 
 */
function collectFormIds(formid) {
  const formids = wx.getStorageSync('formids') || [];
  const data = {
    formid: formid,
    expire: new Date().getTime() + 60480000, // 7天后的过期时间戳
  }
  formids.push(data);
  wx.setStorageSync('formids', formids);
}

function uploadFormIds() {
  return new Promise(function (resolve, reject) {
    const formids = wx.getStorageSync('formids') || [];
    if (!formids.length) {
      reject({err: '没有formids'});
    } else {
      const userinfo = wx.getStorageSync('userInfo');
      const wx_openid = userinfo && userinfo.weixin_openid;
      if (!wx_openid) {
        return reject({err: '用户未登录'});
      }
      const jsonids = JSON.stringify(formids);
      request(api.SaveFormids, {
        openid: wx_openid,
        formids: jsonids,
      }, 'POST').then(res => {
        if(res.data.err) {
          console.log(res.data.err);
          reject(res.data.err);
        }else {
          // 上传成功后清空本地的formids
          wx.setStorageSync('formids', []);
          resolve(res.data)
        }
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  dateformat,
  request,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
  wanlaiLogin,
  collectFormIds,
  uploadFormIds,
}
