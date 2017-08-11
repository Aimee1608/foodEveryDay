//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    //that.globalData.login = false;
    //that.globalData.login = true;
    if(this.globalData.userInfo&&that.globalData.login){
      typeof cb == "function" && cb(this.globalData.userInfo)

    }else{
      //调用登录接口
      wx.login({
        success: function (msg) {
          console.log(msg);
          if(msg.code){
            if(that.globalData.login==false){
              wx.openSetting({
                success: function (data) {
                  if(data) {
                    if (data.authSetting["scope.userInfo"] == true) {
                      //loginStatus = true;
                      wx.getUserInfo({
                        withCredentials: false,
                        success: function (res) {
                          that.globalData.userInfo = res.userInfo;
                          typeof cb == "function" && cb(that.globalData.userInfo);
                          that.globalData.login = true;
                        },
                        fail: function (res) {
                          that.globalData.login = false;
                          console.log('二次失败',res);
                          wx.reLaunch({
                            url: '../index/index'
                          });
                          //wx.navigateBack({
                          //  delta: 1
                          //})

                        }
                      });
                    }else{
                      that.globalData.login = false;
                      console.log('二次失败02');
                      wx.reLaunch({
                        url: '../index/index'
                      });
                    }
                  }
                },
                fail: function () {
                  console.info("设置失败返回数据");
                  //wx.reLaunch({
                  //    url: '../index/index'
                  //});
                }       });
            }else{
              wx.getUserInfo({
                success: function (res) {
                  console.log(res);
                  that.globalData.userInfo = res.userInfo;
                  typeof cb == "function" && cb(that.globalData.userInfo);
                  that.globalData.login = true;
                  //  wx.request({
                  //    url:'',
                  //    data:{
                  //      code:msg.code
                  //    },
                  //    success:function(res){
                  //
                  //    }
                  //  })
                },fail:function(msg){
                  that.globalData.login = false;
                  console.log(msg);

                  //wx.navigateBack({
                  //  delta: 1
                  //})
                  wx.reLaunch({
                    url: '../index/index'
                  });
                  //wx.switchTab({
                  //  url: '../index/index'
                  //})
                }
              })
            }


          }

        },
        fail:function(res){
          console.log(res);
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})