import {dateObjectFactory} from '/js/matching/date-config.js';

// 라디오 인풋 폼이 체크되어있는지 확인
const radioCheck = (radioGroup) => {
  for (let i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return true;
    }
  }
  return false;
}

// 검색 폼 제출
window.onSearch = () => {
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
    convStartDate = dateObjectFactory('1970-01-01 00:00', false);
    convEndDate = dateObjectFactory([], true);
  } else {
    // 검색기간(닐짜) 폼 유효성 체크.
    if(formData.startDate.value == '' || formData.endDate.value == '') {
      alert('기간을 정확히 입력해주세요');
      return false;
    } else {
      convStartDate = dateObjectFactory(formData.startDate.value, false);
      convEndDate = dateObjectFactory(formData.endDate.value, true);
    }
  }

    formData.startDateSubmit.value = convStartDate;
    formData.endDateSubmit.value = convEndDate;

    formData.submit();
}