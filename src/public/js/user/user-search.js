import {deleteUserCallback} from './user-delete.js';
import {queryParser} from '../common/queryParser.js';
import {userSearchValidation} from './user-validation.js';

//유저 정보 테이블의 각 행을 클릭할 때 일어나는 이벤트 처리
$('tbody tr').click(function(event){ 
  const target = $(event.target);
  const tr = $(this);

  if(target.is('[name=deleteButton]')){
    const id = target.val();
    sendAjax('DELETE', `/user/${usn}`, null, deleteUserCallback);

  } else if (target.is('[name="sendNotification"]')) {
    const id = target.val();
    const notificationModal = $('#notiCreate');
    const receiver = notificationModal.find('[name="receiver"]');
    const receiverId = notificationModal.find('[name="receiver_ID"]');
    
    //수신자를 특정 회원으로 고정함
    receiver.attr('readonly', true);
    receiver.val('user');


    //수신자ID를 특정 회원으로 고정함
    receiverId.attr('readonly', true);
    receiverId.attr('disabled', false);
    receiverId.val(id);

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

  userForm.find('[name="page"]').val(page);
  userForm.find('[name="range"]').val(range);
  
  if(userSearchValidation(searchWord)){
    userForm.submit();
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