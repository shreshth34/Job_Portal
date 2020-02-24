const express = require('express')
const app = express()
const _ = require('lodash');
const jobs1 = require('./jobs')

let gotJobs ;

async function RecJobs(){
  
    gotJobs = await jobs1.showJobP();

}

RecJobs().then(()=>{
                                                                            
    var answer = gotJobs.filter((e)=>{

      return e.role_id === 403 && e.salary >= '50000' && e.yrs_of_exp <= 2;
    
    })

    console.table(answer)

  })

app.post('/filter&Jobs', async(req, res) =>{

  const res_JSON = req.body;







})

console.log("Is it a string: ",_.isString('heerro'));