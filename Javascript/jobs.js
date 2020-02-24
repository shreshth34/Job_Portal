const express = require('express')
const app = express();
const {Client} = require('pg')
const _ = require('lodash')
const bodyParser = require('body-parser')

app.use(express.json());

const client1 = new Client({

    user: 'postgres',
    password: 'lol',
    host: 'localhost',
    port: 5432,
    database: 'my_db'

})    

app.use(express.static('/home/local/INTERNAL/shreshth.j/Desktop/codedamn/Job_Portal'))

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

async function showJobP(req, res){
try {

        const results = await showJobPostings();
        return results.rows;

} catch (error) {

        console.log(error)

}
}

async function addJobP(req, res){
        try{
        await add_Job_Posting(req.body);
        res.send('Job posted successfully');
        }
        catch(e){
                console.log("error is",e);
        }
        finally{
        const result1 = await showJobPostings();
        console.table(result1);
        }
}



start();
async function start(){
        try{
                client1.connect();
        }
        catch(e){
                console.log("error",e)
        }
}

async function showJobPostings(){
try {
        const contents = await client1.query("select * from job_postings");
        return contents;    
} catch (e) {
        console.log(e)
}
}

async function add_Job_Posting(reqBody){

  try {
        console.log(reqBody)
        const addpost = await client1.query("insert into job_postings (job_id, role_id,salary,apply_till, yrs_of_exp,company,skill_id, city, recruiter_id) values ($1, $2, $3, $4, $5 ,$6, $7, $8, $9);", [reqBody.job_id, reqBody.role_id,reqBody.salary,reqBody.apply_till, reqBody.yrs_of_exp,reqBody.company,reqBody.skill_id, reqBody.city, reqBody.recruiter_id ]) ;    
        return addpost;
        
} catch (error) {
        console.log("some error",error);
}     
}



module.exports=  {
addJobP,
showJobP

}