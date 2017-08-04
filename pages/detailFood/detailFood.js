// pages/detailFood/detailFood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{
        id:1,
        imgUrl:'../img/food.png',
        title:'香煎辣排骨',
        author:'小芊',
        save:888,
        like:959,
        foodText:'排骨绝对是人见人爱的美味佳肴，丰富的蛋白质、维生素以及骨胶原深受到女性的青睐，不管是红烧，糖醋还是清炒，味道都很赞。',
        foodGrade:'一般',
        foodTime:'60分钟',
        materialListArr: [
            {
             name:'辣花生',
             count:50
            },
            {
                name: '盐',
                count: 50
            },
            {
                name: '料酒',
                count: 50
            },
            {
                name: '生抽',
                count: 50
            },
            {
                name: '排骨',
                count: 50
            },
            {
                name: '黑胡椒',
                count: 50
            },
            {
                name: '姜蒜',
                count: 50
            },
        ],
        wayListArr:[
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫',
            '排骨切段，放入锅中焯水撇去浮沫'
        ],
        picListArr: [
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png',
            '../img/food.png'
        ],
        tipContent:'家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊'
    },
    addLike:{
        add:false,
        url: '../img/like01.png'
    },
    addSave:{
        add: false,
        url: '../img/save03.png'
    }
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
  funLike:function(){
      var add = this.data.addLike.add;
    //   console.log(add);
      if(add){
          this.setData({
              addLike:{
                  add:false,
                  url: '../img/like01.png'
              }
          })
      }else{
          this.setData({
              addLike: {
                  add: true,
                  url: '../img/like02.png'
              }
          })
      }
  },
  funSave: function () {
      var add = this.data.addSave.add;
    //   console.log(add);
      if (add) {
          this.setData({
              addSave: {
                  add: false,
                  url: '../img/save03.png'
              }
          })
      } else {
          this.setData({
              addSave: {
                  add: true,
                  url: '../img/save04.png'
              }
          })
      }
  }

})