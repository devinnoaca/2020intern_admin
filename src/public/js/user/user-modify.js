import {userDetailDataValidation} from "./user-validation.js";
import {careerValidation} from "../career/career-validation.js";
import {addCareerCallback} from "../career/career-create.js";
import {modifyCareerCallback} from "../career/career-modify.js";
import {deleteCareerCallback} from "../career/career-delete.js";

Date.prototype.format = function (f) {

  if (!this.valueOf()) return " ";
  var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
  var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear(); // 년 (4자리)
          case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
          case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
          case "dd": return d.getDate().zf(2); // 일 (2자리)
          case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
          case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
          case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
          case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
          case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
          case "mm": return d.getMinutes().zf(2); // 분 (2자리)
          case "ss": return d.getSeconds().zf(2); // 초 (2자리)
          case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
          default: return $1;
      }
  });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

const url = window.location.href;
const urlSplit = url.split('/');
const usn = urlSplit[urlSplit.length - 1];
let date = new Date();
date = date.format('yyyy-MM-dd HH:mm:ss');
//매칭 열람하기 링크 초기화
(function(){
  const id = $('[name="id"]').val();
  const type = $('[name="type"]').val();
  let queryString = '';
  switch (type) {
    case '0':
      queryString += `queryType=SEARCH&page=1&range=1&mentorID=&menteeID=${id}&state=-1&isTotal=on&startDateSubmit=1970-01-01&endDateSubmit=${date}`;
      break;
    case '1':
      queryString += `queryType=SEARCH&page=1&range=1&mentorID=${id}&menteeID=&state=-1&isTotal=on&startDateSubmit=1970-01-01&endDateSubmit=${date}`;
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