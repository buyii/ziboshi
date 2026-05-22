import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    navigationBarTitleText: '星佣宝',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
  },
  tabBar: {
    custom: true,
    height: '0',
    color: '#999999',
    selectedColor: '#089D39',
    list: [{
      pagePath: 'pages/home/index',
    }, {
      pagePath: 'pages/rank/index',
    }, {
      pagePath: 'pages/mine/index',
    }],
  },
  subPackages: [
    {
      root: 'pageHome',
      pages: [
        {
          path: 'details/index',
          type: 'page',
          layout: 'default',
          name: 'details',
          style: {
            navigationBarTitleText: '详情',
          },
        },
        {
          path: 'payment/index',
          type: 'page',
          layout: 'default',
          name: 'payment',
          style: {
            navigationBarTitleText: '支付结算',
          },
        },
        {
          path: 'applySuccess/index',
          type: 'page',
          layout: 'default',
          name: 'applySuccess',
          style: {
            navigationBarTitleText: '申样成功',
          },
        },
        {
          path: 'maintaincar/index',
          type: 'page',
          layout: 'page',
          name: 'maintaincar',
          style: {
            navigationBarTitleText: '商品维护',
          },
        },
        {
          path: 'maintaincarLog/index',
          type: 'page',
          layout: 'page',
          name: 'logList',
          style: {
            navigationBarTitleText: '商品维护',
          },
        },
      ],
    },
    {
      root: 'pageRank',
      pages: [
        {
          path: 'addressManage/index',
          type: 'page',
          layout: 'default',
          name: 'address',
          style: {
            navigationBarTitleText: '地址管理',
          },
        },
        {
          path: 'addAddress/index',
          type: 'page',
          layout: 'default',
          name: 'addAddress',
          style: {
            navigationBarTitleText: '添加地址',
          },
        },
        {
          path: 'addressSuccess/index',
          type: 'page',
          layout: 'default',
          name: 'addressSuccess',
          style: {
            navigationBarTitleText: '地址添加成功',
          },
        },
        {
          path: 'incomeTeamDetails/index',
          type: 'page',
          layout: 'default',
          name: 'incomeTeamDetails',
          style: {
            navigationBarTitleText: '收益明细',
          },
        },
        {
          path: 'pointsDetails/index',
          type: 'page',
          layout: 'default',
          name: 'pointsDetails',
          style: {
            navigationBarTitleText: '收益记录',
          },
        },
        {
          path: 'pointsRedemption/index',
          type: 'page',
          layout: 'default',
          name: 'pointsRedemption',
          style: {
            navigationBarTitleText: '兑换记录',
          },
        },
      ],
    },
    {
      root: 'pageMine',
      pages: [
        {
          path: 'orderList/index',
          type: 'page',
          layout: 'default',
          name: 'orderList',
          style: {
            navigationBarTitleText: '我的订单',
          },
        },
        {
          path: 'orderRefund/index',
          type: 'page',
          layout: 'default',
          name: 'orderRefund',
          style: {
            navigationBarTitleText: '申请退款',
          },
        },
        {
          path: 'bankCardManage/index',
          type: 'page',
          layout: 'default',
          name: 'bankCardManage',
          style: {
            navigationBarTitleText: '我的账户',
          },
        },
        {
          path: 'addBankCard/index',
          type: 'page',
          layout: 'default',
          name: 'addBankCard',
          style: {
            navigationBarTitleText: '添加银行卡',
          },
        },
        {
          path: 'myWallet/index',
          type: 'page',
          layout: 'default',
          name: 'myWallet',
          style: {
            navigationBarTitleText: '我的收益',
          },
        },
        {
          path: 'myPoints/index',
          type: 'page',
          layout: 'default',
          name: 'myPoints',
          style: {
            navigationBarTitleText: '我的积分',
          },
        },
        {
          path: 'taking/index',
          type: 'page',
          layout: 'default',
          name: 'taking',
          style: {
            navigationBarTitleText: '我的钱包',
          },
        },
        {
          path: 'extractSuccess/index',
          type: 'page',
          layout: 'default',
          name: 'extractSuccess',
          style: {
            navigationBarTitleText: '提现完成',
          },
        },
        {
          path: 'authManage/index',
          type: 'page',
          layout: 'default',
          name: 'authManage',
          style: {
            navigationBarTitleText: '实名认证',
          },
        },
        {
          path: 'companyAuth/index',
          type: 'page',
          layout: 'default',
          name: 'companyAuth',
          style: {
            navigationBarTitleText: '公司认证',
          },
        },
        {
          path: 'personalAuth/index',
          type: 'page',
          layout: 'default',
          name: 'personalAuth',
          style: {
            navigationBarTitleText: '个人认证',
          },
        },
        {
          path: 'myTeam/index',
          type: 'page',
          layout: 'default',
          name: 'myTeam',
          style: {
            navigationBarTitleText: '我的团队',
          },
        },
        {
          path: 'myteamAdd/index',
          type: 'page',
          layout: 'default',
          name: 'myteamAdd',
          style: {
            navigationBarTitleText: '申请开通',
          },
        },
        {
          path: 'setupPage/index',
          type: 'page',
          layout: 'default',
          name: 'setupPage',
          style: {
            navigationBarTitleText: '设置',
          },
        },
        {
          path: 'myAccount/index',
          type: 'page',
          layout: 'default',
          name: 'myAccount',
          style: {
            navigationBarTitleText: '对公账户信息',
          },
        },
      ],
    },
  ],
  // preloadRule: {
  //   'pagesA/list/list': {
  //     network: 'all',
  //     packages: ['__APP__'],
  //   },
  // },
})
