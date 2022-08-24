/* 
remove // "outFile": "./dist/bundle.js",  
"module": "ES2015", 
<script type="module" src="./dist/module-export/app.js" defer></script> 

 */

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

// instantiate
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
