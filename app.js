//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // console.log('logs',logs);
  },
  getOpenid:function(backMsg,callback){
    var that = this;
     //调用登录接口
    that.globalData.userInfo = backMsg.userInfo;
    that.globalData.encryptedData = backMsg.encryptedData;
    that.globalData.iv = backMsg.iv;        
    // console.log(that.globalData.code);
    wx.login({
        success: function (msg) {
          // console.log('code',msg);
          if(msg.code){
            that.globalData.code = msg.code;
            wx.request({/**通过code获取openid**/
              url: that.localUrl + 'Login/sendCodeLogin',
              data: {
                code: that.globalData.code,
                encryptedData: backMsg.encryptedData,
                iv: backMsg.iv
              },
              success: function (openData) {
                console.log('返回openid',openData,openData.data);
                var isNew = typeof openData.data == 'string';
                if (isNew) {
                  var ResultUserData = JSON.parse(openData.data.trim());
                } else {
                  var ResultUserData = openData.data;
                }
                // console.log('返回openid', openData, ResultUserData);
                if (ResultUserData.code == 1001) {
                  that.globalData.openid = ResultUserData.data.openid;
                  wx.setStorageSync('openid', that.globalData.openid);
                  wx.setStorageSync('userInfo', that.globalData.userInfo);
                  wx.setStorageSync('isManager', ResultUserData.data.isManager);
                  that.globalData.login = true;
                  typeof callback == "function" && callback(that.globalData.userInfo);
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 500
                  });
                } else {
                  that.globalData.login = false
                  wx.showLoading({
                    title: '登录失败'
                  });
                  setTimeout(function () {
                    wx.hideLoading();
                  }, 500)
                }
              }
            })
          }
        },
        fail:function(res){
          console.log(res);
        }
    })
  },
  getUserInfo:function(callback){
      var that = this;
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              withCredentials: true,
              success: function (wres) {
                console.log('授权过',wres)
                that.getOpenid(wres, callback);
              }
            })
          }else{
            console.log('没授权过')
          }
        }
      })
  },
  globalData:{
    userInfo:null,
    encryptedData:null,
    iv:null,
    openid:null,
    code:null,
    login: 'init'
  },
  localUrl:'https://h5php.xingyuanauto.com/FlowProject/food/public/index.php/port/'
});