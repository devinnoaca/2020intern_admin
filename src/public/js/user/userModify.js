

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
});

const addCareerButtonCallBack = (xhr) => {
  const career = xhr.responseText.career;
  const careerId = xhr.responseText.careerId;

  const careerTemplate = `<div class="input-group my-sm-1" name="careerDiv">
                              <input class="form-control" value="${career}" type="text"
                              aria-describedby="deleteCareerButton" disabled>
                              <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" name="updateCareerButton"
                                value="${careerId}" disabled>수정</button>
                                <button class="btn btn-outline-secondary" type="button" name="deleteCareerButton"
                                value="${careerId}" disabled>삭제</button>
                              </div>
                            </div>`;

  $('[name="careerDiv"]:last-child').after(careerTemplate);
}

//커리어 추가 버튼 클릭시 이벤트 ------------ 비동기 처리로 요청 성공시 반환값으로 추가된 커리어 정보를 반환해야함"
$('#addCareerButton').on('click', () => {
  const career = $('[name="addCareerInput"]').val();
  const usn = 1;

  const data = {
    "usn": usn,
    "career": career
  };

  console.log('이벤트 시작');
  sendAjax('POST', `/user/${usn}/career`, JSON.stringify(data), addCareer);

});

$('[name="updateCareerButton"]').on('click', () => {
  alert('클릭!');
});

const addCareer = (xhr) => {
  const message = xhr.responseText.message;
  console.log(message);
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

