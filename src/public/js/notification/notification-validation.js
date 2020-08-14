const notificationValidation = function(notification){
  const notificationReg = /^[0-9a-zA-Zㄱ-ㅎ가-힣;:._()#?!%*/\-\s]{0,50}$/;

  if(!notificationReg.test(notification.senderID)){
    alert('송신자 검색어는 50자 내외의 한/영/숫자로 입력 해주세요');
    return false;
  } 

  if(!notificationReg.test(notification.receiverID)){
    alert('수신자 검색어는 50자 내외의 한/영/숫자로 입력 해주세요');
    return false;
  }

  return true;
}

export {notificationValidation}