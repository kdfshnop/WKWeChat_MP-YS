//区域模拟数据 
let mock = require('./../../buy/mock.js')
const region = '区域';
const sort = '综合排序';
const more = '更多';

module.exports = {
  data: {
    screen_region:region,
    screen_sort:sort,
    screen_more:more,
    //设置页面默认可以滚动
    isScroll:false,
    //点击筛选，设置三角行旋转
    isRotate0:false,
    isRotate1:false,
    isRotate2:false,
    //点击筛选，设置文本变色
    blue0:false,
    blue1:false,
    blue2:false,
    //控制区域是否显示
    isShowMask:false,
    //显示区域的索引值
    showIndex:-1,
    //区域列表数据
    regionList:[],
    //区域id和板块列表数据
    plateList:[],
    //点击板块高亮状态
    plateActionId:-1,
    //具体板块数据
    towns:[],
    //点击左边区域，默认选中的id
    regionActionId:-1,
    //综合排序列表
    sortContentList:[{content:"综合排序"},{content:"评价分数从高到低"},{content:"成交量从高到低"}],
    //综合排序点击高亮id
    sortActionId:-1,
    //更多列表
    moreContentList:[{content:"好经纪人"},{content:"客户热评"},{content:"推荐房源数量多"}],
    //更多点击高亮
    moreActionId:-1
  },
  //组件初始化
  filterAgentListInit(regionList){
      this.setData({
        regionList:regionList
      })
      //板块列表
      let plateList = [];
      //遍历区
      for(let i=0;i<regionList.length;i++){
          plateList.push({
            id:regionList[i].id,
            towns:[]
          });
      }
      //把板块往上提一层
      for(let i=0;i<regionList.length;i++){
          if(parseInt(regionList[i].id) ==  parseInt(plateList[i].id)){
            let subLists = regionList[i].subList;
            for(let j=0;j<subLists.length;j++){
              let towns = subLists[j].towns;
              for(let k=0;k<towns.length;k++){
                plateList[i].towns.push(towns[k]);
              }
            }
          }
      }
      this.setData({
        plateList:plateList
      })
  },
  //显示不同的筛选列表
  showScreenList(event){
    let actionIndex = parseInt(event.currentTarget.dataset.index);
    //this.actionIndex = actionIndex;
    this.setData({
      isScroll:true
    })
    if(actionIndex == 0){//区域
      this.setData({
        isRotate0:true,
        blue0:true,
        isShowMask:true,
        showIndex:actionIndex
      })

      //判断是否选择了综合排序筛选条件
      if(this.data.screen_sort == sort){//说明没有旋转
        this.setData({
            isRotate1:false,
            blue1:false
        })
      }
      //判断是否选择了更多筛选条件
      if(this.data.screen_more == more){//说明没有旋转
        this.setData({
            isRotate2:false,
            blue2:false
        })
      }
    }else if(actionIndex == 1){//综合排序
      this.setData({
        isRotate1:true,
        blue1:true,
        isShowMask:true,
        showIndex:actionIndex
      })
      //判断是否选择了区域筛选条件
      if(this.data.screen_region == region){//说明没有旋转
        this.setData({
            isRotate0:false,
            blue0:false
        })
      }
      //判断是否选择了更多筛选条件
      if(this.data.screen_more == more){//说明没有旋转
        this.setData({
            isRotate2:false,
            blue2:false
        })
      }
    }else if(actionIndex == 2){//更多
      this.setData({
        isRotate2:true,
        blue2:true,
        isShowMask:true,
        showIndex:actionIndex
      })
      //判断是否选择了区域筛选条件
      if(this.data.screen_region == region){//说明没有旋转
        this.setData({
            isRotate0:false,
            blue0:false
        })
      }
      //判断是否选择了综合排序筛选条件
      if(this.data.screen_sort == sort){//说明没有旋转
        this.setData({
            isRotate1:false,
            blue1:false
        })
      }
    }
  },
  //消失遮罩
  hideMaskBox(event){
    this.setData({
        isShowMask:false,
        isScroll:false,
        showIndex:-1
    })
    //判断是否选择了区域筛选条件
    if(this.data.screen_region == region){//说明没有旋转
      this.setData({
          isRotate0:false,
          blue0:false
      })
    }
    //判断是否选择了综合排序筛选条件
    if(this.data.screen_sort == sort){//说明没有旋转
      this.setData({
          isRotate1:false,
          blue1:false
      })
    }
    //判断是否选择了更多筛选条件
    if(this.data.screen_more == more){//说明没有旋转
      this.setData({
          isRotate2:false,
          blue2:false
      })
    }
  },
  //点击左边区域
  tapRegionList(event){
    let plateList = this.data.plateList;//板块数据
    let id = parseInt(event.target.id);//当前点击id
    //设置点击背景变白
    this.setData({
        regionActionId:id
    })
    //点击的是“不限”
    if(id == -1){
      this.setData({
          screen_region:"不限",
          towns:[]
      })
    }
    for(let i=0;i<plateList.length;i++){
      if(plateList[i].id == id){
          this.setData({
              towns:plateList[i].towns
          })
      }
    }
  },
  //点击右边板块
  plateList(event){
    this.setData({
      plateActionId:event.target.id,
      screen_region:event.currentTarget.dataset.platename
    })
  },
  //点击综合排序
  tapSort(event){
    this.setData({
        sortActionId:parseInt(event.currentTarget.dataset.index)
    })
    //设置点击的值回显
    this.setData({
        screen_sort:event.currentTarget.dataset.content
    })
  },
  //点击筛选更多
  tapMore(event){
    //设置当前点击高亮
    this.setData({
        moreActionId:parseInt(event.currentTarget.dataset.index)
    })
    //设置点击的值回显
    this.setData({
        screen_more:event.currentTarget.dataset.content
    })
  }
}