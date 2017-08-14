//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    focusFlag:'number',
    numberVal:0, // 默认值：非法
    priceVal:0, // 默认值：非法
    count: 0,
    set:[],
    totalPriceAfter: '',
    totalPriceBefore: ''
  },
  InputNumber: function (e) {
    this.data.numberVal=parseInt(e.detail.value)
  },
  InputPrice: function (e) {
    this.data.priceVal = parseInt(e.detail.value)
  },
  InputFinish:function(){
    // todo:检测完整性，如果完整直接添加，不完整则focus
    if (this.data.numberVal===0){
      this.data.focusFlag='number'
    } else if (this.data.priceVal === 0) {
      this.data.focusFlag = 'price'
    } else {
      this.data.set.push({
        number: this.data.numberVal,
        price: this.data.priceVal,
        result: '?',
        check: false
      })
      // console.log(this.data.set)
      this.setData({
        count: this.data.count + 1,
        set: this.data.set
      })
      console.log(this.data.set)
      this.data.numberVal=0
      this.data.priceVal=0
      // todo:清空输入内容
    }
    console.log('count',this.data.count)
  },
  CheckAll:function(){
    for(item in set){
      console.log(item)
    }
  },
  Add:function(){
    this.InputFinish()
  },
  Calculate:function(){}
})
