import {careerClickEvent} from './career-event.js';

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

export { addCareerCallback }