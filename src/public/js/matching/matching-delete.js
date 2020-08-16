const deleteMatchingCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch (status) {
    case 200:
      alert(`매칭정보가 정상적으로 삭제되었습니다.`);
      console.log(message);
      window.location.href = `/matching?page=1&range=1`;
      break;

    case 400:
      alert(`삭제 실패 : ${message}`);
      break;
  }
}

const onDelete = (id) => {
  if (confirm('해당 매칭정보를 삭제하시겠습니까?')) {
    sendAjax('DELETE', `/matching/${id}`, null, deleteMatchingCallback);
  }
}
