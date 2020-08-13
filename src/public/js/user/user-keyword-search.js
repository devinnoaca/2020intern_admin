import {totalKeywordCallback} from './user-total-keyword.js';
import {recommendKeywordCallback} from './user-recommend-keyword.js';

const url = window.location.href;
const urlSplit = url.split('/');
const usn = urlSplit[urlSplit.length - 1];

//토탈키워드 추가 이벤트 처리
$('[name="totalKeywordButton"]').on('click', () => {
  const eventTrigger = $('#userTotalKeywordCreate #categoryList').find('a').length;

  if(eventTrigger == 0){
    sendAjax('GET', '/keyword/data', null, totalKeywordCallback);
  }

  $('#userTotalKeywordCreate').modal('show');
});

//토탈 키워드 삭제 이벤트 처리
$('[name="totalKeywordDeleteDiv"]').on('click', function(event){
  const targetDiv = $(this);
  const target = $(event.target);
  const keywordID = target.val();

  if(target.is('[name="totalKeywordDeleteButton"]')){
    const data = {
      "id" : keywordID
    };

    sendAjax('DELETE', `/user/keyword/total/${usn}`, JSON.stringify(data), (xhr) => {
      alert(xhr.response.message);
      targetDiv.remove();
    });
  }
});

//추천키워드 추가 이벤트 처리
$('[name="recommendKeywordButton"]').on('click', () => {
  const eventTrigger = $('#userRecommendKeywordCreate #categoryList').find('a').length;
  
  if(eventTrigger == 0){
    sendAjax('GET', '/keyword/data', null, recommendKeywordCallback);
  }

  $('#userRecommendKeywordCreate').modal('show');
});

//추천 키워드 삭제 이벤트 처리
$('[name="recommendKeywordDeleteDiv"]').on('click', function(event){
  const targetDiv = $(this);
  const target = $(event.target);
  const keywordID = target.val();

  if(target.is('[name="recommendKeywordDeleteButton"]')){
    const data = {
      "id" : keywordID
    };

    sendAjax('DELETE', `/user/keyword/recommend/${usn}`, JSON.stringify(data), (xhr) => {
      alert(xhr.response.message);
      targetDiv.remove();
    });
  }
});