// 매칭정보의 상태가 거절일 경우, 거절사유 입력폼을 보여준다.

const stateRadio = document.createForm.state;
const responseInput = document.querySelector('#responseInputLi');

for (var i = 0; i < stateRadio.length; ++i) {
  stateRadio[i].onclick = function () {
    switch (this.value) {
      case '2':
        responseInput.style.display = "block";
        break;
      default:
        responseInput.style.display = "none";
    }
  }
}


createMatchingCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch (status) {
    case 200:
      alert(`매칭정보가 정상적으로 생성되었습니다`);
      console.log(message);
      window.location.href = '/matching';
      break;

    case 400:
      alert(`생성 실패 : ${message}`);
      break;
  }
}

const onCreate = () => {
  const formData = document.createForm;

  let isChecked = true;

  //매칭요청이 대기 상태로 생성 될 시, 읽지 않음으로 생성
  if (formData.state.value == 0) {
    isChecked = false;
  }

  const jsonData = {
    state: formData.state.value,
    mentee_ID: formData.menteeId.value,
    mentor_ID: formData.mentorId.value,
    is_checked: isChecked,
    request_message: formData.requestMessage.value,
    response_message: formData.responseMessage.value
  }

  if (matchingDataValidation(jsonData)) {
    sendAjax('POST', `/matching`, JSON.stringify(jsonData), createMatchingCallback);
  }

}