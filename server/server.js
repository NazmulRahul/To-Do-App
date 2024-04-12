require('express-async-errors');
const express = require("express");
const app = express();
const PORT = 5000;
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cookies = require("cookie-parser");
const { v4: uuid4 } = require("uuid");
require("dotenv").config();


var corsOptions = {
    origin: true,
    credentials: true,
};
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(cors(corsOptions));
app.use(express.json());
//get todo list


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const match = await pool.query(`select * from users where email=$1`, [
            email,
        ]);
        if (match.rows.length === 0) {
            return res.status(404).send({ msg: "user not found" });
        }
        const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, {
            expiresIn: "30s",
        });
        const refreshToken = jwt.sign({ email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        let user = match.rows[0];
        user = { ...user, refresh_token: refreshToken };
        const auth = await bcrypt.compare(password, user.hashed_password);
        if (auth) {
            console.log(auth);
            console.log(user);
            await pool.query(
                `update users set refresh_token=$1 where email=$2`,
                [user.refresh_token, user.email]
            );
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: 86400000,
            });
            console.log("logged in")
            res.status(200).json({ accessToken });
        }
    } catch (error) {
        return res.send(error);
    }
});

app.get('/logout',async(req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    await pool.query('update users set refresh_token=$1 where refresh_token=$2',["",refreshToken])
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(200)
})

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    // const find =await pool.query( `select email from users where email =&1`,[email])
    // console.log(find)
    try {
        const hash_password = await bcrypt.hash(password, 10);
        const response = await pool.query(
            `insert into users (email,hashed_password) values($1,$2);`,
            [email, hash_password]
        );
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.get("/test", async (req, res) => {
    console.log(req.cookies);
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken);
    try {
        const response = await pool.query(
            `select * from users where refresh_token=$1`,
            [refreshToken]
        );
        const user = response.rows[0];
        console.log(user.email);
        if (response.rows.length === 0) {
            return res.status(406).send("unauth2");
        }
        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
        if (decoded.email !== user.email) {
            res.sendStatus(400);
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(408).send(err);
    }
});
const verify = async (req, res, next) => {
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken)
    try {
        const response = await pool.query(
            `select * from users where refresh_token=$1`,
            [refreshToken]
        );
        const user = response.rows[0];
        console.log(user)
        if (response.rows.length === 0) {
            return res.status(406).send("unauth2");
        }
        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
        if (decoded.email !== user.email) {
            res.sendStatus(400);
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(408).send(err);
    }
};
app.get("/todos/:userEmail", verify, async (req, res) => {
    console.log("getdata");
    const { userEmail } = req.params;

    try {
        const todos = await pool.query(
            "SELECT * FROM todos WHERE user_email=$1",
            [userEmail]
        );
        res.json(todos.rows);
    } catch (error) {
        res.send(error);
    }
});
// create new todo
app.post("/todos", verify, async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuid4();
    console.log({ user_email });
    try {
        const post = await pool.query(
            `insert into todos(id,user_email,title,progress,date) values ($1,$2,$3,$4,$5)`,
            [id, user_email, title, progress, date]
        );
        res.send(post);
    } catch (error) {
        res.send(error);
    }
});
app.put("/todosEdit", verify, async (req, res) => {
    const { user_email, title, progress, date, id } = req.body;

    console.log({ user_email, title, progress, date, id });
    try {
        const post = await pool.query(
            `update todos set user_email=$1, title=$2, progress=$3, date=$4 where id=$5;`,
            [user_email, title, progress, date, id]
        );
        res.send(post);
    } catch (error) {
        res.send(error);
    }
});
app.delete("/todosDelete", verify, async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const dlt = await pool.query(`delete from todos where id=$1;`, [id]);
        res.send(dlt);
    } catch (error) {
        res.send(error);
    }
});
app.use(async(err,req,res,next)=>{
    res.send('hello')
})
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
