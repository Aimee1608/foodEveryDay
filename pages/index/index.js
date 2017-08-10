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
              name: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
              id: 1,
              name: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
          },
          {
              id: 1,
              name: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          },
          {
              id: 1,
              name: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          } 
      ],
      indicatorDots: true,//是否显示面板指示点
      indicatorColor:'rgba(249,245,236,0.6)',
      indicatorActiveColor:'#FFCC66',
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 500,//滑动动画时长
      circular: true//是否自动切换
    },
    todayListArr:[
      {
        imgUrl:'../img/1.jpg',
        text:'西红柿牛腩',
        id:1
      }, 
      {
        imgUrl: '../img/1.jpg',
        text: '西红柿牛腩',
        id: 1
      },
      {
        imgUrl: '../img/1.jpg',
        text: '西红柿牛腩',
        id: 1
      }, 
      {
        imgUrl: '../img/1.jpg',
        text: '西红柿牛腩',
        id: 1
      },
      {
        imgUrl: '../img/1.jpg',
        text: '西红柿牛腩',
        id: 1
      },
      {
        imgUrl: '../img/1.jpg',
        text: '西红柿牛腩',
        id: 1
      },
      {
        imgUrl: '../img/1.jpg',
        text: '西红柿牛腩',
        id: 1
      }
    ],
    isLoading:false,//正在加载中
    noMore:true//是否还有更多数据
  },  //事件处理函数
  upper: function (e) {
      console.log('顶')
  },
  lower: function (e) {
      console.log('底')
  },
  scroll: function (e) {
      console.log(e)
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
      var that = this;
    wx.request({
        url:'https://h5php.xingyuanauto.com/food/public/index.php/port/food/GetFocus',
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
                var ListArr = [];
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        ListArr.push({
                            name: arr[i].img,
                            id: arr[i].id
                        });
                    }
                    console.log(ListArr);
                    that.setData({
                        'swiper.imgUrls': ListArr
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
    wx.request({
        url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/food/Recommend',
        method: 'GET',
        // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            // success
            console.log('列表',res);
            
            if(res.data.code==1001){
                var arr = res.data.data;
                var ListArr = [];
                if(arr.length>0){
                    for (var i = 0; i < arr.length; i++) {
                        ListArr.push({
                            imgUrl: arr[i].img,
                            text: arr[i].name,
                            id: arr[i].id});
                    }
                }
                
            }
            that.setData({
                todayListArr: ListArr
            })
        },
        fail: function (res) {
            // fail
            console.log(res);
        },
        complete: function () {
            // complete

        }
    })

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
  onReachBottom: function () {
      if(!this.data.noMore){
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
  }
  
})
