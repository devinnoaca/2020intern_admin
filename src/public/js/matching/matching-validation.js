//각 매칭 폼 데이터에 대한 정규표현식과 에러처리
const matchingDataValidation = (matchingData) => {
  //각 매칭 데이터에 대한 정규 표현식
  const idReg = /^[A-Za-z0-9]{5,20}/;
  const descriptionReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?%*!^\-\s]{0,1000}$/;

  if (!idReg.test(matchingData.mentor_id) || !idReg.test(matchingData.mentee_id)) {
    alert('멘토/멘티 아이디는 영문자(소문자)와 숫자 조합 5~20자리로 입력해주세요.');
    return false;
  }

  if (!descriptionReg.test(matchingData.request_message) || !descriptionReg.test(matchingData.response_message)) {
    alert('요청/응답 메시지는 총 1000자 이내로 입력해주세요.');
    return false;
  }

  return true;
}