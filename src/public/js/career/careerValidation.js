//유저 경력에 대한 정규표현식 처리
const careerValidation = function(career) {

  const careerReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?%*!\-\s]{1,200}$/;

  if(!careerReg.test(career)){
    alert('경력은 200자 이내로 입력해주세요.');
    return false;
  }

  return true;
}

export { careerValidation }