// 검색된 결과 클릭 시, 해당 값이 존재하는 탭 활성화
const activeTab = (categoryId) => {
  $(`#myList a[href='#category-${categoryId}']`).tab("show");
}

// badge 태그 생성함수 (검색결과 뱃지)
const badgeFactory = (categoryId, name) => {
  // console.log(`run badgeFactory -> ${categoryId} | ${name}`);
  return `<a href="#" class="badge badge-info result-badge" onclick="activeTab('${categoryId}')">${name}</a>`
}

// 검색 로직
const search = (type, input) => {
  
  let resultDiv = document.querySelector('.search-result');
  console.log(`${type} search`);

  // 타입에 따라 각 데이터들 가져옴.
  let targetList = [];  
  switch (type) {
    case 'CATEGORY':
      targetList = document.querySelectorAll('.category-tab');
      break;
    case 'KEYWORD':
      targetList = document.querySelectorAll('.keyword-badge');
      break;
  }

  // 가져온 데이터 중 검색인자에 해당하는 데이터 추출.
  let results = [];
  targetList.forEach(elem => {
    if (elem.name.toLowerCase().includes(input.toLowerCase())) {
      results.push(badgeFactory(elem.id.split('-')[1], elem.name));
    }
  });

  // 검색결과 분기처리 및 표시.
  if (results.length == 0) {
    alert('해당하는 데이터가 존재하지 않습니다.');
    resultDiv.innerHTML = '';
  } else {
    resultDiv.innerHTML = results.join('&nbsp;');
  }
}

// 키워드-카테고리 검색 폼 체크
const onSearch = () => {
  let searchForm = document.searchForm;
  let type = searchForm.searchType.value;
  let searchInput = searchForm.searchInput.value;

  if (type == 'NONE') {
    alert('검색타입을 선택해주세요.')
  } else {
    search(type, searchInput);
  }
}
