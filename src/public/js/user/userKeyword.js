//토탈키워드 추가 이벤트 처리
$('[name="totalKeywordButton"]').on('click', () => {
  const eventTrigger = $('#categoryList').find('a').length;
  
  if(eventTrigger == 0){
    sendAjax('GET', '/keyword', null, keywordCallback);
  }

  $('#userKeywordCreate').modal('show');
});

//추천키워드 추가 이벤트 처리
$('[name="recommendKeywordButton"]').on('click', () => {
  const eventTrigger = $('#categoryList').find('a').length;
  
  if(eventTrigger == 0){
    sendAjax('GET', '/keyword', null, keywordCallback);
  }

  $('#userKeywordCreate').modal('show');
});

const keywordCallback = function(xhr){
  const keywords = xhr.response.keywords;

  Object.keys(keywords).forEach(function(elem, index){ 
    const categoryID = elem.split('_')[0];
    const categoryName = elem.split('_')[1];
    const categoryTemplate = `<a class=list-group-item list-group-item-action category-tab
                            data-toggle="list" id="tab-${categoryID}" name="${categoryName}" 
                            href="#category-${categoryID}" role="tab" style="text-transform: capitalize;">
                            ${categoryName}</a>`;
    console.log(categoryTemplate);
    const keywordPanelTemplate = `<div class="tab-pane" id="category-${categoryID}" role="tabpanel"></div>`;
    
    $('#categoryList').append(categoryTemplate);
    $('#keywordList').append(keywordPanelTemplate);
  
    keywords[elem].forEach(function(key){
      const keywordTemplate = `<button class="btn btn-info btn-sm mx-1 my-1" name="keywordButton" value="${key.keywordID}">
                                ${key.keywordName}
                              </button>`;
      $(`#category-${categoryID}`).append(keywordTemplate);
    });
  });

  $('[name="keywordButton"]').on('click', function(event){
    const keywordID = $(this).val();
    const data = {
      "id" : keywordID
    };

    sendAjax('POST', `/user/keyword/total/${usn}`, JSON.stringify(data), (xhr) => {
      alert(xhr.response.message);
    });
  });
}

// router.post('/keyword/recommend/:usn', createUserRecommendKeyword);
// router.delete('/keyword/recommend/:usn', deleteUserRecommendKeyword);
// router.post('/keyword/total/:usn', createUserTotalKeyword);
// router.delete('/keyword/total/:usn', deleteUserTotalKeyword);


const keywordClickEvent = function(event){

}