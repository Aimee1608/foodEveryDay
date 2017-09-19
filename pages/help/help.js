// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var openid = wx.getStorageSync('openid');
      if (openid) {
          this.setData({
              userInfo: wx.getStorageSync('userInfo')
          });
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
  onShareAppMessage: function () {
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
  }
})