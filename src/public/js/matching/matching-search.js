// 전체기간 체크박스 이벤트
const isTotal = document.querySelector('#isTotal');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');

isTotal.addEventListener('change', (event) => {
  if (event.target.checked) {
    startDate.disabled = true;
    endDate.disabled = true;
  } else {
    startDate.disabled = false;
    endDate.disabled = false;
  }
})

// submit search form
const onSearch = () => {
  const searchForm = document.searchForm;

  let startDate;
  let endDate;

  let formValid = true;

  // 검색기간[전체] 체크박스 값 확인
  if(searchForm.isTotal.checked) {
    startDate = new Date('1970-01-01');
    endDate = new Date();
    endDate.setDate(endDate.getDate()+1);
  } else {
    // 검색기간 폼 유효성 체크.
    if(searchForm.startDate.value == '' || searchForm.endDate.value == '') {
      formValid = false;
      alert('기간을 정확히 입력해주세요');
    }
    startDate = new Date(searchForm.startDate.value);
    endDate = new Date(searchForm.endDate.value);
  }

    searchForm.start_date.value = startDate;
    searchForm.end_date.value = endDate;
    
    if(formValid) {
      searchForm.submit();
      return true;
    } else {
      return false;
    }
    
}

