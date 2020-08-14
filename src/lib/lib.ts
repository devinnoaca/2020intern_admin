function pagination(result: Array<Array<Object>>, range: number, page: number): Array<Object> {
    result[0][0]['startPage'] = (range - 1) * 10 + 1 ;
    result[0][0]['endPage'] = range * 10;
    result[0][0]['startList'] = (page - 1) * 30;
    result[0][0]['prev'] = range == 1 ? false : true;
    result[0][0]['next'] = parseInt(result[0][0]['endPage']) > parseInt(result[0][0]['totalPage']) ? false : true;
    
    if (parseInt(result[0][0]['endPage']) > parseInt(result[0][0]['totalPage'])) {
			result[0][0]['endPage'] = result[0][0]['totalPage'];
			result[0][0]['next'] = false;
    }
    return result;
}

export {
  pagination
}