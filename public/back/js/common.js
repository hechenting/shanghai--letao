/**
 * Created by lenovo on 2018/6/25.
 */


//功能6:未登录拦截功能
if(location.href.indexOf('login.html') === -1){
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
      //console.log(info);
      if(info.error === 400){
        //表示未登录.需要跳转到登录页面
        location.href='login.html';
      }
    }
  })

};

//功能5:进度条功能

$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },2000);

});



$(function() {
  //功能1:点击左边一级菜单,切换二级菜单
  $('.lt_aside .category').click(function () {
    $('.child').stop().slideToggle();
  });

  //功能2:点击右侧菜单按钮,左侧导航栏显示隐藏
  $('.lt_topbar .icon_menu').click(function () {
    $('.lt_aside').toggleClass('hiddenmenu');
    $('.lt_main').toggleClass('hiddenmenu');
  $('.lt_main .lt_topbar').toggleClass('hiddenmenu');
});

  //功能3点击登出按钮,弹出模态框
  $('.icon_logout').click(function(){
    $('.modal').modal('show');
  });

  //功能4点击退出按钮,跳转到登录页面
  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        //console.log(info);
        //如果请求成功,跳转会登录界面
        if(info.success){
          location.href="login.html"
        }

      }
    });
  })




})