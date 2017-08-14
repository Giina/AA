//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    count: 0,
    set:[],
    totalPriceAfter: '',
    totalPriceBefore: '',
    totalFocusFlag:''
  },
  InputNumber: function (e) {
    this.data.set[e.target.dataset.index].number = parseFloat(e.detail.value)
    this.setData({
      set: this.data.set
    })
  },
  InputPrice: function (e) {
    this.data.set[e.target.dataset.index].price = parseFloat(e.detail.value)
    this.setData({
      set: this.data.set
    })
  },
  InputTotal: function (e) {
    console.log('parse:', e.detail.value)
    this.setData({
      totalPriceAfter: parseFloat(e.detail.value)
    })
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
        focusFlag:''
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
  },
  Add: function () {
    this.data.set.push({
      number: '',
      price: '',
      result: '?',
      focusFlag: ''
    })
    this.setData({
      count: this.data.count+ 1,
      set: this.data.set
    })
  },
  Delete: function (e) {
    // console.log(e.target.dataset)
    if (this.data.count > 1) {
      this.setData({
        count: this.data.count-1
      })
    }
    this.data.set.splice(e.target.dataset.index,1)
  },
  Calculate:function(){
    console.log('cal:',this.data.set)
    let totalBefore=0
    this.data.totalPriceBefore=0
    // verify
    for(let i in this.data.set){
      if (this.data.set[i].number > 0 && !(this.data.set[i].price > 0)){
        this.data.set[i].focusFlag = "price"
      } else if (!(this.data.set[i].number > 0) && this.data.set[i].price > 0){
        this.data.set[i].focusFlag = "number"
      }else{
        this.data.set[i].focusFlag = ""
      }
    }
    if (this.data.totalPriceAfter > 0) {
      this.data.totalFocusFlag = true
    } else {
      this.data.totalFocusFlag = false
    }
    // calculate
    for (let i in this.data.set) {
      if (this.data.set[i].price > 0 && this.data.set[i].number > 0) {
        this.data.totalPriceBefore += this.data.set[i].price * this.data.set[i].number
      }
    }
    for (let i in this.data.set) {
      if (this.data.set[i].price > 0 && this.data.set[i].number > 0) {
        console.log(i, ':', this.data.set[i].price / this.data.totalPriceBefore * this.data.totalPriceAfter, this.data.set[i].price, this.data.totalPriceBefore ,this.data.totalPriceAfter)
        this.data.set[i].result = Math.round((this.data.set[i].price / this.data.totalPriceBefore * this.data.totalPriceAfter) * 100) / 100
      }
    }
    this.setData({
      set:this.data.set,
      totalPriceBefore: this.data.totalPriceBefore,
      totalFocusFlag: this.data.totalFocusFlag
    })
  }
})
