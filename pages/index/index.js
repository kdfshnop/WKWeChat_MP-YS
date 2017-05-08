//index.js
function HighlightTransform(data) {
    let newList = [];
      for(let i=0;i<data.length;i++){
          let texts = data[i].text.split(data[i].key);
          let t = '';
          for(let j=0;j<texts.length;j++){
            if(j<texts.length-1){
              t+=texts[j]+'@'+data[i].key+'@';
            }else{
              t+=texts[j]
            }
          }
          let arr = t.split('@');
          let list = [];
          for(let k=0;k<arr.length;k++){
          	list.push({
              text:arr[k],
              isgl:(arr[k] == data[i].key)
            });
          }
          newList.push(list);
      }
      return  newList;
}





//获取应用实例
var app = getApp()

Page({
  data: {
    agentList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    newList:[],
    //点击筛选，设置三角行旋转
    isRotate0:false,
    isRotate1:false,
    isRotate2:false,
    //点击筛选，设置文本变色
    blue0:false,
    blue1:false,
    blue2:false
  },
  onLoad(){
    var that = this;
    //后台返回的数据
    let list = [
        {
          text:"微信小程序开发中,不知道小程序好不好",
          key:"小程序"
        },
        {
          text:"2017小程序火了",
          key:"小程序"
        }
    ];

    this.setData({
      newList:HighlightTransform(list)
    })
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../login/index'
    })
  },
  showScreenList(event){
    let index = parseInt(event.currentTarget.dataset.index);
    if(index == 0){//区域
      this.setData({
        isRotate0:true
      })
      this.setData({
        blue0:true
      })
    }else if(index == 1){//综合排序
      this.setData({
        isRotate1:true
      })
      this.setData({
        blue1:true
      })
    }else if(index == 2){//更多
      this.setData({
        isRotate2:true
      })
      this.setData({
        blue2:true
      })
    }
  }
})
