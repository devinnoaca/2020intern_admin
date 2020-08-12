const isEmptyObject = (param) => {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

const radioCheck = (radioGroup) => {
  for (let i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return true;
    }
  }
  return false;
}

// submit search form
const onSearch = () => {
  let formData = document.searchingForm;

  let startDate;
  let endDate;
  
  if(!radioCheck(formData.state)) {
    alert('상태를 선택해주세요');
    return false;
  }
  
  // 검색기간-전체 체크박스 값 확인
  if(formData.is_total.checked) {
    startDate = new Date('1970-01-01');
    endDate = new Date();
    endDate.setDate(endDate.getDate()+1);
  } else {
    // 검색기간 폼 유효성 체크.
    if(formData.startDate.value == '' || formData.endDate.value == '') {
      alert('기간을 정확히 입력해주세요');
      return false;
    } else {
      startDate = new Date(formData.startDate.value);
      endDate = new Date(formData.endDate.value);
    }
  }
    formData.start_date.value = startDate;
    formData.end_date.value = endDate;

    formData.submit();
}

const formData = document.searchingForm;
// 전체기간 체크박스 이벤트
formStartDate = formData.startDate;
formEndDate = formData.endDate;
formIsTotal = formData.is_total;
formState = formData.state;
formMentorId = formData.mentor_id;
formMenteeId = formData.mentee_id;

formData.is_total.addEventListener('change', (event) => {
  if (event.target.checked) {
    formStartDate.disabled = true;
    formEndDate.disabled = true;
  } else {
    formStartDate.disabled = false;
    formEndDate.disabled = false;
  }
});

const searchParams = getURLParams();

if(isEmptyObject(searchParams)) {
  formIsTotal.checked = true;
  formData.state[0].checked = true;
  formStartDate.disabled = true;
  formEndDate.disabled = true;
} else {
  
  formMentorId.value = searchParams.mentor_id;
  formMenteeId.value = searchParams.mentee_id;
  
  let state_id = parseInt(searchParams.state);
  formState[state_id + 1].checked = true;


  if(searchParams.is_total !== 'on') {
    formStartDate.value = searchParams.start_date;
    formEndDate.value = searchParams.end_date;
  } else {
    formIsTotal.checked = true;
    formStartDate.disabled = true;
    formEndDate.disabled = true;
  }
  
}

