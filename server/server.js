const express=require('express')
const app=express()
const PORT=5000
const pool=require('./db')
const cors=require('cors')

app.use(cors())
app.get('/todos/:userEmail',async (req,res)=>{
    const {userEmail}=req.params
    try{
       const todos= await pool.query('SELECT * FROM todos where user_email=$1',[userEmail])
       res.json(todos.rows)
    }catch(error){
        console.log(error)
    }
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})