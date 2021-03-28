export const DEV_BOOKMARKLET =
  'javascript:(function () { var url = "http://localhost:3000/add?name=" + document.title + "&href=" + window.location.href, title = "Add Bookmark", windowOptions = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=700,left=100,top=100"; window.open(url, title, windowOptions) }())'

export const PROD_BOOKMARKLET =
  'javascript:(function () { var url = "https://app.gistmarks.io/add?name=" + document.title + "&href=" + window.location.href, title = "Add Bookmark", windowOptions = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=700,left=100,top=100"; window.open(url, title, windowOptions) }())'
