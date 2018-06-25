/**
 * Created by lenovo on 2018/6/25.
 */
$(function() {
  //功能1:点击左边一级菜单,切换二级菜单
  $('.lt_aside .category').click(function () {
    $('.children').stop().slideToggle();
  })

  //功能2:点击右侧菜单按钮,左侧导航栏显示隐藏
  $('.lt_topbar .icon_menu').click(function () {
    $('.lt_aside').toggleClass('hiddenmenu');
    $('.lt_main').toggleClass('hiddenmenu');
  $('.lt_main .lt_topbar').toggleClass('hiddenmenu');
})

  //点击登出按钮,弹出模态框
  $('.icon_logout').click(function(){
    $('.modal').modal('toggle')
  })

  //点击退出按钮,跳转到登录页面
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
    })
  })

})