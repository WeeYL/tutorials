import express from "express";
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "athletes",
  })
  .promise();

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

async function getPlayers() {
  const [rows] = await pool.query("SELECT * FROM players;");
  return rows;
}

async function getPlayer(id) {
  const [rows] = await pool.query(
    `
        SELECT * FROM players
        WHERE id = ?
        `,
    [id]
  );
  return rows;
}

async function addPlayer(name, description, image) {
  const [result] = await pool.query(
    `INSERT INTO players (name, description, image)
         VALUES (?, ?, ?)`,
    [name, description, image]
  );
  const id = result.insertId;
  return getPlayer(id), result;
}

async function updatePlayer(name, description, image, id) {
  const [result] = await pool.query(
    `
        UPDATE players
        SET name=?, description=?, image=?
        WHERE id=? 
        `,
    [name, description, image, id]
  );
}

async function deletePlayer(id) {
  const [result] = await pool.query(`DELETE FROM players WHERE id = ?`, [id]);
}

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
app.get("/add", async (req, res) => {
  res.render("add.ejs");
});

app.post("/add", async (req, res) => {
  const { name, description, image } = req.body;
  const note = await addPlayer(name, description, image);
  console.log(note);
  res.redirect("/");
});

// app.get("/", async (req, res) => {
//   const players = await getPlayers();
//   res.render("index.ejs", { players });
// });
app.get("/", async (req, res) => {
    const players = await getPlayers();
    res.send({status:"success"}).status(202);
  });

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await deletePlayer(id);
  res.redirect("/");
});

app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, image } = req.body;
  console.log(name, description);
  console.log(`updated: ${player}`);
  await updatePlayer(name, description, image, id);
  res.redirect("/");
});
app.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  const player = await getPlayer(id);

  res.render("update.ejs", { player: player[0] }); // render ejs and pass object
});
