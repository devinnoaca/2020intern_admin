import {queryParser} from '../common/queryParser.js';

//유저 삭제에 대한 콜백함수
const deleteUserCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(message);
      location.reload();
      break;
    
    case 400:
      alert(message);
      location.reload();
      break;
  }
}

export { deleteUserCallback }