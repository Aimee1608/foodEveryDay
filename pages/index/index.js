//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    swiper:{
      imgUrls: [
          {
              id:1,
              img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
              id: 1,
              img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
          },
          {
              id: 1,
              img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          },
          {
              id: 1,
              img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          } 
      ],
      indicatorDots: true,//是否显示面板指示点
      indicatorColor:'rgba(249,245,236,0.6)',
      indicatorActiveColor:'#FFCC66',
      autoplay: true,//是否自动切换
      interval: 3000,//自动切换时间间隔
      duration: 500,//滑动动画时长
      circular: true//是否自动切换
    },
    todayListArr:[
      //{
      //  img: '../img/1.jpg',
      //  name: '西红柿牛腩',
      //  id: 1
      //}
    ],
    newListArr:[],
    pageId:1,
    isLoading:false,//正在加载中
    noMore:false,//是否还有更多数据
    init:true
  },  //事件处理函数
  /**
   * 列表 获取更多
   * ***/
  getList:function(that,noMore,pageId){
      if(that.data.init){
            wx.request({
                url:app.localUrl+'food/GetFocus',
                method: 'GET',
                // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    // success
                    console.log('焦点图',res);
                    if(res.data.code==1001){
                        var arr = res.data.data;
                        if (arr.length > 0) {
                            that.setData({
                                'swiper.imgUrls': arr,
                                init:false
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
            });
            wx.request({
                url: app.localUrl + 'food/Recommend',//audit/IndexShowList
                data: {
                    pageId: pageId
                },
                // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function (res) {
                    // success
                    console.log('列表', res);

                    if (res.data.code == 1001) {
                        var arr = res.data.data;
                        var ListArr = [];
                        if (arr.length > 0) {
                            for (var i = 0; i < arr.length; i++) {
                                ListArr.push({
                                    img: arr[i].img,
                                    name: arr[i].name,
                                    id: arr[i].id
                                });
                            }
                            that.setData({
                                todayListArr: ListArr,
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
      if(!noMore){
           console.log(pageId);
          wx.request({
              url: app.localUrl + 'food/IndexShowList',//audit/IndexShowList
              data:{
                  pageId:pageId
              },
              // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              success: function (res) {
                  // success
                  console.log('列表', res);

                  if (res.data.code == 1001) {
                      var arr = res.data.data;
                      var ListArr = that.data.newListArr;
                      if (arr.length > 0) {
                          for (var i = 0; i < arr.length; i++) {
                              ListArr.push({
                                  img: arr[i].img,
                                  name: arr[i].name,
                                  id: arr[i].id
                              });
                          }
                          if (arr.length < 10) {
                              that.setData({
                                  newListArr: ListArr,
                                  pageId: arr[arr.length-1].id,
                                  noMore:true
                              })
                          }else{
                              that.setData({
                                  newListArr: ListArr,
                                  pageId: arr[arr.length-1].id,
                                  noMore: false
                              })
                          }
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
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
      var that = this;
      /**加载列表数据**/
      that.getList(that,that.data.noMore,that.data.pageId);
    
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
      var that = this;
      console.log('下拉刷新');
      var openid = wx.getStorageSync('openid');
      if(openid){
          wx.showLoading({
              title: '刷新中'
          });
          var timer = setTimeout(function () {
              console.log(888);
              that.setData({
                  pageId:1,
                  noMore:false,
                  newListArr:[],
                  'swiper.imgUrls':[],
                  init:true
              });
              wx.hideLoading();
              that.getList(that,that.data.noMore,that.data.pageId);
              wx.stopPullDownRefresh(); //停止下拉刷新
              clearTimeout(timer);
          }, 500)
      }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var that = this;
      if(!this.data.noMore){
          console.log('circle 下一页');
          this.setData({
              isLoading: true
          });
          wx.showLoading({
              title: '加载中'
          });

          var timer = setTimeout(function () {
              console.log(888);
              that.setData({
                  isLoading: false
              });
              /**上拉加载更多数据**/
              that.getList(that,that.data.noMore,that.data.pageId);
              wx.hideLoading();
              clearTimeout(timer);
          }, 1000)
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return {
          title: '咿咕噜开启你的美味生活！',
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
