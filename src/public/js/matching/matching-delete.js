const callback = (xhr) => {
    // console.log(xhr.status);
    // console.log(xhr.responseText);
    if(xhr.status == 200) {
        alert(`요청성공. ${xhr.status}`);
        window.location.href = '/matching';
    } else {
        alert(`요청실패. ${xhr.status}`);
    }
  }

const onDelete = (id) => {
    if(confirm('해당 매칭정보를 삭제하시겠습니까?')) {
        sendAjax('DELETE', `http://localhost:3000/matching/${id}`, null, callback);
    }
}
