const roles = require('../Javascript/show-roles')

let gotRoles ;

async function RecRoles(){

    gotRoles = await roles.sendRoles();


}

RecRoles().then(()=>{
    var answer = gotRoles.filter((e)=>{

    return e.role_id === 400;
    
    })
    console.log(answer)
})
