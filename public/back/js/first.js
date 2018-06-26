/**
 * Created by lenovo on 2018/6/26.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 3;

  //一进入页面就渲染一次
  render();
  //渲染页面的方法
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        //console.log(info);
        $('tbody').html(template('tmp',info));
        //添加分页
        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  
  //1.点击添加分类,弹出模态框
  $('.btn_add').click(function(){
    $('#addCate_modal').modal('show');
  })


  //2.校验表单
  $('#category').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类不能为空'
          }
          //正则校验
        }
      }


    }


  });


  //3.表单校验成功后将模态框内的表单内容提交后台添加
  $('#category').on('success.form.bv',function(e){

      e.preventDefault();

      $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$('#category').serialize(),
        dataType:'json',
        success:function(info){
          //console.log(info);
          if(info.success){
            //3.添加完成后,关闭模态框,重新渲染页面
            $('#addCate_modal').modal('hide');
            //因为数据会被添加到第一个的位置,所以渲染第一页
            currentPage = 1;
            render();
          }
        }

      })
    })


})








