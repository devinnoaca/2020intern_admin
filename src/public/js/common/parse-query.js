// parse query string
const getURLParams = () => {
  let params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
  return params;
}

//해당 쿼리스트링 객체가 비었는지 확인
const isEmptyObject = (param) => {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export { getURLParams, isEmptyObject }