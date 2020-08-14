const loginCallback = (xhr) => {
    if(xhr.status == 200) {
      alert(`환영합니다!`);
      window.location.href = '/';
    } else {
      alert(`로그인 실패 [${xhr.status}]`);
    }
  }

const onLogin = () => {
    const formData = document.loginForm;
    const jsonData = {
        id : formData.id.value,
        password: formData.password.value
    };

    sendAjax('POST', `/login`, JSON.stringify(jsonData), loginCallback);
}