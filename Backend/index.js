import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

const app = express();
env.config();

const options = {
    origin: 'http://localhost:5173',
    };
app.use(cors(options));

app.use(bodyParser.urlencoded({extended:true}));

const db = new pg.Client({
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DB,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT
});
db.connect();

app.get("/all", cors(), async (req,res) => {
    const result = await db.query("Select * from notes");
    return res.json(result.rows);
    next();
});

app.post("/add/:title&:content", cors(), async (req,res) => {
    const title = req.params.title;
    const content = req.params.content;
    await db.query("Insert into notes(title, content) values($1, $2)", [title, content]);
    res.status(200);
    res.json("Added");
});

app.delete("/delete/:key", cors(), async (req,res) => {
    const id = parseInt(req.params.key);
    await db.query("Delete from notes where key = $1", [id]);
    res.status(200);
    res.json("Deleted");
});

app.listen(3000, () => {
    console.log("Server is running");
})