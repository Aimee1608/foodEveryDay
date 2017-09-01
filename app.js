//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // console.log('logs',logs);
  },
  getUserInfo:function(cb){
      var that = this;
     //调用登录接口
      function getOpenid(backMsg){
        that.globalData.userInfo = backMsg.userInfo;
        that.globalData.encryptedData = backMsg.encryptedData;
        that.globalData.iv = backMsg.iv;
        that.globalData.login = true;
        console.log(that.globalData.code);
        wx.request({/**通过code获取openid**/
          url:that.localUrl+'Login/sendCodeLogin',
          data:{
            code:that.globalData.code,
            encryptedData: backMsg.encryptedData,
            iv:backMsg.iv
          },
          success:function(openData){
            console.log('返回openid',openData,openData.data);
            if(openData.data.code==1001){
              that.globalData.openid = openData.data.data.openid;
              wx.setStorageSync('openid',that.globalData.openid);
              wx.setStorageSync('userInfo',that.globalData.userInfo);
              wx.setStorageSync('isManager', openData.data.data.isManager);
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 500
              });
              typeof cb == "function" && cb(that.globalData.userInfo);
            }else{
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
      wx.login({
        success: function (msg) {
          console.log('code',msg);
          if(msg.code){
            that.globalData.code = msg.code;
            if(that.globalData.login==false){
              wx.openSetting({
                success: function (data) {
                  if(data) {
                    if (data.authSetting["scope.userInfo"] == true) {
                      //loginStatus = true;
                      wx.getUserInfo({
                        withCredentials: false,
                        success: function (res) {
                            console.log('第二次成功',res);
                            getOpenid(res);
                          
                        },
                        fail: function (res) {
                          that.globalData.login = false;
                          console.log('二次失败',res);
                        }
                      });
                    }else{
                      that.globalData.login = false;
                      console.log('二次失败02');
                    }
                  }
                },
                fail: function () {
                  console.info("设置失败返回数据");

                }
              });
            }else{
              wx.getUserInfo({/**获取用户信息**/
                success: function (res) {
                  console.log('第一次成功',res);
                  getOpenid(res);
                },fail:function(msg){
                  that.globalData.login = false;
                  console.log('第一次失败',msg);
                }
              })
            }
          }
        },
        fail:function(res){
          console.log(res);
        }
      })
    
  },
  globalData:{
    userInfo:null,
    encryptedData:null,
    iv:null,
    openid:null,
    code:null
  },
  localUrl:'https://h5php.xingyuanauto.com/food/public/index.php/port/'
});