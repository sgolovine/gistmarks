;(function () {
  var url =
    "https://gistmarks.io/add?name" +
    document.title +
    "&href=" +
    window.location.href
  var title = "Add Bookmark"

  var windowOptions =
    "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=700,left=100,top=100"

  window.open(url, title, windowOptions)
})()
