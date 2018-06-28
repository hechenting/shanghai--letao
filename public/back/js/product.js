/**
 * Created by lenovo on 2018/6/27.
 */
$(function(){
  var currentPage = 1;//记录当前页码
  var pageSize = 3;//设定每页显示的数据条数

  render();//一进入页面就渲染一次页面
  //渲染页面表格的方法
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        //console.log(info);

        $('tbody').html(template('tmp',info));
        //设置分页
        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          //点击页码后的回调函数
          onPageClicked:function(a,b,c,page){
            //将当前页页码设置为点击的页码
            currentPage = page;
            //在此渲染页面
            render();
          }


        })

      }
    })
  }

  //点击添加商品,弹出模态框,并动态渲染下拉菜单项目
  $('.btn_add').click(function(){
    //打开模态框
    $('#addpro_modal').modal('show');
    //发送ajax请求,获取下拉菜单数据并渲染
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        //console.log(info);
        $('.dropdown-menu').html(template('dropDown_tmp',info));

      }
    })
  })

  //点击下拉菜单项的时候,获取值和id
  $('.dropdown-menu').on('click','a',function(){
    var id = $(this).data('id');
    var txt = $(this).text();
    $('#dropDownBtn').text(txt);
    $('[name="brandId"]').val(id);
    //此下拉菜单的input框状态设为VALID
    $('#product').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  //表单校验
  $('#product').bootstrapValidator({
    //1. 指定不校验的类型，
    excluded:[],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3.指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      //二级分类
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }

        }
      },
      //商品名称
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品名称不能为空'
          }

        }
      },
      //商品描述
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      //商品库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品库存不能为空'
          },
          //正则校验
          regexp: {
            regexp: /^\+?[1-9]\d*$/,
            message: '库存不能为0或非数字'
          }
        }
      },
      //商品尺寸
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品尺寸不能为空'
          },

          //正则校验 32-40
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是32-40'
          }
        }
      },
      //商品原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      //商品现价
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品现价不能为空'
          }
          //长度校验
          //正则校验
        }
      },
      //图片上传数量
      picStatus: {
        validators: {

          notEmpty:{
            message:'需要上传3张图片'
          }
        }
      }


    }
  })

  var pics=[];//用来保存每次上传的图片名称和地址对象,要求length为3
  var dataStr;//用来保存图片名称和地址拼接的字符串
  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data);
      //console.log(data.result.picAddr);
      //$('.img_box img')
      //如果图片上传,则保存图片的名字和地址data.result.picAddr
      pics.unshift(data.result);
      $('.img_box').append('<img src='+data.result.picAddr+' width="100" height="100" >')
      //如果图片数量大于3张,则把第一张删除
      if(pics.length>3){
        pics.pop();
        $('.img_box img:last-of-type').remove();
        dataStr = "&picName1="+pics[0].picName+"&picAddr1="+pics[0].picAddr;
        dataStr +="&picName2="+pics[1].picName+"&picAddr2="+pics[1].picAddr;
        dataStr +="&picName3="+pics[2].picName+"&picAddr3="+pics[2].picAddr;

      }
      //console.log(pics);

      //如果图片数量等于3,则让name="statu"的input框的状态变更为校验成功
      if(pics.length===3){
        $('#product').data('bootstrapValidator').updateStatus('picStatus','VALID')
      }


    }

  });

  //表单验证成功后,使用ajax提交表单
  $('#product').on('success.form.bv',function( e ) {
    //阻止submit按钮的默认提交事件
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:$('#product').serialize()+dataStr,
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //成功上传后,关闭模态框
          $('#addpro_modal').modal('hide');
          //,重新渲染页面
          currentPage = 1;
          render();
          //重置表单
          $('#product').data('bootstrapValidator').resetForm(true);
          //恢复下拉菜单.删除添加的img元素
          $('#dropDownBtn').text('请选择二级分类');
          $('.img_box img').remove();


        }
      }
    })

  });

  //点击下架按钮,更改商品状态,并重新渲染页面
  //没有修改上下架状态的接口,故点击无效
  $('tbody').on('click','.btn',function(){
    var id =$(this).parent().data('id');
    //if(id === 1){
    //  //如果id为1,说明此按钮为下架按钮,需要将状态改为0
    //
    //}
  })





})