const ApiRootUrl = 'http://127.0.0.1:7001/api/';

module.exports = {
  SvrUrl: 'http://127.0.0.1:7001',
  AuthLoginByWeixin: ApiRootUrl + 'user/wxlogin',                     // 微信登录
  GetBanners: ApiRootUrl + 'banner',                                  // 获取广告条
  Business: ApiRootUrl + 'business',                                  // 生成、更新、删除交易
  GetGoodsOfSender: ApiRootUrl + 'business/getGoodsOfSender',         // 获取发货方各个状态的交易信息
  GetAllGoodsOfSender: ApiRootUrl + 'business/getAllGoodsOfSender',   // 获取发货方所有状态的交易信息
  GetGoodsOfReceive: ApiRootUrl + 'business/getGoodsOfReceive',       // 获取收货方各个状态的交易信息
  GetAllGoodsOfReceive: ApiRootUrl + 'business/getAllGoodsOfReceive', // 获取收货方所有状态的交易信息
  GetSumPayOfReceive: ApiRootUrl + 'business/getSumPayOfReceive',     // 获取收货方的统计交易信息
  GetSumPayOfSender: ApiRootUrl + 'business/getSumPayOfSender',       // 获取发货方的统计交易信息
};