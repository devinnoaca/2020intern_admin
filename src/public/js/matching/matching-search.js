//해당 객체가 비었는지 확인(쿼리스트링 객체)
const isEmptyObject = (param) => {
  return Object.keys(param).length === 0 && param.constructor === Object;
}
// 라디오 인풋 폼이 체크되어있는지 확인
const radioCheck = (radioGroup) => {
  for (let i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return true;
    }
  }
  return false;
}

// 날짜포맷 변환(yyyy-mm-dd HH:MM)
const dateFormatConvert = (date) => {
  return (new Date(date)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ");
}

// 검색 폼 제출
const onSearch = () => {
  let formData = document.searchingForm;

  let convStartDate; //converted start date
  let convEndDate;
  
  //라디오 인풋 폼 유효성 체크
  if(!radioCheck(formData.state)) {
    alert('상태를 선택해주세요');
    return false;
  }
  
  // 검색기간(전체) 체크박스 값 체크
  if(formData.isTotal.checked) {
    convStartDate = new Date('1970-01-01');
    convEndDate = new Date();
    convEndDate.setDate(convEndDate.getDate()+1);
  } else {
    // 검색기간(닐짜) 폼 유효성 체크.
    if(formData.startDate.value == '' || formData.endDate.value == '') {
      alert('기간을 정확히 입력해주세요');
      return false;
    } else {
      convStartDate = new Date(formData.startDate.value);
      convEndDate = new Date(formData.endDate.value);
    }
  }
    formData.startDateSubmit.value = dateFormatConvert(convStartDate);
    formData.endDateSubmit.value = dateFormatConvert(convEndDate);

    formData.submit();
}


const formData = document.searchingForm;
// 전체기간 체크박스 이벤트
formStartDate = formData.startDate;
formEndDate = formData.endDate;
formIsTotal = formData.isTotal;
formState = formData.state;
formMentorID = formData.mentorID;
formMenteeID = formData.menteeID;

formData.isTotal.addEventListener('change', (event) => {
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
  
  formMentorID.value = searchParams.mentorID;
  formMenteeID.value = searchParams.menteeID;
  
  let state_id = parseInt(searchParams.state);
  formState[state_id + 1].checked = true;


  if(searchParams.isTotal !== 'on') {
    formStartDate.value = searchParams.startDateSubmit;
    formEndDate.value = searchParams.endDateSubmit;
  } else {
    formIsTotal.checked = true;
    formStartDate.disabled = true;
    formEndDate.disabled = true;
  }
  
}

