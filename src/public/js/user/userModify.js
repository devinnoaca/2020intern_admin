let url = window.location.href;
const urlSplit = url.split('/');
const usn = urlSplit[urlSplit.length - 1];

//회원 수정 버튼 클릭 이벤트 
$('#userUpdateButton').on('click', () => {

  //input disable 해제
  $('ul').find('input').attr('disabled', false);
  //textarea disable 해제
  $('ul').find('textarea').attr('disabled', false);
  //select disable 해제
  $('ul').find('select').attr('disabled', false);
  //career delete button disabled 해제
  $('ul').find('[name="deleteCareerButton"]').attr('disabled', false);
  //career update button disabled 해제
  $('ul').find('[name="updateCareerButton"]').attr('disabled', false);
  //career add button disabled 해제
  $('#addCareerButton').attr('disabled', false);
  //id는 disabled처리
  $('ul').find('[name="id"]').attr('disabled', true);
});

//커리어 추가 버튼 클릭시 이벤트 ------------ 비동기 처리로 요청 성공시 반환값으로 추가된 커리어 정보를 반환해야함"
$('#addCareerButton').on('click', () => {
  const career = $('[name="addCareerInput"]').val();

  const data = {
    "usn": usn,
    "content": career
  };

  sendAjax('POST', `/user/${usn}/career`, JSON.stringify(data), addCareerCallback);

});

// 커리어 추가 혹은 삭제 이벤트
$('[name="careerDiv"]').on('click', function(event) {
  const index = $(this).index();
  const target = $(event.target);

  if(target.is('[name="updateCareerButton"]')){
    sendAjax('PUT', `/user/${usn}/career`, );
  } else if (target.is('[name="deleteCareerButton"]')){
    
  }
});

// 유저 기본 정보 업데이트 이벤트
$('[name="updateCommitButton"]').on('click', () => {
  const permission = $('[name="permission"]').val();
  const name = $('[name="name"]').val();
  const id = $('[name="id"]').val();
  const email = $('[name="email"]').val();
  const password = $('[name="password"]').val();
  const company = $('[name="company"]').val();
  const description = $('[name="description"]:first-child').val(); 
  const type = $('[name="type"]').val(); 
  const imageUrl = $('[name="image"]').attr('src');

  const data = {
    "email" : email,
    "password" : password,
    "name" : name,
    "description" : description,
    "id" : id,
    "type" : type,
    "company" : company,
    "permission" : permission,
    "usn" : usn,
    "notification" : "0",
    "image" : imageUrl
  };

  sendAjax('PUT', `/user/${usn}`, JSON.stringify(data), (xhr) => {
    window.location.href = `/user/${usn}`;
  });
});

const addCareerCallback = (xhr) => {
  const message = xhr.responseText.message;
  
  /*const career = xhr.responseText.career;
  const careerId = xhr.responseText.careerId;

  const careerTemplate = `<div class="input-group my-sm-1" name="careerDiv">
  <input class="form-control" value="${career}" type="text"
    aria-describedby="deleteCareerButton">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" name="updateCareerButton"
      value="${careerId}">수정</button>
    <button class="btn btn-outline-secondary" type="button" name="deleteCareerButton"
      value="${careerId}">삭제</button>
  </div>
</div>`;

  $('[name="careerDiv"]').last().after(careerTemplate);
  $('[name="addCareerInput"]').val('');
  $('[name="updateCareerButton"]').on('click', () => {
    alert('클릭!');
  });*/
}



