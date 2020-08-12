const deleteKeywordCallback = (xhr) => {
  console.log(xhr.response.message);
  if(xhr.status == 200) {
    alert(`키워드가 정상적으로 삭제되었습니다`);
    window.location.href = '/keyword';
  } else {
    alert(`키워드 삭제실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
}

const addKeywordCallback = (xhr) => {
  console.log(xhr.response.message);
  if(xhr.status == 200) {
    alert(`키워드가 정상적으로 생성되었습니다`);
    window.location.href = '/keyword';
  } else {
    alert(`키워드 생성실패 [${xhr.status}]`);
    console.log(xhr.response.message);
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