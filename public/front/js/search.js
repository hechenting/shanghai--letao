/**
 * Created by lenovo on 2018/6/29.
 */
$(function(){
  //将搜索历史记录的数据以数组形式存储在本地localstorage中
  if(!localStorage.getItem('search_list')){
    localStorage.setItem('search_list','[]');
  }

  function getHistory(){
     var arr = JSON.parse(localStorage.getItem('search_list'));
     return arr;
  };

  renderHistory();
  //渲染历史记录的方法
  function renderHistory(){
    var arr = getHistory();
    $('.lt_history').html(template('history_tmp',{arr:arr}));

  }
  //1.点击搜索按钮,添加历史记录
  $('.search_btn').click(function(){
    var key = $('.search_input').val();
    if( !key ){
      mui.toast('请输入搜索关键字');
      return;
    }
    var arr = getHistory();
    //如果大于-1,则表示在原数组存在,须先删除原数组里的该数据,再把此次搜索记录添加在数组前面
    var index = arr.indexOf(key);
    if( index > -1){
      arr.splice(index,1);
    }
    if( arr.length >=10 ) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
    renderHistory();
    //点击搜索后,清空搜索框的内容
    $('.search_input').val('');
    //最后跳转到搜索列表页
    location.href = 'searchList.html?key=' + key;
  });


  //2.点击清空记录,弹出确认框,把本地存储的search_list情清空
  $('.lt_history').on('click','.title_right',function(){
    mui.confirm('你是否要清空所有的历史记录?','温馨提示',['取消','确认'],function( e ){
      if(!e.index){
        return ;
      }else {
        localStorage.setItem('search_list','[]');
        renderHistory();
      }
    })


  })

  //3.点击历史记录的小删除按钮,弹出确认框,可逐条删除(事件委托)
  $('.lt_history').on('click','i',function(){
    mui.confirm('你确定要删除此条记录吗?','温馨提示',['取消','确认'],function( e ){
      if(!e.index){
        return ;
      }else {
        var index = $(this).data('index');
        var arr = getHistory();
        arr.splice(index,1);
        localStorage.setItem('search_list',JSON.stringify(arr));

        renderHistory();
      }
    });


  })




})