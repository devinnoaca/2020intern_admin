

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
  data.forEach((elem, index) => {
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
  // console.log(result);

  let dataTable = document.getElementById(`dataBody`);
    dataTable.innerHTML = result;
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

  let startDate;
  let endDate;
  if(searchForm.isTotal.checked) {
    console.log('total');
    startDate = new Date('1970-01-01');
    endDate = new Date();
  } else {
    console.log('not total');
    startDate = new Date(searchForm.startDate.value);
    endDate = new Date(searchForm.endDate.value);
  }

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

