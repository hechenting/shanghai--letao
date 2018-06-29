/**
 * Created by lenovo on 2018/6/28.
 */
$(function(){



  //设置区域滚动参数对象
  options = {
    //scrollY: true, //是否竖向滚动
    //scrollX: false, //是否横向滚动
    //startX: 0, //初始化时滚动至x
    //startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条,显示为true,不显示为false
    deceleration:0.0005, //阻尼系数,系数越小滑动越灵敏
    //bounce: true //是否启用回弹
  };
  //区域滚动
  mui('.mui-scroll-wrapper').scroll(options);

  //轮播图
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
  });

  //注意：mui框架会默认初始化当前页面的图片轮播组件；若轮播组件内容为js动态生成时（比如通过ajax动态获取的营销信息），则需要在动态生成完整DOM (包含mui-slider下所有DOM结构) 后，手动调用图片轮播的初始化方法

})

//封装一个快速获取url拼接数据对象的函数
function getUrlObj(name){
  var urlStr=location.search;
  var str = decodeURI(urlStr);
  str = str.slice(1);
  //console.log(str);
  var arr = str.split('&');
  var obj = {};
  arr.forEach(function(v,i){
    obj[v.split('=')[0]] = v.split('=')[1];

  })
  if(name){
    return obj[name];
  }else {
    return obj;
  }


}
