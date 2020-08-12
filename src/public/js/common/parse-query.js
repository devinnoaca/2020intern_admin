// parse query string
const getURLParams = () => {
  let params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
  return params;
}