import {notificationValidation} from './notification-validation.js'

//삭제 버튼 처리 이벤트
$('tbody tr').on('click', function(event){
  const tr = $(this);
  const target = $(event.target);
  const td = tr.children();
  const id = td.eq(0).text();
  
  if(target.is('[name="deleteButton"]')){    
    sendAjax('DELETE', `/notification/${id}`, null, (xhr) => {
      alert(xhr.response.message);
      window.location.href = '/notification';
    });
  }
});

(function(){
  const queries = window.location.search.substring(1);
  const arrQuery = queries.split('&');
  const userForm = $('[name="searchNotificationForm"]');
  let component;
  let name = '';
  let componentValue = '';

  for (let i = 0; i < arrQuery.length; ++i) {
    component = arrQuery[i].split('=');
    name = component[0];
    componentValue = component[1];
    userForm.find(`[name="${name}"]`).val(componentValue);
  }
})();