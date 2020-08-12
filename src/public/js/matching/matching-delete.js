const deleteMatchingCallback = (xhr) => {
  console.log(xhr);
    if (xhr.status == 200) {
        alert(`매칭정보가 정상적으로 삭제되었습니다.`);
        window.location.href = '/matching';
      } else {
        alert(`매칭정보 삭제 실패 [${xhr.status}]`);
        console.log(xhr.response.message);
      }
  }

const onDelete = (id) => {
    if(confirm('해당 매칭정보를 삭제하시겠습니까?')) {
        sendAjax('DELETE', `/matching/${id}`, null, deleteMatchingCallback);
    }
}
