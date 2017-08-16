// pages/detailFood/detailFood.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    detail:{
        id:1,
        img:'../img/food.png',
        name:'香煎辣排骨',
        author:'小芊',
        collect:888,
        like:959,
        describe:'排骨绝对是人见人爱的美味佳肴，丰富的蛋白质、维生素以及骨胶原深受到女性的青睐，不管是红烧，糖醋还是清炒，味道都很赞。',
        complexity:'一般',
        handle_time:'60分钟',
        inventory: [
            {
             food_name:'辣花生',
             food_how:50
            }
        ],
        step:[
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫'
        ],
        thumbnail: [
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png'
        ],
        tip:'家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊'
    },
    addLike:{
        add:0,
        url: '../img/like0.png'
    },
    addSave:{
        add: 0,
        url: '../img/save0.png'
    },
    foodId:null,
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      console.log(options, wx.getStorageSync('openid'));
      if(options.id!=null){
          that.data.foodId = options.id;
          wx.request({
              url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/food/FoodInfoData',
              method: 'GET',
              data: { id: that.data.foodId,openid: wx.getStorageSync('openid')},
              // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                  // success
                  console.log('菜谱详情', res);
                  if (res.data.code == 1001) {
                      var obj = res.data.data;
                    
                      if (obj!=null){
                          var ListArr = {
                                  id: obj.id,
                                  img:obj.img,
                                  name:obj.name,
                                  author:obj.author!=null?obj.author:'未知',
                                  collect:obj.collect!=null?obj.collect:0,
                                  like:obj.like!=null?obj.like:0,
                                  describe:obj.describe,
                                  complexity:obj.complexity,
                                  handle_time:obj.handle_time,
                                  inventory:obj.inventory,
                                  step:obj.step,
                                  thumbnail:obj.thumbnail,
                                  tip:obj.tip
                              };
                          //console.log(obj.step);
                          //console.log(ListArr);
                          that.setData({
                              'addLike.add':obj.user_like_start,
                              'addLike.url':'../img/like'+obj.user_like_start+'.png',
                              'addSave.add':obj.collect_start,
                              'addSave.url':'../img/save'+obj.collect_start+'.png',
                              detail:ListArr
                              //   'swiper.imgUrls': ListArr
                          });
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
  saveLikeFun:function(type,add){
      var that = this;
      if(wx.getStorageSync('openid')){
            var url=null;//请求路径
            var img01=null;//取消点赞
            var img02 = null;//点赞
            var obj=null;
            if(type=='like'){
                url='https://h5php.xingyuanauto.com/food/public/index.php/port/food/UserLike';
                img01 = '../img/like0.png';
                img02 = '../img/like1.png';
                if(add==1){
                    obj={
                        addLike: {
                            add:0,
                            url: img01
                            }
                    }

                }else{
                    obj={
                        addLike: {
                            add:1,
                            url: img02
                        }
                    }
                }
            }else if(type=='save'){
                url='https://h5php.xingyuanauto.com/food/public/index.php/port/food/UserCollect';
                img01 = '../img/save0.png';
                img02 = '../img/save1.png';
                if(add==1){
                    obj={
                        addSave:{
                            add:0,
                            url: img01
                        }
                    }
                }else{
                    obj={
                        addSave:{
                            add:1,
                            url: img02
                        }
                    }
                }
            }
              wx.request({/**用户点赞**/
              url: url,
                  data: {
                      f_id:that.data.foodId,
                      openid:wx.getStorageSync('openid')
                  },
                  success: function (lastData) {
                      console.log('点赞收藏',lastData);
                      if(lastData.data.code==1001){
                          that.setData(obj);
                          wx.showLoading({
                              title: '提交成功'
                          });
                          setTimeout(function () {
                              wx.hideLoading();
                          }, 500)
                      }
                  }
              })
      }else{
          app.getUserInfo(function (userInfo) {});
      }
  },
  funLike:function(){
      var add = this.data.addLike.add;
      this.saveLikeFun('like',add);

  },
  funSave: function () {
      var add = this.data.addSave.add;
      this.saveLikeFun('save',add);
  }
})