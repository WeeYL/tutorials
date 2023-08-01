import express from "express";
import mysql from "mysql2";
import cors from "cors";

const pool = mysql.createPool({
  host:"sql6.freemysqlhosting.net",
  user:"sql6636405",
  database:"sql6636405",
  password:"7PJmXEsZT9",
}).promise()

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

async function getPost (id){
 const [rows] = await pool.query(
   `SELECT * FROM posts WHERE id = ?;`,
   [id]
 );
 return rows[0]  
} 

async function getAllPosts (id){
  const [rows] = await pool.query(
    `SELECT * FROM posts;`
  );
  console.log( rows)
  return rows
 } 


async function addPost(caption, image) {
  const [result] = await pool.query (
    `INSERT INTO posts (caption, image) 
    VALUES (?,?);`,
    [caption, image] 
  );
  const id=result.insertId
  return getPost(id)
}

async function updatePost(id,caption,image) {
  await pool.query (`
    UPDATE posts
    set caption = ?, image = ?
    where id = ?;`,
    [caption,image,id]
    )
    return getPost(id)
}

async function deletePost(id) {
  await pool.query (`
    DELETE FROM posts where id = ?;`,
    [id]
    )

}

app.get("/", async (req,res)=>{
  const {caption, image} = req.body
  res.send({caption, image}).status(202);
})

app.get("/posts", async (req,res)=>{
  const {caption, image} = req.body
  const posts = await getAllPosts()
  console.log("all posts from pcweb5-api:",posts);
  res.send(posts).status(202);
})

app.post("/add", async (req,res)=>{
  const {caption, image} = req.body
  const post = await addPost(caption,image)
  console.log("post added:",post);
  res.send(post).status(202);
})

app.get("/post/:id", async (req,res)=>{
  const post = await getPost(req.params.id)
  res.send(post).status(202)
})


app.put("/post/:id", async (req,res)=>{
  const id = req.params.id
  const {caption, image} = req.body
  const updatedPost = await updatePost(id, caption, image)
  res.send(updatedPost).status(202)
})

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  const deletedPost = await deletePost(id) 
  res.send({status:"deleted"}).status(202);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} and click here http://localhost:${port}/`);
});

