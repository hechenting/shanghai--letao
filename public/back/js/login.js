/**
 * Created by lenovo on 2018/6/25.
 */

$(function() {

  //表单验证
  $('#form').bootstrapValidator({
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
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在6到30之间'
          },
          callback:{
            message:'用户名不存在'
          }
          //正则校验
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
            message:'密码错误'
          }
          //正则校验
        }
      }

    }


  });

  //表单校验成功,注册表单
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href='index.html';
        }
        //用户名错误的时候提示信息更换
        if(info.error === 1000){
          $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }

        //密码错误的时候提示信息更换
        if(info.error===1001){
          $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }

      }
    })
  })

  //重置功能
  $('[type="reset"]').click(function(){
    $("#form").data('bootstrapValidator').resetForm();
  })

})