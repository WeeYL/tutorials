### To Run
- run: nodemon app?-???.js

### App2
- run localhost in postman
- GET localhost:3000/courses/
- uncomment createCourse() to add new collection and new course.

### App3
- set environment in terminal for production: $env:NODE_ENV="production"
- middleware resource http://expressjs.com/en/resources/middleware.html

### mongodb
- download from https://www.mongodb.com/try/download/community
- download from https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools > copy into mongodb/bin 
- during installation: check mongoDB compass
- mongo compass > fill in individually > hostname: localhost

- environment variables > system variables > path > edit > new > C:\Program Files\MongoDB\Server\4.4\bin
- create a database storage folde > cmd > md c:\data\db
- npm i mongoose
- cmd > mongoimport --db mongo-exercises --collection courses --file exercise-data.json --jsonArray

### mongodb run
- cmd > mongod
- terminal > node index.js (instead of nodemon to avoid recursive running ) 

## libraries
- npm install --save-dev jest
- npm install supertest --save-dev
