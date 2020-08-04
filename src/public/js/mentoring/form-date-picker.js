
// getFormatDate = (date) => {
//   var year = date.getFullYear();              //yyyy
//   var month = (1 + date.getMonth());          //M
//   month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
//   var day = date.getDate();                   //d
//   day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
//   return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
// }

$(function () {
  $('.start-date').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,	//사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
    disableTouchKeyboard: false,	//모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
    todayHighlight: true,	//오늘 날짜에 하이라이팅 기능 기본값 :false 
    language: "ko"
  }).on('changeDate', function (selected) {
    var startDate = new Date(selected.date.valueOf());
    // console.log(startDate);
    $('.end-date').datepicker('setStartDate', startDate);
    $('.end-date').datepicker('setDate', startDate);
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
});//ready end

