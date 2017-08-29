// pages/addFood/addFood.js

Page({

  /**
   * 页面的初始数据
   */
    data: {
      array: ['10分钟以内', '10-20分钟', '30分钟-1小时', '1-2小时','2小时以上'],//时间数组
      index:0,
      searchNameArr:'',
      multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],//分类的数组
      multiIndex: [0, 0],//分类当前选择大类小类
      uploadObj:{//上传到后台的总数据
          openid:'',//openid
          author:'',//作者名字
          complexity:'较易',//难易程度
          describe:'',//描述
          handle_time:'10分钟以内',//烹饪时间
          imgUrl:'../img/imgB.png',//上传前的主图路径
          img:'',//上传后的主图路径
          name:'',//菜品名字
          tip:'',//注意贴士
          inventory:[],//食材和数量
          step:'',//步骤
          class_id:1,//分类ID
          thumbnail:[],//步骤小图
          thumbnailReady:[]//上传前的步骤小图
      },
      loadImgB:'../img/imgM.png',//步骤小图提示
      isLoad:false,//是否上传了步骤图
      isInventory:false,//是否添加了分类步骤
      totalKeyInput01:0,//输入框长度-名字
      totalKeyInput02:0,//输入框长度-描述
      totalKeyInput03:0,//输入框长度-步骤
      totalKeyInput04:0//输入框长度-小贴士
  },
    /**难易程度的radiao事件**/
    radioChange:function(e){
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        this.setData({
            'uploadObj.complexity': e.detail.value
        })
    },
    /**烹饪时间选择的picker改变事件**/
    bindPickerChange: function (e) {
        console.log('时间picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            'uploadObj.handle_time': this.data.array[e.detail.value],
            index: e.detail.value
        })
    },
    /**分类选择的picker改变事件**/
    bindMultiPickerChange: function (e) {

        var cid = this.data.multiArray[1][e.detail.value[1]].id;
        console.log('picker发送选择改变，携带值为', e.detail.value,cid);
        this.setData({
            multiIndex: e.detail.value,
            'uploadObj.class_id':cid
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
      if(wx.getStorageSync('openid')){
          wx.request({
              url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/Webfood/UserMenuCount',
              method: 'GET',
              data:{openid:wx.getStorageSync('openid')},
              // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                  'content-type': 'application/json'
              },
              success: function (msg) {
                  console.log(msg);
                  if(msg.data.code==1001){
                      if(msg.data.data<3){

                          var userInfo = wx.getStorageSync('userInfo');
                          wx.request({/**获取分类**/
                          url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/food/class_list',
                              method: 'GET',
                              // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                              header: {
                                  'content-type': 'application/json'
                              },
                              success: function (res) {
                                  // success
                                  //console.log('添加菜单分类', res);
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
                                              multiArray:[parrlist,arr[0].class_names],
                                              'uploadObj.class_id':arr[0].class_names[0].id,
                                              'uploadObj.openid':wx.getStorageSync('openid'),
                                              'uploadObj.author':userInfo.nickName
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

                      }else{
                          wx.showModal({
                              title: '提示',
                              content: '一天总共能上传3个菜品，您已上传了3个',
                              showCancel: false,
                              success: function (data) {
                                  wx.switchTab({
                                      url: '../user/user'
                                  })
                              }
                          })

                      }

                  }else{
                      wx.showModal({
                          title: '提示',
                          content: '系统错误',
                          showCancel: false,
                          success: function (data) {
                              wx.switchTab({
                                  url: '../user/user'
                              })
                          }
                      })
                  }
              }
          });

      }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 上传大的主图
   */
  loadBigImg:function(){
      var that = this;
      wx.chooseImage({
          count:1,
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              var tempFiles = res.tempFiles;
              //console.log(tempFiles,res.tempFilePaths);
              that.setData({
                  'uploadObj.imgUrl':tempFilePaths[0]
              });

          }
      })
  },
    /**上传多张图片**/
    loadThumbnailImg:function(){
        var that = this;
        wx.chooseImage({
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = that.data.uploadObj.thumbnailReady;
                tempFilePaths = tempFilePaths.concat(res.tempFilePaths);
                //console.log(tempFilePaths);
                if(tempFilePaths.length>10){
                    wx.showModal({
                        title: '提示',
                        content: '最多只能上传10张',
                        showCancel:false,
                        success: function(res) {

                        }
                    })
                }else{
                    that.setData({
                        'uploadObj.thumbnailReady':tempFilePaths,
                        isLoad:true
                    });
                }



            }
        })
    },
    /**清楚上传的图片**/
    clearImg:function(event){
        var that = this;
        var arr = that.data.uploadObj.thumbnailReady;
        arr.splice(event.target.dataset.index,1);
        if(arr.length<1){
            that.setData({
                'uploadObj.thumbnailReady':arr,
                isLoad:false
            });
        }else{
            that.setData({
                'uploadObj.thumbnailReady':arr
            });
        }
    },
    /**添加食材清单**/
    addInventory:function(){
        var that = this;
        var arr = that.data.uploadObj.inventory;
        arr.push({food_how:'',food_name:''});
        that.setData({
            'uploadObj.inventory':arr,
            isInventory:true
        });
    },
    /**删除食材清单项**/
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
    /**绑定食材清单数量的输入数据**/
    inventoryInputhow:function(e){
        var that = this;
        var changeArr = that.data.uploadObj.inventory;
        changeArr[e.target.dataset.index].food_how=e.detail.value;
        this.setData({
            'uploadObj.inventory': changeArr
        });
    },
    /**绑定食材清单名字的输入数据**/
    inventoryInputname:function(e){
        var that = this;
        var changeArr = that.data.uploadObj.inventory;
        changeArr[e.target.dataset.index].food_name=e.detail.value;
        this.setData({
            'uploadObj.inventory': changeArr
        });
    },
    /**绑定名字的输入数据**/
    bindKeyInput01:function(e){
        this.setData({
            totalKeyInput01: e.detail.value.length,
            'uploadObj.name': e.detail.value
        });
    },
    /**绑定描述的输入数据**/
    bindKeyInput02:function(e){
        this.setData({
            totalKeyInput02: e.detail.value.length,
            'uploadObj.describe': e.detail.value
        });
    },
    /**绑定步骤的输入数据**/
    bindKeyInput03:function(e){
        this.setData({
            totalKeyInput03: e.detail.value.length,
            'uploadObj.step': e.detail.value
        });
    },
    /**绑定小贴士的输入数据**/
    bindKeyInput04:function(e){
        this.setData({
            totalKeyInput04: e.detail.value.length,
            'uploadObj.tip': e.detail.value
        });
    },
    /**提交验证**/
    checkReg:function(){
        var imgReg = false,
            describeReg=false,
            nameReg=false,
            tipReg=false,
            inventoryReg = false,
            stepReg = false,
            thumbnailReg = false;
        var that = this;
        function inputReg(data){
            var reg ;
            if(data!=''){
                reg = true;
            }else{
                reg = false;
            }
            return reg;
        }
        nameReg = inputReg(that.data.uploadObj.name);
        describeReg = inputReg(that.data.uploadObj.describe);
        stepReg = inputReg(that.data.uploadObj.step);
        tipReg = inputReg(that.data.uploadObj.tip);
        function foodReg(){
            var reg,inventory=that.data.uploadObj.inventory;
            if(inventory.length>0){
                for(var i=0;i<inventory.length;i++){
                    if(inventory[i].food_how!=''&&inventory[i].food_name!=''){
                        reg = true;
                    }else{
                        reg = false;
                        return reg;
                    }
                }
            }else{
                reg = false;
            }
            return reg;
        }
        inventoryReg = foodReg();
        if(that.data.uploadObj.imgUrl!=''&&that.data.uploadObj.imgUrl!='../img/imgB.png'){
            imgReg = true;
        }else{
            imgReg = false;
        }
        if(that.data.uploadObj.thumbnailReady.length>0){
            thumbnailReg = true;
        }else{
            thumbnailReg = false;
        }
        console.log(imgReg,describeReg,nameReg,tipReg,inventoryReg,stepReg,thumbnailReg);
        var total = imgReg&&describeReg&&nameReg&&tipReg&&inventoryReg&&stepReg&&thumbnailReg;
        return total;
        //return true;
    },
    /**提交**/
    submitFun:function(){
        var that = this;
        /**判断表单数据是否填完整**/
        if(that.checkReg()){
            /**上传单个主图**/
            wx.uploadFile({
                url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/Webfood/uploadProjectImage', //仅为示例，非真实的接口地址
                filePath: that.data.uploadObj.imgUrl,
                name: 'file',
                header: {
                    'content-type':'multipart/form-data'
                },
                formData:{
                    'user': 'test'
                },
                success: function(msg){
                    console.log(msg);
                    var json = JSON.parse(msg.data);
                    //console.log(json);
                    if(json.status==1){
                        /**单个主图上传成功返回路径**/
                        that.setData({
                            'uploadObj.img':json.image_name
                        });
                        /**分步骤图上传**/
                        var tempFilePaths = that.data.uploadObj.thumbnailReady;
                        if(tempFilePaths.length>0){
                            for(var i=0;i<tempFilePaths.length;i++){
                                upload_file(tempFilePaths[i]);
                            }
                        }
                        /**上传图片**/
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
                                success: function(nmsg){
                                    var json = JSON.parse(nmsg.data);
                                    //console.log(json,json.data[0]);
                                    var arr=that.data.uploadObj.thumbnail;
                                    arr.push(json.data[0]);
                                    //that.setData({
                                    //    'uploadObj.thumbnail':arr
                                    //});
                                    if(arr.length==that.data.uploadObj.thumbnailReady.length){
                                        that.setData({
                                            'uploadObj.thumbnail':arr
                                        });
                                        console.log(arr,that.data.uploadObj);
                                        /**提交所有数据到数据库**/
                                        wx.request({
                                            url: 'https://h5php.xingyuanauto.com/food/public/index.php/port/Webfood/MenuAddUpload',
                                            data:that.data.uploadObj,
                                            // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                            header: {
                                                'content-type': 'application/json'
                                            },
                                            success: function (res) {
                                                // success
                                                console.log(res);
                                                if(res.data.code==1){
                                                    wx.showModal({
                                                        title: '提交成功',
                                                        content: '查看我的作品',
                                                        showCancel:false,
                                                        success: function(res) {
                                                            wx.reLaunch({
                                                                url: '../userList/userList'
                                                            })
                                                        }
                                                    })
                                                }

                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }else{
                        wx.showModal({
                            title: '页面错误',
                            content: '页面错误，即将跳转',
                            showCancel:false,
                            success: function(res) {
                                if (res.confirm) {
                                    //console.log('用户点击确定')
                                }
                            }
                        })
                    }

                    //do something
                }
            })
        }else{
            wx.showModal({
                title: '内容缺失',
                content: '请完善菜品信息',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        //console.log('用户点击确定')
                    }
                }
            })
        }
    }
})