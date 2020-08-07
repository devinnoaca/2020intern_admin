window.onload = () => {

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
}

// search form
const searchSubmit = () => {
  const searchForm = document.searchForm;

  console.log('매칭검색 실행');
console.log(searchForm.isTotal.checked);
  if(searchForm.isTotal.checked) {
    console.log(' total ')
  } else {
    console.log(' not total ')
  }

  // const jsonData = {
  //   mentor_id: searchForm.mentorInput.value,
  //   mentee_id: searchForm.menteeInput.value,
  //   state: searchForm.state.value, // -1: 전체, 0: 요청, 1: 수락, 2: 거절
  //   is_total_period: searchForm.isTotal.value,
  //   start_date: searchForm.startDate.value,
  //   end_date: searchForm.end_date.value
  // };

  // console.log(jsonData);
}

