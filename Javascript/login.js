const express = require('express')
const app = express()   
const bodyParser = require('body-parser')
const path = require('path')
const jobs = require('./jobs')

const {Client} = require('pg')

const client3 = new Client({

    user: 'postgres',
    password: 'lol',
    host: 'localhost',
    port: 5432,
    database: 'my_db'

})
//    return res.redirect('/UserHomePage');

app.use(express.static('/home/local/INTERNAL/shreshth.j/Desktop/codedamn/Job_Portal'))

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get('/', function(req, res){

    res.sendFile('/home/local/INTERNAL/shreshth.j/Desktop/codedamn/Job_Portal/login.html'); 

});

app.post('/submit-signup', async (req, res)=>{
    
    console.log(req.body);
    await sendTodatabase(req.body);
    res.render('index', {title: 'Data Saved', message: 'Data saved successfully'})

})

app.post('/submit-login', async(req,res)=>{
    console.log(req.body);
    const getResult =  await checkFromDatabase(req.body);
    console.log("here is getResult: ", getResult.rows[0].exists)
    
    if(getResult.rows[0].exists)
    {   
        res.redirect('candidate.html');

    }else{
        res.render('index',{title:'Error', message: 'Username or password doesn\'t exist'});
   }
})

app.post('/submit-rec-signup', async (req, res)=>{

    console.log(req.body);
    await addRecruiterInfo(req.body);
    res.render('index', {title:'recruiter data saved', message: ' welcome to our platform, Please Sign-in to continue'});

})

app.post('/submit-rec-signin', async(req, res)=>{

    console.log(req.body);
    const checkResult = await checkRecFromDatabase(req.body);
    console.log(checkResult.rows[0].exists)
    if(checkResult.rows[0].exists)
    {   
        
        res.redirect('recruiter.html');

    }else{
        res.render('index',{title:'Error', message: 'email or password doesn\'t exist'});
   }

})

app.listen(3050, console.log("app connected on 3050"));

start();

async function start(){
    await connect();
    console.log("database connected man")
}

async function connect(){
    try{
        await client3.connect();
    }
    catch(e){
        res.status(400).send()
        console.error(`failed to connect ${e}`);
    }
}

async function sendTodatabase(getData){

    try {
        const SignupInfo = client3.query("insert into candidate_info( c_name, username, city, phone, password ) values ($1, $2, $3, $4, $5);",[getData.c_name1, getData.username1, getData.city1, getData.phone1, getData.password1])
        return true;
    } catch (error) {
                
    }

}

async function checkFromDatabase(getLData){

    try {
        const loginInfo  = await client3.query("SELECT EXISTS(SELECT * from candidate_info WHERE username=$1 AND password=$2);",[getLData.username4, getLData.password4]).then((result)=>{return result});
        return loginInfo;
    } catch (error) {
        
    }

}

async function addRecruiterInfo(getRData){

    try {
        console.log("getHere again: ",getRData)
        const loginInfo = await client3.query("Insert into recruiter_info(r_name, company,  email, password, access_key) values($1, $2, $3, $4, $5);",[getRData.r_name3,getRData.company3, getRData.email3, getRData.password3, getRData.access_key3])
        return true;
        } catch (error) {
        
    }
}

async function checkRecFromDatabase(getLData){

    try {
        const logIt  = await client3.query("SELECT EXISTS(SELECT * from recruiter_info WHERE email=$1 AND password=$2);",[getLData.email2, getLData.password2]).then((result)=>{return result});
        return logIt;
    } catch (error) {
        
    }

}

app.post('/add_Job_Posting',jobs.addJobP);

// app.post('/showJobPostings',(req, res)=>{

// jobs.showJobs();

// })

