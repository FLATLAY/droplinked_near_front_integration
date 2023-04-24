const url = window.location.href;
const urlParser = new URL(url);
const urlSearchParams = new URLSearchParams(urlParser.search);
export {urlSearchParams}