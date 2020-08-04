const deleteUser = (xhr) => {
  window.location.href = '/user';
}

$('[name=deleteButton]').on('click', (event) => {
  const usn = event.target.value;
  //(method, url, data, callback)
  sendAjax('DELETE', `/user/${usn}`, null, deleteUser);
});

$('tbody tr').click(function(){
  const tr = $(this);
  const td = tr.children();
  const id = td.eq(0).text();

  window.location.href = `/user/${id}`;
});