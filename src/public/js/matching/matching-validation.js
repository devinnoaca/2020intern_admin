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

  //유저 상세페이지의 유저 기본정보 데이터에 대한 정규표현식 처리
//   const userDetailDataValidation = function(userData) {
//     const idReg = /^[A-Za-z0-9]{5,20}/;
//     const nameReg = /^[가-힣]{1,40}$/;
//     const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//     const passwordReg =  /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,20}$/;
//     const companyReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?!%*-]{0,50}$/;
//     const descriptionReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?%*!\-\s]{0,1000}$/;

//     if(!idReg.test(userData.id)){
//       alert('id는 영문자(소문자)와 숫자 조합 5~20자리로 입력해주세요.');
//       return false;
//     }

//     if(userData.type < 0 || userData.type > 2){
//       alert('잘못된 유저 타입입니다. 다시 선택해 주세요.');
//       return false;
//     }

//     if(!nameReg.test(userData.name)){
//       alert('이름은 한글로 1~40자리로 입력해주세요.');
//       return false;
//     }

//     if(!emailReg.test(userData.email)){
//       alert('유효하지 않은 이메일 형식 입니다. 다시 입력해주세요.');
//       return false;
//     }

//     if(userData.permission < -1 || userData.permission > 2){
//       alert('잘못된 유저 권한 입니다. 다시 선택해주세요.');
//       return false;
//     }

//     if(userData.password != null && !passwordReg.test(userData.password)){
//       alert('비밀번호는 영어 소문자, 특수문자, 숫자를 포함해 총 4~20자리로 입력해주세요.');
//       return false;
//     }

//     if(!companyReg.test(userData.company)){
//       alert('회사는 총 50자리 이내로 입력해주세요.');
//       return false;
//     }

//     if(!descriptionReg.test(userData.description)){
//       alert('소개는 총 1000자 이내로 입력해주세요.');
//       return false;
//     }

//     return true;
//   }