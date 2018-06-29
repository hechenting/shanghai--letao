/**
 * Created by lenovo on 2018/6/29.
 */
$(function(){
  //console.log(getUrlObj());
  //一进入页面,就将刚刚搜索的值赋值给input框,然后请求数据并渲染
  var key = $('.search_input').val(getUrlObj('key'));
  render();

  //1.跳转过来后,获取地址栏上的key的值,传到后台i,请求对应数据,渲染商品列表
  //封装渲染商品列表的方法
  function render(){
    var options={};
    options.proName = $('.search_input').val();
    options.page = 1;
    options.pageSize = 100;
    //判断排序列表里的a是否有current类,
    //如果有,则需要传入排序信息
    if($('.lt_sort a').hasClass('current')){
      var $sort = $('.lt_sort a.current').attr('type');
      options[$sort] = $('.lt_sort a.current').find('i').hasClass('fa-angle-down')?'2':'1';
    }
    //console.log(options);
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:options,
      dataType:'json',
      success:function(info) {
        //console.log(info);
        $('.lt_product').html(template('tmp',info));
      }
    })
  }

  //点击搜索,依据input的值,获取数据并渲染,搜索完成后情况input框
  $('.search_btn').click(function(){
    var key = $('.search_input').val();
    if( !key ){
      mui.toast('请输入搜索的关键字',{duration:3000});
      return ;
    }
    render();
    //更新搜索历史记录
    var str = localStorage.getItem('search_list');
    var arr = JSON.parse(str);
    //如果历史记录大于等于10条,则删除最后一条记录
    if(arr.length >= 10 ){
      arr.pop();
    }
    var index = arr.indexOf(key);
    //如果历史记录曾经存在,则将原来的删除,把最新的添加到第一个
    if( index === -1) {
      arr.splice(index,1);
    }
    //将搜索记录添加到数组第一个
    arr.unshift(key)
    //将最新的搜索记录存在本地存储内
    localStorage.setItem('search_list',JSON.stringify(arr));

  })

  //点击价格/库存按钮,按照排序去渲染页面
  $('.lt_sort a[type]').on('click',function(){
    //如果有current,则切换i标签,如果没有current,则添加current类,并删除其他a的current

    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else {
      $(this).addClass('current').parent().siblings().find('a').removeClass('current');

    }
    render();

  })


})