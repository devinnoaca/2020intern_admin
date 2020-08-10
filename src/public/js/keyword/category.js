const categoryCallback = (xhr) => {
  // console.log(xhr.status);
  // console.log(xhr.responseText);
  console.log(xhr)
  alert(`요청성공. ${xhr.status}`)

  window.location.href = '/keyword';
}

const addCategory = () => {
  let addForm = document.addCategoryForm;

  let jsonData = {
    name: addForm.inputCategory.value
  }
  console.log(jsonData);
  sendAjax('POST', `/category/`, JSON.stringify(jsonData), categoryCallback);
}

const deleteCategory = (id, name) => {
  let delConfirm = confirm(`${name} 카테고리를 삭제하시겠습니까? `);
  if (!delConfirm) {
    console.log('삭제취소.');
  } else {
    console.log('삭제!');
    sendAjax('DELETE', `/category/${id}`, null, categoryCallback);
  }
}