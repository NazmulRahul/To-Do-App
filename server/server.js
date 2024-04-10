const express = require("express");
const app = express();
const PORT = 5000;
const pool = require("./db");
const cors = require("cors");
const { v4: uuid4 } = require("uuid");

app.use(cors());
app.use(express.json());
//get todo list
app.get("/todos/:userEmail", async (req, res) => {
    const { userEmail } = req.params;
    
    try {
        const todos = await pool.query("SELECT * FROM todos WHERE user_email=$1",[userEmail]);
        res.json(todos.rows);
    } catch (error) {
       res.send(error)
    }
});
// create new todo
app.post("/todos", async (req, res) => {
    const { user_email, title, progress, date} = req.body;
    const id = uuid4();
    console.log({user_email})
    try {
      const post=await pool.query(
            `insert into todos(id,user_email,title,progress,date) values ($1,$2,$3,$4,$5)`,
            [id, user_email, title, progress, date]
        );
        res.send(post)
    } catch (error) {
        res.send(error)
    }
});
app.put("/todosEdit",async(req,res)=>{
    const { user_email, title, progress, date,id} = req.body;

    console.log( { user_email, title, progress, date,id})
    try {
      const post=await pool.query(
        `update todos set user_email=$1, title=$2, progress=$3, date=$4 where id=$5;`,[user_email,title,progress,date,id]
        );
        res.send(post)
    } catch (error) {
        res.send(error)
    }
})
app.delete('/todosDelete',async(req,res)=>{
    const {id}=req.body
    console.log(id)
    try{
        const dlt=await pool.query(
            `delete from todos where id=$1;`,[id]
        )
        res.send(dlt)
    }catch(error){
        res.send(error)
    }
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
