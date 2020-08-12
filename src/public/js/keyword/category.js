
// 카테고리 삭제 콜백
const deleteCategoryCallback = (xhr) => {

  console.log(xhr.response.message);
  if(xhr.status == 200) {
    alert(`카테고리가 정상적으로 삭제되었습니다`);
  } else {
    alert(`카테고리 삭제실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
  
  window.location.href = '/keyword';
}

// 카테고리 생성 콜백
const addCategoryCallback = (xhr) => {
  
  if(xhr.status == 200) {
    alert(`카테고리가 정상적으로 생성되었습니다`);
  } else {
    alert(`카테고리 생성실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
  
  window.location.href = '/keyword';
}

// 카테고리 생성
const addCategory = () => {
  let addForm = document.addCategoryForm;

  let jsonData = {
    name: addForm.inputCategory.value
  }
  
  if(categoryDataValidation(jsonData)) {
    sendAjax('POST', `/category/`, JSON.stringify(jsonData), addCategoryCallback);
  }
}

// 카테고리 삭제
const deleteCategory = (id, name) => {
  let delConfirm = confirm(`${name} 카테고리를 삭제하시겠습니까? `);
  
  if (!delConfirm) {
    console.log('삭제취소');
  } else {
    sendAjax('DELETE', `/category/${id}`, null, deleteCategoryCallback);
  }
}