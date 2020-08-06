const activeTab = (categoryId) => {
  $(`#myList a[href='#category-${categoryId}']`).tab("show");
}

//keyword badge 태그 생성함수
const badgeFactory = (categoryId, name) => {
  console.log(`run badgeFactory -> ${categoryId} | ${name}`);
  return `<a href="#" class="badge badge-info result-badge" onclick="activeTab('${categoryId}')">${name}</a>`
}

const search = (type, input) => {
  let targetList = [];
  let resultDiv = document.querySelector('.search-result');
  console.log(type);
  switch (type) {
    case 'category':
      targetList = document.querySelectorAll('.category-tab');
      break;
    case 'keyword':
      targetList = document.querySelectorAll('.keyword-badge');
      break;
  }

  let results = [];
  targetList.forEach(elem => {
    if (elem.name.toLowerCase().includes(input.toLowerCase())) {
      results.push(badgeFactory(elem.id.split('-')[1], elem.name));
    }
  });

  if (results.length == 0) {
    alert('해당하는 데이터가 존재하지 않습니다.');
    resultDiv.innerHTML = '';
  } else {
    console.log(results);
    resultDiv.innerHTML = results.join('&nbsp;');
  }
}

// 키워드-카테고리 검색 폼 제출
const onSearch = () => {
  let searchForm = document.searchForm;
  let type = searchForm.searchType.value;
  let searchInput = searchForm.searchInput.value;

  if (type == 'Choose...') {
    alert('검색타입을 선택해주세요.')
  } else {
    console.log(`${searchInput} 검색...`);
    search(type, searchInput);
  }
}

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

const addCategory = () => {
  let addForm = document.addCategoryForm;

  let jsonData = {
    name: addForm.inputCategory.value
  }
  sendAjax('POST', `/category/`, JSON.stringify(jsonData), callback);
}

const deleteCategory = (id, name) => {
  let delConfirm = confirm(`${name} 카테고리를 삭제하시겠습니까? `);
  if (!delConfirm) {
    console.log('삭제취소.');
  } else {
    console.log('삭제!');
    sendAjax('DELETE', `/category/${id}`, null, callback);
  }
}