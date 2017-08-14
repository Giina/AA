//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    count: 3,
    price: [],
    number: [],
    result: [],
    realprice: '',
    totalprice: ''
  },
  onLoad:function(){
    // this.setData({
    //   count:3
    // })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
