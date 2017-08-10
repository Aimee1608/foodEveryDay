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
      var that =  this;
      console.log(options);
      if (options.keywordsId){
          wx.request({
              url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/food/show_list',
              method: 'POST',
              data:{'class_id':options.keywordsId},
              // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                  // success
                  console.log('焦点图', res);
                  if (res.data.code == 1001) {
                      var arr = res.data.data;
                      var ListArr = [];
                      if (arr.length > 0) {
                          for (var i = 0; i < arr.length; i++) {
                              if (arr[i].inventory.length>0){
                                  var material = [];
                                  for(var n = 0;n<arr[i].inventory.length;n++){
                                      material.push(arr[i].inventory[n].food_name);
                                  }
                                  material = material.join(' ');
                              }
                              ListArr.push({
                                  id: arr[i].id,
                                  imgUrl: arr[i].img,
                                  title: arr[i].name,
                                  material: material,
                                  author: arr[i].author,
                                  save: arr[i].collect!=null?arr[i].collect:0,
                                  like: arr[i].user_like != null ? arr[i].user_like : 0
                              });
                          }
                          console.log(ListArr);
                          that.setData({
                              searchListArr: ListArr
                          })
                      }

                  }
              },
              fail: function (res) {
                  // fail
                  console.log(res);
              },
              complete: function () {
                  // complete

              }
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