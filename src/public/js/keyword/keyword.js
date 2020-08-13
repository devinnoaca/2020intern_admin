const deleteKeywordCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(`키워드가 정상적으로 삭제되었습니다`);
      console.log(message);
      window.location.href = '/keyword';
      break;
    
    case 400:
      alert(`삭제 실패 : ${message}`);
      break;
  }
}

const addKeywordCallback = (xhr) => {
  const status = xhr.status;
  const message = xhr.response.message;

  switch(status) {
    case 200:
      alert(`키워드가 정상적으로 생성되었습니다`);
      console.log(message);
      window.location.href = '/keyword';
      break;
    
    case 400:
      alert(`생성 실패 : ${message}`);
      break;
  }
}

const deleteKeyword = (id, name) => {
  let delConfirm = confirm(`${name} 키워드를 삭제하시겠습니까? `);
  if (!delConfirm) {
    console.log('삭제취소');
  } else {
    sendAjax('DELETE', `/keyword/${id}`, null, deleteKeywordCallback);
  }
}

const addKeyword = () => {
  let addForm = document.addKeywordForm;

  let jsonData = {
    name: addForm.inputKeyword.value,
    categoryID: addForm.searchType.value
  }

  if(keywordDataValidation(jsonData)) {
    sendAjax('POST', `/keyword/`, JSON.stringify(jsonData), addKeywordCallback);
  }
}