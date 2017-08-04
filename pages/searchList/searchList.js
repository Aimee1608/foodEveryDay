// pages/searchList/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchListArr:[
      {
        id: 1,
        imgUrl: '../img/1.jpg',
        title: '西红柿炖牛腩',
        material:'牛腩 西红柿 土豆 胡萝卜',
        author:'小芊',
        save:888,
        like:999
      },
      {
        id: 1,
        imgUrl: '../img/1.jpg',
        title: '西红柿炖牛腩',
        material: '牛腩 西红柿 土豆 胡萝卜',
        author: '小芊',
        save: 888,
        like: 999
      },
      {
        id: 1,
        imgUrl: '../img/1.jpg',
        title: '西红柿炖牛腩',
        material: '牛腩 西红柿 土豆 胡萝卜',
        author: '小芊',
        save: 888,
        like: 999
      },
      {
        id: 1,
        imgUrl: '../img/1.jpg',
        title: '西红柿炖牛腩',
        material: '牛腩 西红柿 土豆 胡萝卜',
        author: '小芊',
        save: 888,
        like: 999
      }
    ],
    isLoading: false,//正在加载中
    noMore: false//是否还有更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
      if (!this.data.noMore) {
          var that = this;
          console.log('circle 下一页');
          this.setData({
              isLoading: true
          })
          var timer = setTimeout(function () {
              console.log(888);
              that.setData({
                  isLoading: false
              })
              clearTimeout(timer);
          }, 1000)
      }


      //   wx.request({
      //       url: '',
      //       data: {},
      //       method: 'GET',
      //       // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //       // header: {}, // 设置请求的 header
      //       success: function (res) {
      //           // success
      //       },
      //       fail: function () {
      //           // fail
      //       },
      //       complete: function () {
      //           // complete
      //           wx.hideNavigationBarLoading() //完成停止加载
      //           wx.stopPullDownRefresh() //停止下拉刷新
      //       }
      //   })
  }
})