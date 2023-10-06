// const { default: axios } = require("axios")

const urlTodos = "https://jsonplaceholder.typicode.com/todos";
const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlBus =
  "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=83139";
const APIKEY = "xHrBZD3HTbqeGcgRVnd/1A==";

// GET REQUEST

async function getWithParams(url, params) {
  const res = await axios.get(url, { params });
  showOutput(res);
}

// POST REQUEST
async function add(url, addData) {
  const res = await axios.post(url, { data: addData });
  showOutput(res);
}

// PUT/PATCH REQUEST
// PATCH UPDATE PARTIAL, PUT UPDATE AND REPLACE ALL
async function updateTodo() {
  const data = {
    title: "updated todo",
    completed: true,
  };

  const res = await axios.put(urlTodos + "/1", { data });
  showOutput(res);
}

// DELETE REQUEST
async function deleteItem(url, id) {
  const res = await axios.delete(url + "/" + id)
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  });
  console.log(res);
  showOutput(res);
}

// SIMULTANEOUS DATA
async function getAll(url) {
  const res = await axios.get(url);
  console.log(res);
  showOutput(res);
}

// CUSTOM HEADERS
async function getOne(url, id) {
  const res = await axios.get(url + "/" + id);
  showOutput(res);
}

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `

    <h5>Status: ${res.status}</h5>


  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
  
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

`;
}

// Event listeners
const params = { _limit: 6 };
const addData = {
  title: "new todo",
  completed: false,
};

document
  .getElementById("get")
  .addEventListener("click", () => getWithParams(urlTodos, params));
document
  .getElementById("post")
  .addEventListener("click", () => add(urlTodos, addData));
document.getElementById("update").addEventListener("click", updateTodo);
document
  .getElementById("delete")
  .addEventListener("click", () => deleteItem(urlTodos, 5));
document
  .getElementById("getOne")
  .addEventListener("click", () => getOne(urlTodos, 5));
document
  .getElementById("getAll")
  .addEventListener("click", () => getAll(urlTodos));
