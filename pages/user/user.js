// pages/user/user.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:'',
      openid:null,
      isLogin:false,
      isManager:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var openid = wx.getStorageSync('openid');
      if(openid){
          this.setData({
              userInfo: wx.getStorageSync('userInfo'),
              isLogin: true,
              isManager:wx.getStorageSync('isManager')
          });
      }else{
          this.setData({
              isLogin: false
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
  onShareAppMessage: function (res) {
      return {
          title: '美食美荟开启你的美味生活！',
          path: '/pages/index/index',
          imageUrl:'../img/share.png',
          success: function(msg) {
              // 转发成功
              console.log(msg)
          },
          fail: function(msg) {
              // 转发失败
              console.log(msg)
          }
      }
  },
  //登录
  loginFun: function (e) {
    var that = this;
    if (!e.detail.userInfo) {
      return false
    }
    //调用应用实例的方法获取全局数据
    app.getOpenid(e.detail.userInfo,function (userInfo) {
          //更新数据
          //   console.log(userInfo);
          if (app.globalData.login){
              that.setData({
                  userInfo: userInfo,
                  isLogin: true,
                  isManager: wx.getStorageSync('isManager')
              });
          }else{
              that.setData({
                  isLogin: false
              })
          }
      })
  }
})