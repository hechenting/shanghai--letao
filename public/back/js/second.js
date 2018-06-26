/**
 * Created by lenovo on 2018/6/26.
 */
$(function(){
  var currentPage = 1;
  var pageSise = 3;

  render();
  //渲染页面的方法
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSise
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

  //点击添加分类,模态框显示,请求后台,获取下拉菜单的数据
  $('.btn_add').click(function(){
    $('#addCate_modal').modal('show');

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        //console.log(info);
        $('.dropdown ul').html(template('dropDown_tmp',info));
      }
    })

  })

  //给下拉菜单添加点击事件,把点击的值赋值给name="brandName" 的input
  //采用事件委托
  $('.dropdown-menu').on('click','a',function(){
    //获取点击时的值,将值赋给下面的input
    var id = $(this).data('id');
    var text = $(this).text();
    $('#dropDownBtn').text(text);
    $('[name="categoryId"]').val(id);

    //用户选择了一级分类选项后,需要更新校验状态
    $('#category').data('bootstrapValidator').updateStatus('categoryId','VALID');

  })

  //表单上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data);
      //console.log(e);
      var imgUrl = data.result.picAddr;
      $('.form-group img').attr('src',imgUrl);
      //将图片src地址设为imgUrl
      $('[name="brandLogo"]').val(imgUrl);
      //用户选择了图片后,需要更新校验状态
      $('#category').data('bootstrapValidator').updateStatus('brandLogo','VALID');

    }


  });

  //表单校验
  $('#category').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //excluded: [':disabled', ':hidden', ':not(:visible)'],
    excluded:[],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '二级分类不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '图片不能为空'
          }
        }
      },

    }

  })

  //表单校验成功后提交表单
  $('#category').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#category').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          $('#addCate_modal').modal('hide');
          $('#category').data('bootstrapValidator').resetForm();
          currentPage = 1;
          render();
        }
      }
    })
  })


})