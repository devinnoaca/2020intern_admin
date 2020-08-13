//유저 삭제에 대한 콜백함수
const deleteUserCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      window.location.href = '/user';
      break;
    
    case 400:
      alert(message);
      break;
  }
}

export { deleteUserCallback }