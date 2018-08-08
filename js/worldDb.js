///////////////////////////////
//   Download World Assets   //
///////////////////////////////
function saveToJson(jsnObject, fileName) {
  
  var blob = new Blob([jsnObject], {type: "application/json"}),
      anchor = document.getElementById("autoTrigger");
  
  anchor.download = fileName;
  anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
  anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
  anchor.click();
}

