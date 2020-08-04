const deleteUser = (xhr) => {
  window.location.href = '/user';
}

$('[name=updateButton]').on('click', (event) => {
  const usn = event.target.value;
  window.location.href = `user/${usn}`;
});

$('[name=deleteButton]').on('click', (event) => {
  const usn = event.target.value;
  //(method, url, data, callback)
  sendAjax('DELETE', `/user/${usn}`, null, deleteUser);
});