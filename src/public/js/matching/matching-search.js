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


// 검색결과 렌더링
const renderResult = (data) => {
  let result = '';

  data.forEach(elem => {
    result += '<tr>';
    result += `
    <td name="id">${elem.id}</td>\n
    <td name="mentor" id="${elem.mentor_USN}">${elem.mentor_ID}</td>\n
    <td name="mentee" id="${elem.mentee_USN}">${elem.mentee_ID}</td>\n
    <td name="requestTime">${elem.request_time}</td>\n
    <td name="isChecked">${elem.is_checked}</td>\n
    <td name="state">${elem.state}</td>\n
    <td></td>\n
    `;
    result += '</tr>\n';
  });

  //검색결과의 총 개수 표시
  document.getElementById('resultCount').innerHTML = `Total ${data.length}`;
  
  let dataTable = document.getElementById(`dataBody`);
  if(data.length == 0) {
    dataTable.innerHTML = '<td colspan="7">조건에 해당되는 데이터가 없습니다.</td>';
  } else {
    dataTable.innerHTML = result;
    tableClickEvent();
  }  
 }

// 매칭정보 검색 API callback
const searchMatchingCallback = (xhr) => {
  console.log(xhr.response.message);
  if(xhr.status == 200) {
    console.log(xhr.response.result);
    renderResult(xhr.response.result);
  } else {
    alert(`매칭 조회실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
}

// submit search form
const onSearch = () => {
  const searchForm = document.searchForm;

  let formValid = true;
  let startDate;
  let endDate;

  // 검색기간[전체] 체크박스 값 확인
  if(searchForm.isTotal.checked) {
    startDate = new Date('1970-01-01');
    endDate = new Date();
    endDate.setDate(endDate.getDate()+1);
  } else {
    // 검색기간 폼 유효성 체크.
    if(searchForm.startDate.value == '' || searchForm.endDate.value == '') {
      alert('기간을 정확히 입력해주세요');
      formValid = false;
    }
    startDate = new Date(searchForm.startDate.value);
    endDate = new Date(searchForm.endDate.value);
  }

  if(formValid) {
    const jsonData = {
      mentor_id: searchForm.mentorInput.value,
      mentee_id: searchForm.menteeInput.value,
      state: searchForm.state.value, // -1: 전체, 0: 요청, 1: 수락, 2: 거절
      start_date: startDate,
      end_date: endDate
    };
  
    console.log(jsonData);
    sendAjax('POST', `/matching/search`, JSON.stringify(jsonData), searchMatchingCallback);
  }
}

