// 매칭정보의 상태가 거절일 경우, 거절사유 입력폼을 보여준다.
window.onload = () => {
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
  }

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

const onModify = (id) => {
    
    const formData = document.modifyForm;
    const jsonData = {
        
    }

    sendAjax('DELETE', `http://localhost:3000/matching/${id}`, null, callback);
    
}
