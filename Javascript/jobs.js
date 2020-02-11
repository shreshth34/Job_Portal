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


app.get('/showJobPostings', async (req, res)=>{

        const results = await showJobPostings();
        console.table(results)
        res.send("job postings on console");

})


app.post('/add_Job_Posting', async(req, res)=>{
        try{
        await add_Job_Posting(req.body);
        res.render('index', {title: 'Data Saved', message: 'Data saved successfully to job posting'})

        }
        catch(e){
                console.log("error is",e);
        }
        finally{
        const result1 = await showJobPostings();
        console.table(result1);
        }
})

// app.post('/Candidate/showJobs', async(req, res)=>{
//    try{
           
//         var newJSON = req.body;
        
//         const bring = await showJobforSkills(newJSON);
//         res.send(bring);

//    }catch(e){

//         console.log("Error",e)
  
// }
// })

// app.listen(3000, console.log("listening on 3000"));

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

async function add_Job_Posting(reqBody){

  try {
        console.log(reqBody)
        const addpost = await client1.query("insert into job_postings (job_id, role_id,salary,apply_till, yrs_of_exp,company,skill_id, city, recruiter_id) values ($1, $2, $3, $4, $5 ,$6, $7, $8, $9);", [reqBody.job_id, reqBody.role_id,reqBody.salary,reqBody.apply_till, reqBody.yrs_of_exp,reqBody.company,reqBody.skill_id, reqBody.city, reqBody.recruiter_id ]) ;    
        return true;
        
} catch (error) {
        console.log("some error",error);
}     
}

// async function showJobforSkills(JSONfile){
// try{   

//         console.log(JSONfile)
 
//         const keysTrue = _.keys(_.pickBy(JSONfile))
//         const valuesTrue = _.values(_.pickBy(JSONfile))


//         const checkJob = await client1.query(`SELECT * FROM job_postings AS jp where LOWER(jp.${keysTrue[0]}) = $1 OR jp.${keysTrue[1]} <= $2 OR jp.${keysTrue[2]} >= $3 OR ${keysTrue[3]} = $4 OR jp.${keysTrue[4]} = $5 OR LOWER(jp.${keysTrue[5]}) = $6;`,[valuesTrue[0],valuesTrue[1],valuesTrue[2],valuesTrue[3],valuesTrue[4],valuesTrue[5]]);    
//         console.log(checkJob.rows)
//         return checkJob.rows;  
       
//         }
//         catch(e){
//         }

// }

module.exports=  {
addJobs: add_Job_Posting

}