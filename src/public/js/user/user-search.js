import {deleteUserCallback} from './user-delete.js';

//유저 정보 테이블의 각 행을 클릭할 때 일어나는 이벤트 처리
$('tbody tr').click(function(event){ 
  const target = $(event.target);
  const tr = $(this);

  if(target.is('[name=deleteButton]')){
    const usn = target.val();
    sendAjax('DELETE', `/user/${usn}`, null, deleteUserCallback);

  } else if (target.is('[name="sendNotification"]')) {
    const notificationModal = $('#notiCreate');
    notificationModal.find('[name="receiver"]').val('user');
    notificationModal.modal();
  } else {
    const td = tr.children();
    const id = td.eq(0).text();

    window.location.href = `/user/${id}`;
  }
});

//검색 폼에 대한 초기화 작업
(function(){
  const queries = window.location.search.substring(1);
  const arrQuery = queries.split('&');
  const userForm = $('[name="searchUserForm"]');
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