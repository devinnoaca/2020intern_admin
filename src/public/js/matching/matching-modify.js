const modifyMatchingCallback = (xhr) => {
  if(xhr.status == 200) {
    alert(`매칭정보가 정상적으로 수정되었습니다`);
    window.location.href = '/matching';
  } else {
    alert(`매칭정보 수정 실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
}

const onModify = () => {

  const formData = document.modifyForm;
  const jsonData = {
    state: formData.state.value,
    mentee_id: formData.menteeID.value,
    mentor_id: formData.mentorID.value,
    is_checked: formData.isChecked.value,
    request_time: formData.requestTime.value,
    response_time: formData.responseTime.value,
    request_message: formData.requestMessage.value,
    response_message: formData.responseMessage.value
  }

  if(matchingDataValidation(jsonData)) {
    sendAjax('PUT', `/matching/update/${modifyForm.id.value}`, JSON.stringify(jsonData), modifyMatchingCallback);
  }
}
