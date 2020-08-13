//커리어 수정 콜백 함수
const modifyCareerCallback = function(xhr) {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      break;
    
    case 400:
      alert(message);
      break;

    case 500:
      alert(message);
      break;
  }
};

export {modifyCareerCallback}