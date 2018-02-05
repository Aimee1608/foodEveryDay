// pages/select/select.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchNameArr:
        [
            
            //{   class_name:'大家都爱搜',
            //    classArr:[
            //        {
            //            id:1,
            //            keywords:'年夜饭'
            //        },
            //        {
            //            id: 1,
            //            keywords: '热门菜谱榜'
            //        },
            //        {
            //            id: 1,
            //            keywords: '汤'
            //        },
            //        {
            //            id: 1,
            //            keywords: '蛋糕'
            //        },
            //        {
            //            id: 1,
            //            keywords: '早餐'
            //        },
            //        {
            //            id: 1,
            //            keywords: '豆腐'
            //        }
            //    ]
            //}, {
            //    class_name: '大家都爱搜',
            //    classArr:[
            //        {
            //            id: 1,
            //            keywords: '排骨'
            //        },
            //        {
            //            id: 1,
            //            keywords: '虾'
            //        },
            //        {
            //            id: 1,
            //            keywords: '鸡'
            //        },
            //        {
            //            id: 1,
            //            keywords: '牛肉'
            //        },
            //        {
            //            id: 1,
            //            keywords: '鱼'
            //        },
            //        {
            //            id: 1,
            //            keywords: '羊肉'
            //        }
            //    ]
            //}, {
            //        class_name: '大家都爱搜',
            //        classArr: [
            //        {
            //            id: 1,
            //            keywords: '山药'
            //        },
            //        {
            //            id: 1,
            //            keywords: '鸡蛋'
            //        },
            //        {
            //            id: 1,
            //            keywords: '白菜'
            //        },
            //        {
            //            id: 1,
            //            keywords: '藕'
            //        },
            //        {
            //            id: 1,
            //            keywords: '萝卜'
            //        },
            //        {
            //            id: 1,
            //            keywords: '金针菇'
            //        }
            //        ]
            //}, {
            //        class_name: '大家都爱搜',
            //        classArr:[
            //        {
            //            id: 1,
            //            keywords: '牛轧糖'
            //        },
            //        {
            //            id: 1,
            //            keywords: '蛋挞'
            //        },
            //        {
            //            id: 1,
            //            keywords: '粥'
            //        },
            //        {
            //            id: 1,
            //            keywords: '凉菜'
            //        },
            //        {
            //            id: 1,
            //            keywords: '披萨'
            //        },
            //        {
            //            id: 1,
            //            keywords: '面条'
            //        }
            //        ]
            //}, {
            //        class_name: '大家都爱搜',
            //        classArr: [
            //        {
            //            id: 1,
            //            keywords: '威风蛋糕'
            //        },
            //        {
            //            id: 1,
            //            keywords: '曲奇'
            //        },
            //        {
            //            id: 1,
            //            keywords: '蛋糕卷'
            //        },
            //        {
            //            id: 1,
            //            keywords: '布丁'
            //        },
            //        {
            //            id: 1,
            //            keywords: '提拉米苏'
            //        },
            //        {
            //            id: 1,
            //            keywords: '吐司'
            //        }
            //    ]
            //}
        ]
        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
          url:  app.localUrl+'food/class_list',
          method: 'GET',
          // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
              // success
              // console.log('分类', res);
              if (res.data.code == 1001) {
                  var arr = res.data.data;
                  var ListArr = [];
                  if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                      if (arr[i].class_names.length > 0) {
                          var material = [];
                          for (var n = 0; n < arr[i].class_names.length; n++) {
                            material.push({ 'id': arr[i].class_names[n].id, 'keywords': arr[i].class_names[n].class_name, 'image': arr[i].class_names[n].image});
                          }
        
                      }
                      ListArr.push({
                          class_name:arr[i].class_name,
                          classArr:material
                      });
                  }
                  //console.log(ListArr);
                  that.setData({
                      searchNameArr: ListArr
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
          path: '/pages/select/select',
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