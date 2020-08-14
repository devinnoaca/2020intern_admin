import {deleteUserCallback} from './user-delete.js';
import {queryParser} from '../common/queryParser.js';

//유저 정보 테이블의 각 행을 클릭할 때 일어나는 이벤트 처리
$('tbody tr').click(function(event){ 
  const target = $(event.target);
  const tr = $(this);

  if(target.is('[name=deleteButton]')){
    const usn = target.val();
    sendAjax('DELETE', `/user/${usn}`, null, deleteUserCallback);

  } else if (target.is('[name="sendNotification"]')) {
    const notificationModal = $('#notiCreate');
    const receiver = notificationModal.find('[name="receiver"]');
    const id = notificationModal.find('[name=""]');
    receiver.val('user');
    notificationModal.find('[nam]');
    notificationModal.modal();
  } else {
    const td = tr.children();
    const id = td.eq(0).text();

    window.location.href = `/user/${id}`;
  }
});

//유저 검색폼에 대한 이벤트 처리
$('[name="searchFormButton"]').on('click', ()=>{
  const userForm = $('[name="searchUserForm"]');
  const searchType = userForm.find('[name="searchType"]').val();
  const searchOption = userForm.find('[name="searchOption"]').val();
  const searchWord = userForm.find('[name="searchWord"]').val().trim();
  const searchPermission = userForm.find('[name="searchPermission"]').val();

  const query = queryParser();
  const page = query.page;
  const range = query.range;

  let url = '/user?';

  url += `&searchType=${searchType}`;
  url += `&searchOption=${searchOption}`;
  url += `&searchWord=${searchWord}`;
  url += `&searchPermission=${searchPermission}`;
  url += `&page=${page}`;
  url += `&range=${range}`;
   
  console.log(url);
  
  userForm.attr('action', url);
  console.log(userForm.attr('action'));
  userForm.submit();
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