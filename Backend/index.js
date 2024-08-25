import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
env.config();

app.use(bodyParser.urlencoded({extended:true}));

const db = new pg.Client({
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DB,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT
});
db.connect();

app.get("/all", async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const result = await db.query("Select * from notes");
    console.log(result);
    return res.json(result.rows);
    next();
});

app.post("/add/:title&:content", async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const title = req.params.title;
    const content = req.params.content;
    await db.query("Insert into notes(title, content) values($1, $2)", [title, content]);
    res.status(200);
    res.json("Added");
});

app.delete("/delete/:id", async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = parseInt(req.params.id);
    await db.query("Delete from notes where id = $1", [id]);
    res.status(200);
    res.json("Deleted");
});

app.listen(3000, () => {
    console.log("Server is running");
})