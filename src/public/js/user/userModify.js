import {userDetailDataValidation} from "./userValidation.js";
import {careerValidation} from "../career/careerValidation.js"

const url = window.location.href;
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
  //button disabled처리
  $('button').attr('disabled', false);
});

//커리어 추가 버튼 클릭시 이벤트 ------------ 비동기 처리로 요청 성공시 반환값으로 추가된 커리어 정보를 반환해야함"
$('#addCareerButton').on('click', () => {
  const career = $('[name="addCareerInput"]').val();

  const data = {
    usn: usn,
    content: career
  };

  if(careerValidation(data.content)){
    sendAjax('POST', `/user/career/${usn}`, JSON.stringify(data), addCareerCallback);
  }
});

// 커리어 수정 혹은 삭제 이벤트
$('[name="careerDiv"]').on('click', function(event) {
  careerClickEvent(event, $(this));
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

  const userData = {
    email : email,
    password : password,
    name : name,
    description : description,
    id : id,
    type : type,
    company : company,
    permission : permission,
    usn : usn,
    notification : "0",
    image : imageUrl
  };

  if(password.trim().length == 0){
    userData.password = null;
  }

  if (userDetailDataValidation(userData)) {
    sendAjax('PUT', `/user/${usn}`, JSON.stringify(userData), modifyUserCallback);
  }
});

//유저 기본정보 수정시 콜백 함수
const modifyUserCallback = function(xhr) {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      window.location.href = `/user/${usn}`;
      break;

    case 400:
      alert(message);
      break;
  }
};

//커리어 추가시 콜백 함수
const addCareerCallback = function(xhr) {
  const status = xhr.status;
  const message = xhr.response.message;
  const content = xhr.response.content;
  const careerID = xhr.response.careerID;

  const careerTemplate = `<div class="input-group my-sm-1" name="careerDiv">
                            <input class="form-control" value="${content}" name="career" type="text"
                            aria-describedby="deleteCareerButton">
                            <div class="input-group-append">
                              <button class="btn btn-outline-primary" type="button" name="updateCareerButton"
                              value="${careerID}">수정</button>
                              <button class="btn btn-danger" type="button" name="deleteCareerButton"
                              value="${careerID}">삭제</button>
                            </div>
                          </div>`;

  const careerDivLength = $('[name="careerDiv"]').length;

  alert(message);

  switch (status) {
    case 200:
      if (careerDivLength != 0) {
        $('[name="careerDiv"]').last().after(careerTemplate);
      } else {
        $('[name="careerWrapper"]').prepend(careerTemplate);
      }

      $('[name="addCareerInput"]').val('');
      $('[name="careerDiv"]').last().on('click', function (event) {
        careerClickEvent(event, $(this));
      });
      
      break;
    
    case 400:
      break;
    
    case 500:
      break;
  }
}

//커리어 항목 클릭시 이벤트 처리
const careerClickEvent = function(event, careerDiv) {
  const target = $(event.target);
  const careerContent = careerDiv.find('[name="career"]').val();
  const careerId = careerDiv.find('[name="updateCareerButton"]').val();
  const data = {
    "id" : careerId,
    "content" : careerContent
  };
  
  if(target.is('[name="updateCareerButton"]')){
    if (careerValidation(data.content)) {
      sendAjax('PUT', `/user/career/${usn}`, JSON.stringify(data), modifyCareerCallback);
    }

  } else if (target.is('[name="deleteCareerButton"]')){
    
    sendAjax('DELETE', `/user/career/${usn}`, JSON.stringify(data), (xhr) => {
      deleteCareerCallback(xhr);
      careerDiv.remove();
    });
  }
}

//커리어 수정 콜백 함수
const modifyCareerCallback = function(xhr) {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      break;
    
    case 400:
      alert(message);
      break;

    case 500:
      alert(message);
      break;
  }
};

//커리어 삭제 콜백 함수
const deleteCareerCallback = function(xhr) {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      break;
    
    case 400:
      alert(message);
      break;

    case 500:
      alert(message);
      break;
  }
};