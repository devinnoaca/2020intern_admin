const callback = (xhr) => {
  // console.log(xhr.status);
  // console.log(xhr.responseText);
  console.log(xhr)
  alert(`요청성공. ${xhr.status}`)

  window.location.href = '/keyword';
}

const deleteKeyword = (id, name) => {
  let delConfirm = confirm(`${name} 키워드를 삭제하시겠습니까? `);
  if (!delConfirm) {
    console.log('삭제취소.');
  } else {
    console.log('삭제!');
    sendAjax('DELETE', `/keyword/${id}`, null, callback);
  }
}

const addKeyword = () => {
  let addForm = document.addKeywordForm;

  let jsonData = {
    name: addForm.inputKeyword.value,
    categoryID: addForm.searchType.value
  }
  console.log(jsonData);
  sendAjax('POST', `/keyword/`, JSON.stringify(jsonData), callback);
}