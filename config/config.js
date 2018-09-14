const ApiRootUrl = 'http://192.168.11.170:7001/api/';

module.exports = {
  SvrUrl: 'http://192.168.11.170:7001',
  AuthLoginByWeixin: ApiRootUrl + 'user/wxlogin',                     // 微信登录
  GetBanners: ApiRootUrl + 'banner',                                  // 获取广告条
  Business: ApiRootUrl + 'business',                                  // 生成交易
  // CreateBusiness: ApiRootUrl + 'business/create',                     // 生成交易
  // UpdateBusiness: ApiRootUrl + 'business/update',                     // 更新交易
  // DeleteBusiness: ApiRootUrl + 'business/destroy',                    // 删除交易
  GetGoodsOfSender: ApiRootUrl + 'business/getGoodsOfSender',         // 获取发货方各个状态的交易信息
  GetAllGoodsOfSender: ApiRootUrl + 'business/getAllGoodsOfSender',   // 获取发货方所有状态的交易信息
  GetPayGoodsOfSender: ApiRootUrl + 'business/getPayGoodsOfSender',   // 获取发货方已经收款的交易信息
  GetGoodsOfReceive: ApiRootUrl + 'business/getGoodsOfReceive',       // 获取收货方各个状态的交易信息
  GetAllGoodsOfReceive: ApiRootUrl + 'business/getAllGoodsOfReceive', // 获取收货方所有状态的交易信息
  GetSumPayOfReceive: ApiRootUrl + 'business/getSumPayOfReceive',     // 获取收货方的统计交易信息
  GetSumPayOfSender: ApiRootUrl + 'business/getSumPayOfSender',       // 获取发货方的统计交易信息
  GetGoodsById: ApiRootUrl + 'business/getGoodsById',                 // 获取货物详细信息
  GetMyusers: ApiRootUrl + 'myuser',                                  // 获取我的客户信息
  GetMyusersByName: ApiRootUrl + 'myuser/findByName',                 // 根据昵称获取我的客户信息
};