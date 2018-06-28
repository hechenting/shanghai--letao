/**
 * Created by lenovo on 2018/6/28.
 */
$(function(){
  //轮播图
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
  });

  //注意：mui框架会默认初始化当前页面的图片轮播组件；若轮播组件内容为js动态生成时（比如通过ajax动态获取的营销信息），则需要在动态生成完整DOM (包含mui-slider下所有DOM结构) 后，手动调用图片轮播的初始化方法；代码如下：



})