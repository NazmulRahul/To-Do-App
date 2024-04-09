const Pool=require('pg').Pool
require('dotenv').config()

const pool=new Pool({
    user:'postgres',
    password:'1234',
    port:5432,
    database:'todoapp'
})

module.exports=pool