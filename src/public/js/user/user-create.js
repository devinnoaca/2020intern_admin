import {userDataValidation} from "./user-validation.js";

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