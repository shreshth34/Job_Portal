const express = require('express')
const app = express();
const {Client} = require('pg')
app.use(express.json());

const client2 = new Client({

    user: 'postgres',
    password: 'lol',
    host: 'localhost',
    port: 5432,
    database: 'my_db'

})

app.get('/Candidates', async (req, res)=>{

    const row = await showCandidatePerforma();
    console.table(row);
    res.send("performa on console")
       
})

app.listen('3031', console.log("listening on 3031"));

start();

async function start(){
        try{
                client2.connect();
        }
        catch(e){
                console.log("error",e)
        }
}
