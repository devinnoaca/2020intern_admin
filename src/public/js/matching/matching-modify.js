const reqTime = document.modifyForm.requestTime.value;
const resTime = document.modifyForm.responseTime.value;

if (reqTime !== '') {
  $('.start-date').datepicker('setDate', new Date(reqTime.substr(0,10)));
}
if(resTime !== '') {
  $('.end-date').datepicker('setDate', new Date(resTime.substr(0,10)));
}

const modifyMatchingCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch (status) {
    case 200:
      alert(`매칭정보가 정상적으로 수정되었습니다.`);
      console.log(message);
      window.location.href = '/matching';
      break;

    case 400:
      alert(`수정 실패 : ${message}`);
      break;
  }
}

const onModify = () => {

  const formData = document.modifyForm;
  
  const convRequestTime = dateObjectFactory(formData.requestTime.value, false);
  const convResponseTime = dateObjectFactory(formData.responseTime.value, false);
  

  const jsonData = {
    state: formData.state.value,
    mentee_ID: formData.menteeID.value,
    mentor_ID: formData.mentorID.value,
    is_checked: formData.isChecked.value,
    request_time: convRequestTime,
    response_time: convResponseTime,
    request_message: formData.requestMessage.value,
    response_message: formData.responseMessage.value
  }

  if(matchingDataValidation(jsonData)) {
    sendAjax('PUT', `/matching/update/${modifyForm.id.value}`, JSON.stringify(jsonData), modifyMatchingCallback);
  }
}
