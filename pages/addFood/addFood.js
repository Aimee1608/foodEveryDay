// pages/addFood/addFood.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchNameArr:'',
      multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],
      objectMultiArray: [
          [
              {
                  id: 0,
                  name: '无脊柱动物'
              },
              {
                  id: 1,
                  name: '脊柱动物'
              }
          ], [
              {
                  id: 0,
                  name: '扁性动物'
              },
              {
                  id: 1,
                  name: '线形动物'
              },
              {
                  id: 2,
                  name: '环节动物'
              },
              {
                  id: 3,
                  name: '软体动物'
              },
              {
                  id: 4,
                  name: '节肢动物'
              }
          ]
      ],
      multiIndex: [0, 0],
      cid:'',
      cidIndex:1
  },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex,
            cid:this.data.cid
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        data.multiArray[1] = this.data.searchNameArr[this.data.multiIndex[0]].class_names;
        data.cid = this.data.searchNameArr[this.data.multiIndex[0]].class_names[e.detail.value].id;
        console.log(data.multiIndex,data.cid);
        this.setData(data);         
       
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
          url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/food/class_list',
          method: 'GET',
          // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
              // success
              console.log('添加菜单分类', res);
              if (res.data.code == 1001) {
                  var arr = res.data.data;
                  if (arr.length > 0) {
                      var parrlist = [];
                      //console.log(ListArr);
                      for(var i=0;i<arr.length;i++){
                        parrlist.push({id:arr.id,class_name:arr[i].class_name});
                      }
                      that.setData({
                          searchNameArr: arr,
                          parrlist:parrlist,
                          multiArray:[parrlist,arr[0].class_names]
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
  
  },
  /**
   * 用户点击右上角分享
   */
  loadBigImg:function(){
      wx.chooseImage({
          success: function (res) {
              wx.getImageInfo({
                  src: res.tempFilePaths[0],
                  success: function (res) {
                      console.log(res.width)
                      console.log(res.height)
                  }
              })
          }
      })
  }
})