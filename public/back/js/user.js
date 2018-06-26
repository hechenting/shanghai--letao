/**
 * Created by lenovo on 2018/6/26.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  //进入页面就渲染一次
  render();
  //渲染当前页的函数
  function render() {
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('tbody').html(template('tmp',info));
        //生成分页
        //分页函数,使用插件
        $('.paginator').bootstrapPaginator({
          bootstrapMajorVersion:3, //版本号必填
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function(a,b,c,page){
            //console.log(page);
            currentPage = page;
            render();
          }

        })
      }
    })
  }

  //更改用户禁用启用状态
  //1.点击显示模态框(事件委托)
  $('tbody').on('click','.btn',function(){
    $('#user_Modal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger')?0:1;
    console.log(currentId + '****' + isDelete);

  })
  //2.点击确认修改后台用户禁用启用数据 禁用->0,启用->1
  $('.btn-primary').click(function(){
    console.log(currentId+'---'+isDelete);
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        $('#user_Modal').modal('hide');
        render();

      }
    })
  })


})