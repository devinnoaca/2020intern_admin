//삭제 버튼 처리 이벤트
$('tbody tr').on('click', function(event){
  const tr = $(this);
  const target = $(event.target);
  const td = tr.children();
  const id = td.eq(0).text();
  
  if(target.is('[name="deleteButton"]')){    
    sendAjax('DELETE', `/notification/${id}`, null, (xhr) => {
      alert(xhr.response.message);
      window.location.href = '/notification';
    });
  }
});