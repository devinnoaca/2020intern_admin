
const setDatePicker = () => {
    $('.start-date').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,	//사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
      disableTouchKeyboard: false,	//모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
      todayHighlight: true,	//오늘 날짜에 하이라이팅 기능 기본값 :false 
      language: "ko"
    }).on('changeDate', function (selected) {
      var startDate = new Date(selected.date.valueOf());
      $('.end-date').datepicker('setStartDate', startDate);
    }).on('clearDate', function (selected) {
      $('.end-date').datepicker('setStartDate', null);
    });
  
    $('.end-date').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
      disableTouchKeyboard: false,
      todayHighlight: true,
      language: "ko"
    }).on('changeDate', function (selected) {
      var endDate = new Date(selected.date.valueOf());
      $('.start-date').datepicker('setEndDate', endDate);
    }).on('clearDate', function (selected) {
      $('.start-date').datepicker('setEndDate', null);
    });
  }

  const dateObjectFactory = (date, isEnd) => {
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
    if (isEnd) {
      return new moment(date).endOf('day').format(DATE_FORMAT);
    } else {
      return new moment(date).format(DATE_FORMAT);
    } 
  }

  setDatePicker();