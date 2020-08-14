import {userDetailDataValidation} from "./user-validation.js";
import {careerValidation} from "../career/career-validation.js";
import {addCareerCallback} from "../career/career-create.js";
import {modifyCareerCallback} from "../career/career-modify.js";
import {deleteCareerCallback} from "../career/career-delete.js";

const url = window.location.href;
const urlSplit = url.split('/');
const usn = urlSplit[urlSplit.length - 1];

//매칭 열람하기 링크 초기화
(function(){
  const id = $('[name="id"]').val();
  const type = $('[name="type"]').val();
  let queryString = '';
  switch (type) {
    case '0':
      queryString += `queryType=SEARCH&mentorID=&menteeID=${id}&state=-1
                      &isTotal=on&startDateSubmit=1970-01-01+00%3A00%3A00&endDateSubmit=2020-08-14+06%3A59%3A45`;
      break;
    case '1':
      queryString += `queryType=SEARCH&mentorID=${id}&menteeID=&state=-1
                      &isTotal=on&startDateSubmit=1970-01-01+00%3A00%3A00&endDateSubmit=2020-08-14+06%3A59%3A45`;
      break;
    default:
      break;
  }
  
  $('[name="userMatching"]').attr('href', `/matching?${queryString}`);
})();

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

//수정 취소 요청시 이벤트
$('[name="updateCancelButton"]').on('click', () => {
  window.history.back();
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