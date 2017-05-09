//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    headstr: null,
    yan: 7,
    strings: ['先输入四字题目', '然后点击开始按钮'],
    head_default: '藏头诗题',
    ajax_in_progress: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindYanChange: function (e) {
    this.setData({
      yan: e.detail.value ? 7 : 5,
    });
  },
  bindHeadstrInput: function (e) {
    this.setData({
      headstr: e.detail.value,
    })
  },
  bindSubmitText: function () {
    if (this.ajax_in_progress) return;
    var headstr = this.data.headstr || this.data.head_default;
    var yan = this.data.yan;
    wx.showToast({
      title: "正在为您创作...\n可能要数十秒",
      icon: "loading",
      duration: 600000
    });
    this.setData({
      ajax_in_progress: true,
    });
    var apiurl = 'https://dsa.cs.tsinghua.edu.cn/~yuan/shared/site/proxy.php/http://60.205.170.105:8000/poem/api/';
    var action = 'head';
    var that = this;
    wx.request({
      url: apiurl + action + '/', //仅为示例，并非真实的接口地址
      data: {
        yan: yan,
        headstr: headstr,
      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        that.setData({
          motto: 'ajax success',
        });
        var data = res.data;
        if (data.error) {
          that.setData({
            strings: ['错误', data.msg],
          });
        } else {
          that.setData({
            strings: data.msg[0],
          });
        }
        wx.hideToast();
        that.setData({
          ajax_in_progress: false,
        });
      },
      fail: function (res) {
        that.setData({
          motto: 'ajax fail',
        });
        that.setData({
          strings: ['服务器错误，', '请稍候再试'],
        });
        wx.hideToast();
        that.setData({
          ajax_in_progress: false,
        });
      }
    })
  },
  onLoad: function () {
    console.log('onLoad');
  }
})
