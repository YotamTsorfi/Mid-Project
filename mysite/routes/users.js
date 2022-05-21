var express = require('express');
var router = express.Router();
const userBL = require("../models/userBL");

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


  router.post("/validation", async function (req, res, next) {
    const obj = req.body;

    const users = await userBL.checkCredentials(obj);

    if (users) {
      res.render("menuPage", { title: "Menu Page" });
    }
    else{
      res.render('login', { result: "false" });
    }

  });


  // accessed ONLY for Admin
  router.get('/usermanagment', async function(req, res, next) {

  const allusers = await userBL.getAllUsers();

  res.render('usermanagement', {allusers});
  });


  router.get('/userDataPage', async function(req, res, next) {  
    res.render('userDataPage', {});
  });

 
  router.post('/updateOrAddUser', async function(req, res, next) {   
      const obj = req.body;
      const result = await userBL.updateOrCreateUser(obj);
        
      const allusers = await userBL.getAllUsers();

      res.render('usermanagement', {allusers});
  });


  //Can be access just for admin
  router.get('/update/:Username', async function(req, res, next) {

    const userName = req.params.Username;
    
    const userToEdit = await userBL.getUserByName(userName);
    
    const user = userToEdit[0];
    
    res.render('userDataPage', {user});
    });

    
  router.get('/delete/:username', async function(req, res, next) {
 
    const userName = req.params.username;
    
    const result = await userBL.deleteUserByName(userName);
      
    
    const allusers = await userBL.getAllUsers();

    res.render('usermanagement', {allusers});

    });

module.exports = router;
