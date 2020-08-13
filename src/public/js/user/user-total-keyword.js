const url = window.location.href;
const urlSplit = url.split('/');
const usn = urlSplit[urlSplit.length - 1];

//토탈 키워드 모달 클릭시 콜백
const totalKeywordCallback = function(xhr){
  const keywords = xhr.response.keywords;

  Object.keys(keywords).forEach(function(elem, index){ 
    const categoryID = elem.split('_')[0];
    const categoryName = elem.split('_')[1];
    
    const categoryTemplate = `<a class=list-group-item list-group-item-action category-tab
                            data-toggle="list" id="tab-${categoryID}" name="${categoryName}" 
                            href="#total-category-${categoryID}" role="tab" style="text-transform: capitalize;">
                            ${categoryName}</a>`;
    
    const keywordPanelTemplate = `<div class="tab-pane" id="total-category-${categoryID}" role="tabpanel"></div>`;
    
    //카테고리, 키워드 템플릿 추가
    $('#userTotalKeywordCreate #categoryList').append(categoryTemplate);
    $('#userTotalKeywordCreate #keywordList').append(keywordPanelTemplate);
  
    //키워드 추가 함수
    keywords[elem].forEach(function(key){
      const keywordTemplate = `<button class="btn btn-info btn-sm mx-1 my-1" name="keywordButton" value="${key.keywordID}">
                                ${key.keywordName}
                              </button>`;
      $(`#userTotalKeywordCreate #total-category-${categoryID}`).append(keywordTemplate);
    });
  });//모달에 데이터 추가하는 함수 end

  //모달의 키워드를 클릭했을 때 이벤트 처리
  $('#userTotalKeywordCreate [name="keywordButton"]').on('click', function(event){
    const keywordID = $(this).val();
    const keywordName = $(this).text();
    const data = {
      "id" : keywordID
    };

    //컨트롤러에 키워드 추가 요청
    sendAjax('POST', `/user/keyword/total/${usn}`, JSON.stringify(data), (xhr) => {
      const status = xhr.status;

      const totalKeywordTemplate = `<div class="btn-group mx-1 my-1" name="totalKeywordDeleteDiv">
                                          <button class="form-control btn btn-info" type="button">
                                            <h5>${keywordName}</h5>
                                          </button>
                                          <button class="btn btn-outline-info" value="${keywordID}"
                                          name="totalKeywordDeleteButton">
                                            X
                                          </button>
                                        </div>`;

      if (status === 200) {
        const message = xhr.response.message;
        alert(message);

        //토탈 키워드 컨트롤러에 추가 요청 후 성공시에 키워드 컴포넌트 추가 
        $('[name="totalKeywordDiv"]').append(totalKeywordTemplate);

        //추가된 토탈 키워드 컴포넌트에 대한 삭제 이벤트 추가
        $('[name="totalKeywordDeleteDiv"]:last-child').on('click', function (event) {
          const targetDiv = $(this);
          const target = $(event.target);
          const keywordID = target.val();

          if (target.is('[name="totalKeywordDeleteButton"]')) {
            const data = {
              "id": keywordID
            };

            sendAjax('DELETE', `/user/keyword/total/${usn}`, JSON.stringify(data), (xhr) => {
              alert(xhr.response.message);
              targetDiv.remove();
            });
          }
        });//추가된 토탈 키워드 컴포넌트에 대한 삭제 이벤트 end
      } else if(status === 500) {
        alert('토탈 키워드에 이미 존재하는 키워드입니다.');
      }
    });//모달의 키워드 버튼 클릭시 이벤트

  });//모달 이벤트 end
}

export {totalKeywordCallback}