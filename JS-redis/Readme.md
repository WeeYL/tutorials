### Module
npm i express nodemon axios
npm i redis@3.0.0

### install and run redis server
> brew install redis 
> redis-server

### redis cli
redis-cli shutdown
redis-cli ping
redis-cli flushall

# postman index1.js
http://localhost:8080

POST
{
    "k":"key",
    "v":"value"
}

GET 
(note: run post before run GET)
{
    "key":"key"
}


### postman index2.js
GET https://jsonplaceholder.typicode.com/posts/2

### Start
redis-server
npm run start (update the package.json script to point to correct index<number>.js)

