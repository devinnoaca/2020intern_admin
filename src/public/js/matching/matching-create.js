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