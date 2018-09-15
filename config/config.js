const ApiRootUrl = 'https://cs.phoenixtea.org/api/';
// const ApiRootUrl = 'http://192.168.11.170:7001/api/';
module.exports = {
  SvrUrl: 'https://cs.phoenixtea.org',
  // SvrUrl: 'http://192.168.11.170:7001',
  AuthLoginByWeixin: ApiRootUrl + 'user/wxlogin',                     // 微信登录
  GetBanners: ApiRootUrl + 'banner',                                  // 获取广告条
  Business: ApiRootUrl + 'business',                                  // 生成交易
  GetGoodsOfSender: ApiRootUrl + 'business/getGoodsOfSender',         // 获取发货方各个状态的交易信息
  GetAllGoodsOfSender: ApiRootUrl + 'business/getAllGoodsOfSender',   // 获取发货方所有状态的交易信息
  GetPayGoodsOfSender: ApiRootUrl + 'business/getPayGoodsOfSender',   // 获取发货方已经收款的交易信息
  GetGoodsOfReceive: ApiRootUrl + 'business/getGoodsOfReceive',       // 获取收货方各个状态的交易信息
  GetAllGoodsOfReceive: ApiRootUrl + 'business/getAllGoodsOfReceive', // 获取收货方所有状态的交易信息
  GetSumPayOfReceive: ApiRootUrl + 'business/getSumPayOfReceive',     // 获取收货方的统计交易信息
  GetSumPayOfSender: ApiRootUrl + 'business/getSumPayOfSender',       // 获取发货方的统计交易信息
  getTotalMoneyOfReceive: ApiRootUrl + 'business/getTotalMoneyOfReceive',     // 我支付的总货款
  getTotalMoneyOfSender: ApiRootUrl + 'business/getTotalMoneyOfSender',       // 我收到的总货款
  GetGoodsById: ApiRootUrl + 'business/getGoodsById',                 // 获取货物详细信息
  GetMyusers: ApiRootUrl + 'myuser',                                  // 获取我的客户信息
  GetMyusersByName: ApiRootUrl + 'myuser/findByName',                 // 根据昵称获取我的客户信息
};