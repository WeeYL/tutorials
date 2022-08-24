/* create <Script> 
<Script src = src>
<head></head>
*/
function loadScript(src) {
    let script = document.createElement('script'); // create a tag
    script.src = src; // set property to tag
    document.head.append(script); // output into the document head
  }

  // add JS script below
  
  // loadScript('./tutorial-JS-Promise-1-callback.js') // run this independently because of timeout
  // loadScript('./tutorial-JS-Promise-2.js') // run this independently because of timeout
  // loadScript('./tutorial-JS-Promise-3.js') // run this independently because of timeout
  // loadScript('./tutorial-JS-Promise-4-async.js') // run this independently because of timeout
  
  // loadScript('./tutorial-JS-hoisting.js') 
  loadScript('./tutorial-JS-object-methods.js') 
  // loadScript('./tutorial-JS-closure.js') 
  // loadScript('./tutorial-JS.js')
  // loadScript('./tutorial-Object.js')
  // loadScript('./test.js')

