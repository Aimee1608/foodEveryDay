// pages/addFood/addFood.js

Page({

  /**
   * 页面的初始数据
   */
    data: {
      array: ['10分钟以内', '10-20分钟', '30分钟-1小时', '1-2小时','2小时以上'],
      index:0,
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
      cidIndex:1,
      uploadObj:{
          author:'',
          complexity:'较易',
          describe:'就安静安静家啊',
          handle_time:'30分钟-1小时',
          img:'../img/imgB.png',
          name:'jajaj',
          tip:'jajajja',
          inventory:[],
          step:'',
          thumbnail:[]
      },
      loadImgB:'../img/imgM.png',
      isLoad:false,
      isInventory:false,
      totalKeyInput01:0,
      totalKeyInput02:0,
      totalKeyInput03:0,
      totalKeyInput04:0,
  },
    bindPickerChange: function (e) {
        console.log('时间picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {

        var cid = this.data.multiArray[1][e.detail.value[1]].id;
        console.log('picker发送选择改变，携带值为', e.detail.value,cid);
        this.setData({
            multiIndex: e.detail.value,
            cid:this.data.cid
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        data.multiArray[1] = this.data.searchNameArr[this.data.multiIndex[0]].class_names;
        console.log(data.multiIndex);
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
      var that = this;
      wx.chooseImage({
          count:1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              var tempFiles = res.tempFiles;
              console.log(tempFiles,res.tempFilePaths);
              wx.uploadFile({
                  url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/webfood/uploadProjectImage', //仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  name: 'file',
                  header: {
                      'content-type':'multipart/form-data'
                  },
                  formData:{
                      'user': 'test'
                  },
                  success: function(msg){
                      var json = JSON.parse(msg.data);
                      console.log(json);
                      if(json.status==1){
                          that.setData({
                              'uploadObj.img':'https://h5php.xingyuanauto.com/food/public/upload/testfile/'+json.image_name
                          });
                      }

                      //do something
                  }
              })
          }
      })
  },
    /**上传多张图片**/
    loadThumbnailImg:function(){
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var tempFiles = res.tempFiles;

                console.log(tempFiles,res.tempFilePaths);

                if(tempFilePaths.length>0){
                    for(var i=0;i<tempFilePaths.length;i++){
                        console.log(tempFilePaths[i]);
                        upload_file(tempFilePaths[i]);
                    }
                }
                function upload_file(itemUrl){
                    wx.uploadFile({
                        url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/webfood/zyupload', //仅为示例，非真实的接口地址
                        filePath: itemUrl,
                        name: 'name',
                        header: {
                            'content-type': 'multipart/form-data'
                        }, // 设置请求的 header
                        formData:{
                            'user': 'test'
                        },
                        success: function(msg){
                            var json = JSON.parse(msg.data);
                            console.log(json,json.data[0]);
                            var arr = that.data.uploadObj.thumbnail;
                            arr = arr.push(json.data[0]);
                            that.setData({
                                'uploadObj.thumbnail':arr,
                                isLoad:true
                            });
                        }
                    })
                }

            }
        })
    },
    /**清楚上传的图片**/
    clearImg:function(event){
        var that = this;
        var arr = that.data.uploadObj.thumbnail;
        arr.splice(event.target.dataset.index,1);
        if(arr.length<1){
            that.setData({
                'uploadObj.thumbnail':arr,
                isLoad:false
            });
        }else{
            that.setData({
                'uploadObj.thumbnail':arr
            });
        }
    },
    addInventory:function(){
        var that = this;
        var arr = that.data.uploadObj.inventory;
        arr.push({food_how:'',food_name:''});
        that.setData({
            'uploadObj.inventory':arr,
            isInventory:true
        });
    },
    clearInventory:function(event){
        var that = this;
        var arr = that.data.uploadObj.inventory;
        arr.splice(event.target.dataset.index,1);
        if(arr.length<1){
            that.setData({
                'uploadObj.inventory':arr,
                isInventory:false
            });
        }else{
            that.setData({
                'uploadObj.inventory':arr
            });
        }
    },
    radioChange:function(event){
        console.log('radio发生change事件，携带value值为：', event.detail.value)
    },
    bindKeyInput01:function(e){
        this.setData({
            totalKeyInput01: e.detail.value.length
        });
    },
    bindKeyInput02:function(e){
        this.setData({
            totalKeyInput02: e.detail.value.length
        });
    },
    bindKeyInput03:function(e){
        this.setData({
            totalKeyInput03: e.detail.value.length
        });
    },
    bindKeyInput04:function(e){
        this.setData({
            totalKeyInput04: e.detail.value.length
        });
    }
})