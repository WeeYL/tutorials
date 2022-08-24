let result;

/* #region targets*/
// currentTarget : the div that the eventlistener is triggered
// target: the element in the div that is clicked
// relatedTarget : get the previous mouseover element
function onTargetClick(e) {
  theTargetContent.innerHTML = `current target: ${e.currentTarget.nodeName} target: ${e.target.nodeName}`;
}
function onTargetMouseOver(e) {
  console.log("related target: ", e.relatedTarget.nodeName);
  theTargetContent.innerHTML = " related target: " + e.relatedTarget.nodeName;
}

const theTarget = document.getElementById("theTarget");
const theTargetContent = document.getElementById("theTargetContent");

theTarget.setAttribute("onclick", "onTargetClick(event)");
theTarget.setAttribute("onmouseover", "onTargetMouseOver(event)");

/* #endregion */

/* #region dragdrop*/
function onDragEnter(ev) {
  console.log(`onDragEnter`);
}
function onDragStart(ev) {
  // set data
  ev.dataTransfer.setData("text", ev.target.id);
}

function onDragOver(ev) {
  // drag and drop operation
  ev.preventDefault();
  ev.currentTarget.style.background = "lightyellow";
}
function onDrop(ev) {
  // drag and drop operation
  ev.preventDefault();
  data = ev.dataTransfer.getData("text"); // from dragstart
  ev.currentTarget.append(document.getElementById(data));
}

const dragDiv = document.getElementById("dragDiv");
dragDiv.setAttribute("draggable", true);
dragDiv.setAttribute("ondragstart", "onDragStart(event)");

const dropDiv = document.getElementById("dropDiv");
dropDiv.setAttribute("ondragover", "onDragOver(event)");
dropDiv.setAttribute("ondragenter", "onDragEnter(event)");
dropDiv.setAttribute("ondrop", "onDrop(event)");

/* #endregion */

/* #region exercise countng 4x4 */

let counts = 4;
let lastCount = 0;

for (let index = 0; index < counts; index++) {
  // create divs and set id
  let div = document.createElement("div");
  div.setAttribute("id", "counting" + index);
  document.getElementById("counting").append(div);

  // items counting loop
  let liste = [];
  for (let item = 0; item < counts; item++) {
    liste.push(lastCount + item);
  }

  // add multiples to counting
  lastCount += counts;

  // go to each div add items
  let id = "counting" + index.toString();
  document.getElementById(id).innerHTML = liste;
}
/* #endregion */

/* #region exercise create 4x4 boxes*/

let myStyle = {
  "background-color": "green",
  width: "25px",
  height: "25px",
  "margin-left": "5px",
  display: "inline-block",
};

counts = 4;
lastCount = 0;
let boxes = document.getElementById("boxes");

// boxes list create 4x box
for (let boxId = 0; boxId < counts; boxId++) {
  let box = document.createElement("div"); // create self
  box.setAttribute("id", "box" + boxId);
  boxes.append(box); // append to parent

  // each box create 4 squares
  for (let squareId = 0; squareId < counts; squareId++) {
    let square = document.createElement("div");
    document.getElementById("box" + boxId).append(square);
    Object.assign(square.style, myStyle);
  }
}
/* #endregion */

/* #region event target*/

function getEvent(event) {
  //  console.log(event); //returns mouseevent
  document.getElementById("eventTarget").innerHTML = event.target.innerHTML;
}

// mouse event

result = document.querySelectorAll("p.mouseEvent");
result.forEach((n) => {
  n.style.border = "1px solid red";
});

document.getElementById("demo5").addEventListener("click", function () {
  document.getElementById("demo5").innerHTML = "Hello Demo 5";
});

// mouse event

function demo6() {
  document.getElementById("demo6").innerHTML = "Hello Demo 6";
}
/* #endregion */

/* #region textbox value*/

function getText() {
  document.getElementById("demo2").innerHTML =
    document.getElementById("searchTxt").value;
}

// check box value
function getGender() {
  let genderList = document.getElementsByName("gender");
  for (n = 0; n < genderList.length; n++) {
    if (genderList[n].checked) {
      document.getElementById("checkBox").innerHTML = genderList[n].value;
    }
  }
}

/* #endregion */

/* #region querySelectorAll */

result = document.querySelectorAll("div");
document.getElementById("findAllDivs").innerHTML =
  "total number of divs here: " + result.length;

result = document.querySelectorAll("div.findAllClass1");
console.log(result);
result.forEach((n) => (n.innerHTML = "find all class")); // must use loop to change innerHTML

// loop
result = document.querySelectorAll("div.findAllClass2");
result.forEach((n) => {
  n.innerHTML = "looped and innerhtml changed";
});

// create and append element

result = document.createElement("button"); //create self
result.append("click");
document.getElementById("createElement").append(result); // append to parent

result = document.createElement("p");
result.className = "someClass";
document.getElementById("createElement").append(result);
result.innerHTML = "created element paragraph";
/* #endregion */

/* #region Changing HTML Elements*/

document
  .getElementById("mylink1")
  .setAttribute("href", "https://www.google.com.sg/");
document.getElementById("mylink2").style.color = "red";
/* #endregion */

/* #region demo1 Finding HTML Elements*/

result = "innerHTML";
document.getElementById("demo1").innerHTML = result;
document.getElementsByClassName("example")[0].innerHTML = result;
/* #endregion */

/* #region template*/

let template = document.getElementById("template");
let host = document.getElementById("template-host");
let content = document.importNode(template.content, true); // make a copy
host.append(content);
/* #endregion */

// loadScript
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  // <head>
  //   <script src = "./tutorial-DOM-script-temp.js">
  //   </script>
  // </head>
  let script = document.createElement("script");
  script.src = src;
  document.head.append(script);
}
