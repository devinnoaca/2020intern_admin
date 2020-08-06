const deleteUserCallback = (xhr) => {
  window.location.href = '/user';
}

$('tbody tr').click(function(event){
  const target = $(event.target);
  const tr = $(this);

  if(target.is('[name=deleteButton]')){
    const usn = target.val();
    sendAjax('DELETE', `/user/${usn}`, null, deleteUserCallback);
  } else {
    const td = tr.children();
    const id = td.eq(0).text();

    window.location.href = `/user/${id}`;
  }
});