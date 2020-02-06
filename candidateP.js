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

async function showCandidatePerforma(){
try {

        const contents = await client2.query("select * from candidate_performa");
        return contents.rows;
        
} catch (e) {

        console.log(e)

}
}

// async function add_Job_Posting(Job_Id1, Role1, yrs_of_Exp1, Salary1, Date_of_joining1, Company1, Skills1 ){

//   try {
//         const addpost = await client1.query("insert into job_postings (job_id, role, yrs_of_exp, salary, date_of_joining, company, skills) values ($1, $2, $3, $4, $5 ,$6, $7);", [Job_Id1, Role1, yrs_of_Exp1, Salary1, Date_of_joining1, Company1, Skills1]) ;    
//         return true;
        
// } catch (error) {
//         console.log("some error",error);
// }     

// }


