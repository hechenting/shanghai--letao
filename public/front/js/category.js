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
      //console.log(info);
      $('.lt_content_left ul').html(template('tabtmp',info));
      //渲染第一条tab栏数据的内容
      renderById(info.rows[0].id);
    }
  });
  //给左边tab栏添加点击事件
  $('.lt_content_left ul').on('click','a',function(){
    //获取id,渲染id对应的右侧内容
    var id = $(this).data('id');
    renderById( id );
    //切换current类
    $(this).parent().toggleClass('current').siblings().removeClass('current');


  })

  //通过一级分类id,请求后台,获取对应耳机分类信息,并渲染
  function renderById(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        //console.log(info);
        $('.lt_content_right ul').html(template('righttmp',info));
      }
    })
  }


})

