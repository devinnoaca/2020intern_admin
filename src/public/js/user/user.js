import {userDataValidation} from "./userValidation.js";

//유저 삭제에 대한 콜백함수
const deleteUserCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      window.location.href = '/user';
      break;
    
    case 400:
      alert(message);
      break;
  }
}

//유저 정보 테이블의 각 행을 클릭할 때 일어나는 이벤트 처리
$('tbody tr').click(function(event){ 
  const target = $(event.target);
  const tr = $(this);

  if(target.is('[name=deleteButton]')){
    const usn = target.val();
    sendAjax('DELETE', `/user/${usn}`, null, deleteUserCallback);
  } else {
    const td = tr.children();
    const id = td.eq(0).text();

    window.location.href = `/user/${id}`;
  }
});

//유저 정보 생성 모달의 생성 버튼 클릭시 이벤트
$('#createUserButton').on('click', () => {
  const userCreateModal = $('#userCreate');
  const type = userCreateModal.find('[name="type"]').val();
  const id = userCreateModal.find('[name="id"]').val();
  const name = userCreateModal.find('[name="name"]').val();
  const email = userCreateModal.find('[name="email"]').val();
  const permission = userCreateModal.find('[name="permission"]').val();
  const password = userCreateModal.find('[name="password"]').val();

  const userData = {
    type: type,
    id: id,
    name: name,
    email: email,
    permission: permission,
    password: password
  };

  if(userDataValidation(userData)){
    sendAjax('POST', '/user', JSON.stringify(userData), createUserCallback);
  }
});

//유저 생성에 대한 콜백 함수
const createUserCallback = function(xhr) {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status){
    case 200: 
      alert(message);
      window.location.href = '/user';
      break;
    case 400:
      alert(message);
      window.location.href = '/user';
      break;
    case 500: 
      alert(message);
      window.location.href = '/user';
      break;
  }
};

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