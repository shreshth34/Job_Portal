const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {Client} = require('pg')


app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())


const client = new Client({

    user: 'postgres',
    password: 'lol',
    host: 'localhost',
    port: 5432,
    database: 'my_db'
})

weShowRoles();

// document.getElementById('btn-roles').onclick =  
// document.getElementById('showAvailableRoles').innerHTML = needRoles;   
// weShowRoles();

app.listen(3020)

app.get('/getRoles',async (req, res)=>{
    try {
    
        
        const getAnswer = await getRolesdata()
        console.log(getAnswer.rows) 
        res.send("data shown successfully")
     
        
    } catch (error) {
    
      }
    })
    

app.post('/addRoles', async (req, res)=>{
try 
 {   
    console.log(req.body)
    await addRoleToTable(req.body);
    res.send("role data added")

    
} catch (error) {

  }

})

async function weShowRoles(){

    const gotResults = await getRolesdata();
    console.log(gotResults.rows);    

}

start();

async function start(){
try {
    await client.connect()
    console.log("connected to database")
} catch (error) {
    console.log("here is error",error)
}    
}

async function getRolesdata(){

    const getResults = client.query("select * from role_info;")
    return getResults

}


async function addRoleToTable(reqData){

    try {
        console.log("requested data", reqData)
        const someRole = client.query("insert into role_info(role_id, role_name) values($1, $2);",[reqData.role_id, reqData.role_name]);
        return true;
    } catch (error) {
        
    }


}

module.exports= {
    sendRoles: weShowRoles
}







