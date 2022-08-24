/* create <Script> 
<Script src = src>
<head></head>
*/
function loadScript(src) {
  let script = document.createElement("script"); // create a tag
  script.src = src; // set property to tag
  document.head.append(script); // output into the document head
}

// add JS script below

loadScript("./dist/tutorial/app-01.js");
// loadScript("./dist/app2-decorators.js");
loadScript("./dist/tutorial/app-x-eg.js");
loadScript("./dist/test.js");



