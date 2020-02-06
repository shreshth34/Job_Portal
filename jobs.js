const express = require('express')
const app = express();
const {Client} = require('pg')
const _ = require('lodash')
app.use(express.json());

const client1 = new Client({

    user: 'postgres',
    password: 'lol',
    host: 'localhost',
    port: 5432,
    database: 'my_db'

})    

app.get('/showJobPostings', async (req, res)=>{

        const results = await showJobPostings();
        console.table(results)
        res.send("job postings on console");

})

// {
//         "job_entry": {
//             "job_id": 2030,
//             "Role": "Software Intern",
//             "yrs_of_Exp": 1,
//             "Salary": "$3400",
//             "Date_of_joining": "2020-06-25",
//             "Company": "Talview",
//             "Skills": "Nodejs"
//         }
//     }

app.post('/addJobPosting', async(req, res)=>{
        try{
        var reqJSON = req.body.job_entry;
        await add_Job_Posting(reqJSON.job_id, reqJSON.role, reqJSON.yrs_of_exp, reqJSON.salary, reqJSON.date_of_joining, reqJSON.company, reqJSON.skills, reqJSON.city);
        }
        catch(e){
                console.log("error is",e);
        }
        finally{
        const result1 = await showJobPostings();
        console.table(result1);
        res.send("added job posting and show job postings on console")
        }
})

app.post('/Candidate/showJobs', async(req, res)=>{
   try{
           
        var newJSON = req.body;
        
        const bring = await showJobforSkills(newJSON);
        res.send(bring);

   }catch(e){

        console.log("Error",e)
  
}
})

app.listen('8002', console.log("listening on 8002"));

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
        return contents.rows;
        
} catch (e) {

        console.log(e)

}
}

async function add_Job_Posting(Job_Id1, Role1, yrs_of_Exp1, Salary1, Date_of_joining1, Company1, Skills1, city1 ){

  try {
        const addpost = await client1.query("insert into job_postings (job_id, role, yrs_of_exp, salary, date_of_joining, company, skills, city) values ($1, $2, $3, $4, $5 ,$6, $7, $8);", [Job_Id1, Role1, yrs_of_Exp1, Salary1, Date_of_joining1, Company1, Skills1, city1]) ;    
        return true;
        
} catch (error) {
        console.log("some error",error);
}     
}

async function showJobforSkills(JSONfile){
try{   
        console.log(JSONfile)

        const keysTrue = _.keys(_.pickBy(JSONfile))
        const valuesTrue = _.values(_.pickBy(JSONfile))
        console.log(keysTrue[0]);


        const checkJob = await client1.query(`SELECT * FROM job_postings AS jp where LOWER(jp.${keysTrue[0]}) = $1 AND jp.${keysTrue[1]} <= $2 AND jp.${keysTrue[2]} >= $3 AND ${keysTrue[3]} = $4 AND jp.${keysTrue[4]} = $5 AND LOWER(jp.${keysTrue[5]}) = $6;`,[valuesTrue[0],valuesTrue[1],valuesTrue[2],valuesTrue[3],valuesTrue[4],valuesTrue[5]]);    
        console.log(checkJob.rows)
        return checkJob.rows;  
       
        }
        catch(e){
        }

}