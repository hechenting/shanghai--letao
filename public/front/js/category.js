/**
 * Created by lenovo on 2018/6/28.
 */
$(function(){
  //动态渲染左边tab栏
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
    }
  })

  function renderById(id){

  }


})

categoryName