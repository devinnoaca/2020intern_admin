const searchSubmit = () => {
  const searchForm = document.searchForm;

  const mentorType = searchForm.mentorType.value;
  const mentorInput = searchForm.mentorInput.value;

  const menteeType = searchForm.menteeType.value;
  const menteeInput = searchForm.menteeInput.value;

  const state = searchForm.state.value;

  const startDate = searchForm.startDate.value;
  const endDate = searchForm.endDate.value;

  console.log('매칭검색 실행')
  console.log(mentorType);
  console.log(mentorInput);
  console.log(menteeType);
  console.log(menteeInput);
  console.log(state);
  console.log(startDate);
  console.log(endDate);
}