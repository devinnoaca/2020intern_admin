const deleteUserCallback = (xhr) => {
  window.location.href = '/user';
}

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
  const userForm =  $('#userForm');

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

const createUserCallback = function(xhr) {
  const message = xhr.response.message;

  if (xhr.status === 200) {
    alert(message);
    window.location.href = '/user';
  } else if (xhr.status === 400) {
    alert(message);
    window.location.href = '/user';
  } else if (xhr.status === 500) {
    alert(message);
    window.location.href = '/user';
  }
};

//각 유저 폼 데이터에 대한 정규표현식과 에러처리
const userDataValidation = function(userData) {
  //각 유저 데이터에 대한 정규 표현식
  const idReg = /^[a-z]+[a-z0-9]{5,20}/;
  const nameReg = /^[가-힣]{1,40}/;
  const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordReg =  /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,20}$/;

  if(!idReg.test(userData.id)){
    alert('id는 영문자(소문자)와 숫자 조합 5~20자리로 입력해주세요.');
    return false;
  }

  if(userData.type < 0 || userData.type > 2){
    alert('잘못된 유저 타입입니다. 다시 선택해 주세요.');
    return false;
  }

  if(!nameReg.test(userData.name)){
    alert('이름은 한글로 1~40자리로 입력해주세요.');
    return false;
  }

  if(!emailReg.test(userData.email)){
    alert('유효하지 않은 이메일 형식 입니다. 다시 입력해주세요.');
    return false;
  }

  if(userData.permission < -1 || userData.permission > 2){
    alert('잘못된 유저 권한 입니다. 다시 선택해주세요.');
    return false;
  }
  
  if(!passwordReg.test(userData.password)){
    alert('비밀번호는 영어 소문자, 특수문자, 숫자를 포함해 총 4~20자리로 입력해주세요.');
    return false;
  }
  
  return true;
}