// pages/userList/editFood.js
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    searchListArr: [
      //{
      //  id: 1,
      //  img: '../img/1.jpg',
      //  name: '西红柿炖牛腩',
      //  material:'牛腩 西红柿 土豆 胡萝卜',
      //  author:'小芊',
      //  collect:888,
      //  user_like:999
      //}
    ],
    totalCollect:0,
    isLoading: false,//正在加载中
    noMore: false,//是否还有更多数据
    openid:null,
    pageId:1,
    isRefresh:false,
    isDelete:false,
    deleteText:'删除',
    isHandle:'pass',
    auditStart:1
  },
  //事件处理函数
  getList: function (that, audit_start,pageId,openid){
      if (pageId != null && audit_start!=null){

      console.log({pageId:pageId,audit_start:audit_start});
      wx.request({
          url: app.localUrl + 'audit/AuditList',
          data: { pageId: pageId, audit_start: audit_start,openid:openid},
        // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          // success
          console.log('发布作品列表'+audit_start, res);
          if (res.data.code == 1001) {
            var arr = res.data.data.DataArr;
            var ListArr = that.data.searchListArr;
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
                  img: arr[i].img,
                  name: arr[i].name,
                  material: material,
                  author: arr[i].author,
                  time:arr[i].time
                });
              }
              //console.log(ListArr);
              if(arr.length<10){
                that.setData({
                  searchListArr: ListArr,
                  pageId:arr[arr.length-1].id,
                  totalCollect:res.data.data.count,
                  noMore:true
                })
              }else{
                that.setData({
                  searchListArr: ListArr,
                  pageId:arr[arr.length-1].id,
                  totalCollect:res.data.data.count,
                  noMore:false
                })
              }

            }

          }else if(res.data.code==1004){
            that.setData({
              noMore:true
            })
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
    var openid = wx.getStorageSync('openid');
    if(openid){
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      });
      that.getList(that, that.data.auditStart, that.data.pageId, wx.getStorageSync('openid'));
    }else{
      wx:wx.reLaunch({
          url: '../user/user'
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
          searchListArr:[]
        });
        wx.hideLoading();
        that.getList(that, that.data.auditStart, that.data.pageId, wx.getStorageSync('openid'));
        wx.stopPullDownRefresh(); //停止下拉刷新
        clearTimeout(timer);
      }, 500)
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.noMore) {
      var that = this;
      console.log('circle 下一页');
      this.setData({
        isLoading: true
      });
      var timer = setTimeout(function () {
        console.log(888);
        that.setData({
          isLoading: false
        });

        that.getList(that, that.data.auditStart, that.data.pageId, wx.getStorageSync('openid'));
        clearTimeout(timer);
      }, 500)
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
  },
  deleteHandle:function(){
    if(this.data.isDelete){
      this.setData({
         isDelete:false,
        deleteText:'删除'
      });
    }else{
      this.setData({
        isDelete:true,
        deleteText:'完成'
      });
    }
  },
  deleteFun:function(e){
    console.log(e);
    var that = this;
    var id = e.target.dataset.id;
    wx.request({
      url:  app.localUrl+'webfood/UserMenuDel',
      data:{id:id,openid:wx.getStorageSync('openid')},
      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            pageId:1,
            searchListArr:[]
          });
          that.getList(that, that.data.auditStart, that.data.pageId, wx.getStorageSync('openid'));
        }

      }
    })
  },
  changeFun:function(handleName,start){
      var that = this;
      that.setData({
          isHandle: handleName,
          searchListArr: [
              //{
              //  id: 1,
              //  img: '../img/1.jpg',
              //  name: '西红柿炖牛腩',
              //  material:'牛腩 西红柿 土豆 胡萝卜',
              //  author:'小芊',
              //  collect:888,
              //  user_like:999
              //}
          ],
          totalCollect: 0,
          isLoading: false,//正在加载中
          noMore: false,//是否还有更多数据
          pageId: 1,
          isRefresh: false,
          isDelete: false,
          deleteText: '删除',
          isHandle: handleName,
          auditStart:start
          
      });
      that.getList(that, that.data.auditStart, that.data.pageId, wx.getStorageSync('openid'));
  },
  passFun:function(){
      this.changeFun('pass',1);
  },
  failedFun:function(){
      this.changeFun('failed', 2);
  },
  checkFun:function(){
      this.changeFun('check', 0);
  }
})