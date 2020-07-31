const sendAjax = (method, url, data, callback) => {
    // content-type을 설정하고 데이터 송신
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.responseType = 'json';
    xhr.send(data);

    // 데이터 수신이 완료되면 표시
    xhr.addEventListener('load', () => {
        callback(xhr);
    });
}