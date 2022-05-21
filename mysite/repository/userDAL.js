const jFile = require('jsonfile');
const { resolve } = require('path');
var path = require("path")

const getUsers = () =>
{
    return new Promise ((resolve, reject) =>
    {
    
        //console.log('Path received:  ', path.join(__dirname, '..', '/Data/Users.json')) ;
        jFile.readFile(path.join(__dirname, '..', '/Data/Users.json'), function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}
    

const deleteUserByName = (username) =>
{
  return new Promise ((resolve, reject) => 
  {  
    jFile.readFile(path.join(__dirname, '..', '/Data/Users.json'), function(err, data){
        if(err){
            reject(err);
        }
        else{
            let arr = data.users;
            let usersAfterDelete = arr.filter(user => user.Username !== username);        
            let fullData = {"users" : usersAfterDelete};
            jFile.writeFile(path.join(__dirname, '..', '/Data/Users.json'), fullData , function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    resolve("User Deleted!");
                }
            })        
        }
    })
  })
}


const updateOrAddUser = (objArr) => 
{
    return new Promise ((resolve, reject) => 
    {
        let fullData = {"users" : objArr};
        jFile.writeFile(path.join(__dirname, '..', '/Data/Users.json'), fullData , function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve("Completed!");
            }
        })
    })
}




module.exports = {getUsers, deleteUserByName, updateOrAddUser}