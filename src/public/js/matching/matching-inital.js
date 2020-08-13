import { setDatePicker } from '/js/matching/date-config.js';
import { getURLParams, isEmptyObject } from '/js/common/parse-query.js';

// init datepicker
setDatePicker();

// init search form
const formData = document.searchingForm;
// 전체기간 체크박스 이벤트
let formStartDate = formData.startDate;
let formEndDate = formData.endDate;
let formIsTotal = formData.isTotal;
let formState = formData.state;
let formMentorID = formData.mentorID;
let formMenteeID = formData.menteeID;

formData.isTotal.addEventListener('change', (event) => {
  if (event.target.checked) {
    formStartDate.disabled = true;
    formEndDate.disabled = true;
  } else {
    formStartDate.disabled = false;
    formEndDate.disabled = false;
  }
});

// init search form data (querystring)
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
    $('.start-date').datepicker('setDate', new Date(searchParams.startDateSubmit.substr(0,10)));
    $('.end-date').datepicker('setDate', new Date(searchParams.endDateSubmit.substr(0,10)));
  } else {
    formIsTotal.checked = true;
    formStartDate.disabled = true;
    formEndDate.disabled = true;
  }
  
}