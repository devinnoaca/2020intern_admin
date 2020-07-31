const createTableHead = (attributes, targetId) => {
    let head = '<thead><tr>';
    
    for(let i = 0; i < attributes.length; ++i){
        head += `<th>${attributes[i]}</th>`;
    }

    head += '</tr></thead>';
    let dataTable = document.getElementById(`dataTable`);
    dataTable.innerHTML += head;
}

const createTableBody = (data, dataColumn) => {
    let body = '<tbody>';

    for(let i = 0; i < data.length; ++i) {
        body += '<tr>';
        for(let dataIndex = 0; dataIndex < dataColumn; ++dataIndex){
            body += `<td>${data[dataIndex]}</td>`;
        }
        body += '</tr>';
    }

    body += '</tbody>';
}

const createTableBodyWithButton = (data, dataColumn, buttonColumn ,buttons) => {
    let body = '<tbody>';

    for(let i = 0; i < data.length; ++i) {
        body += '<tr>';
        
        for(let dataIndex = 0; dataIndex < dataColumn; ++dataIndex){
            body += `<td>${data[dataIndex]}</td>`;
        }

        body += '</tr>';
    }

    body += '</tbody>';
}