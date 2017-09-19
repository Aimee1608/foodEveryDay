// pages/checkDetailFood/checkDetailFood.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */

    data: {
        detail: {
            //id:1,
            //img:'../img/food.png',
            //name:'香煎辣排骨',
            //author:'小芊',
            //collect:888,
            //like:959,
            //describe:'排骨绝对是人见人爱的美味佳肴，丰富的蛋白质、维生素以及骨胶原深受到女性的青睐，不管是红烧，糖醋还是清炒，味道都很赞。',
            //complexity:'一般',
            //handle_time:'60分钟',
            //inventory: [
            //    {
            //     food_name:'辣花生',
            //     food_how:50
            //    }
            //],
            //step:[
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫',
            //    '排骨切段，放入锅中焯水撇去浮沫'
            //],
            //thumbnail: [
            //    '../img/food.png',
            //    '../img/food.png',
            //    '../img/food.png',
            //    '../img/food.png',
            //    '../img/food.png',
            //    '../img/food.png',
            //    '../img/food.png',
            //    '../img/food.png'
            //],
            //tip:'家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊家就安静安静假假按揭啊'
        },
        // addLike: {
        //     add: 0,
        //     url: '../img/like0.png'
        // },
        // addSave: {
        //     add: 0,
        //     url: '../img/save0.png'
        // },
        foodId: null,
        openid: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(options, wx.getStorageSync('openid'));
        var title = '待审核作品';
        if (options.id != null) {
            if (options.auditStart == 0) {
                title = '待审核作品'
            } else if (options.auditStart == 2) {
                title = "审核未通过作品"
            } else if (options.auditStart == 1) {
                title = "审核通过作品"
            }
            wx.setNavigationBarTitle({
                title: title
            })
            that.setData({
                foodId: options.id,
                isCheck:options.isCheck,
            });
            wx.request({
                url: app.localUrl + 'food/FoodInfoData',
                method: 'GET',
                data: { id: that.data.foodId, openid: wx.getStorageSync('openid') },
                // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    // success
                    console.log('菜谱详情', res);
                    if (res.data.code == 1001) {
                        var obj = res.data.data;

                        if (obj != null) {
                            var ListArr = {
                                id: obj.id,
                                img: obj.img,
                                name: obj.name,
                                author: obj.author != null ? obj.author : '未知',
                                describe: obj.describe,
                                complexity: obj.complexity,
                                handle_time: obj.handle_time,
                                inventory: obj.inventory,
                                step: obj.step,
                                thumbnail: obj.thumbnail,
                                tip: obj.tip
                            };
                            //console.log(obj.step);
                            //console.log(ListArr);
                            that.setData({
                                // 'addLike.add': obj.user_like_start,
                                // 'addLike.url': '../img/like' + obj.user_like_start + '.png',
                                // 'addSave.add': obj.collect_start,
                                // 'addSave.url': '../img/save' + obj.collect_start + '.png',
                                detail: ListArr
                               
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
        var that = this;
        return {
            title: '美食美荟开启你的美味生活！',
            path: '/pages/index/index',
            imageUrl: '../img/share.png',
            success: function (msg) {
                // 转发成功
                console.log(msg)
            },
            fail: function (msg) {
                // 转发失败
                console.log(msg)
            }
        }
    },
    sendAuditFun: function (url) {
        var that = this;
        wx.request({
            url: app.localUrl + url,
            data: { id: that.data.detail.id, openid: wx.getStorageSync('openid') },
            // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
                // success
                console.log(res);
                if (res.data.code == 1001) {
                    that.setData({
                        pageId: 1,
                        searchListArr: []
                    });
                    wx: wx.redirectTo({
                        url: '../checkList/checkList'
                    })
                } else if (res.data.code == 1004) {
                  wx.showLoading({
                    title: '提交失败',
                  })
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 1000)
                }

            }
        })
    },
    funPass:function(){
        var that = this;
        wx.showModal({
            title: '通过审核',
            content: '确认通过审核吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.sendAuditFun('audit/greens_adopt');
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    funFailed:function(){
        var that = this;
        wx.showModal({
            title: '驳回',
            content: '确认驳回吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.sendAuditFun('audit/greens_adopt');
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
    
});