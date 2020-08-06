const modifyCallback = (xhr) => {
  // console.log(xhr.status);
  // console.log(xhr.responseText);
  if (xhr.status == 200) {
    alert(`요청성공. ${xhr.status}`);
    window.location.href = '/matching';
  } else {
    alert(`요청실패. ${xhr.status}`);
  }
}

const onModify = (id) => {

  const formData = document.modifyForm;
  const jsonData = {
    state: formData.state.value,
    mentee_USN: formData.menteeUSN.value,
    mentor_USN: formData.mentorUSN.value,
    is_checked: formData.isChecked.value,
    request_time: formData.requestTime.value,
    response_time: formData.responseTime.value,
    request_message: formData.requestMessage.value,
    response_message: formData.responseMessage.value
  }

  console.log(jsonData);

  sendAjax('PUT', `/matching/update/${modifyForm.id.value}`, JSON.stringify(jsonData), modifyCallback);

}
