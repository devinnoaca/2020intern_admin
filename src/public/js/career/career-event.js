import {careerValidation} from './career-validation.js';
import {modifyCareerCallback} from './career-modify.js';
import {deleteCareerCallback} from './career-delete.js';

const url = window.location.href;
const urlSplit = url.split('/');
const usn = urlSplit[urlSplit.length - 1];

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

export {careerClickEvent}