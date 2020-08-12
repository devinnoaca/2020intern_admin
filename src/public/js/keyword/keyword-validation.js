//각 유저 폼 데이터에 대한 정규표현식과 에러처리
const keywordDataValidation = (keywordData) => {
  //각 유저 데이터에 대한 정규 표현식
  const keywordReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?%*!\-\s]{1,20}$/;
  const referenceReg = /^[0-9]/;

  if (!keywordReg.test(keywordData.name)) {
    alert('허용되지 않은 특수문자 또는 자리 수입니다.');
    return false;
  }
  if (!referenceReg.test(keywordData.categoryID)) {
    alert('허용되지 않은 카테고리 값입니다.')
    return false;
  }
  return true;
}

const categoryDataValidation = (categoryData) => {
  const CategoryReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?%*!\-\s]{1,20}$/;

  if (!CategoryReg.test(categoryData.name)) {
    alert('허용되지 않은 특수문자 또는 자리 수입니다.');
    return false;
  }
  return true;
}