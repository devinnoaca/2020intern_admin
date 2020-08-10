// checkbox check event
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
    // for(let key in elem) {
    //   console.log(`${key} : ${elem[key]}`);
    //   result += `<td>${elem[key]}</td>`;
    // }
    result += '</tr>\n';
  });

  document.getElementById('resultCount').innerHTML = `Total ${data.length}`;
  
  let dataTable = document.getElementById(`dataBody`);
  if(data.length == 0) {
    dataTable.innerHTML = '<td colspan="7">조건에 해당되는 데이터가 없습니다.</td>';
  } else {
    dataTable.innerHTML = result;
    tableClickEvent();
  }  
  
 }


const searchMatchingCallback = (xhr) => {
  console.log(xhr.response.message);
  if(xhr.status == 200) {
    console.log(xhr.response.result);
    renderResult(xhr.response.result);
  } else {
    alert(`매칭 조회실패 [${xhr.status}]`);
    console.log(xhr.response.message);
  }
  
  // window.location.href = '/keyword';
}


// search form
const onSearch = () => {
  const searchForm = document.searchForm;

  let formValid = true;
  let startDate;
  let endDate;
  if(searchForm.isTotal.checked) {
    startDate = new Date('1970-01-01');
    endDate = new Date();
    endDate.setDate(endDate.getDate()+1);
  } else {
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

