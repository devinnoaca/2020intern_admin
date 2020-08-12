// 매칭정보의 상태가 거절일 경우, 거절사유 입력폼을 보여준다.

const stateRadio = document.createForm.state;
const rejectInput = document.querySelector('#reject-input-form');

for (var i = 0; i < stateRadio.length; ++i) {
  stateRadio[i].onclick = function () {
    switch (this.value) {
      case '2':
        rejectInput.style.display = "block";
        break;
      default:
        rejectInput.style.display = "none";
    }
  }
}


createMatchingCallback = (xhr) => {
  if (xhr.status == 200) {
    console.log(xhr.response.message);
    alert(`매칭정보가 정상적으로 생성되었습니다.`);
    window.location.href = '/matching';
  } else {
    alert(`매칭정보 생성 실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
}

const onCreate = () => {
  const formData = document.createForm;

  let isChecked = true;

  //매칭요청이 대기 상태로 생성 될 시, 읽지 않음으로 생성
  if(formData.state.value == 0) {
    isChecked = false;
  }

  const jsonData = {
    state: formData.state.value,
    mentee_ID: formData.menteeId.value,
    mentor_ID: formData.mentorId.value, 
    request_time: new Date(),
    is_checked: isChecked,
    request_message: formData.requestMessage.value,
    response_message: formData.responseMessage.value
  }

  if(matchingDataValidation(jsonData)) {
    sendAjax('POST', `/matching`, JSON.stringify(jsonData), createMatchingCallback);
  }

}