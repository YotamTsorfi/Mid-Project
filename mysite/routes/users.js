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

    // First initialize the user session to track it later
    if(!req.session.mycounter)
    {
        req.session.username = obj.name;
        req.session.mycounter = 0;
    }
    else{
        req.session.mycounter += 1;
        req.session.username = obj.name;
    }
    //console.log("obj.name: ", obj.name);
    //console.log(req.session);
 
    if (users) {
      res.render("menuPage", { title: "Menu Page" });
    }
    else{
      res.render('login', { result: "false" });
    }

  });


  // accessed ONLY for Admin
  router.get('/usermanagment', async function(req, res, next) {

    // First Check if Admin is login in this session, if not, redirect the 
    // User back to Menu Page.
    if( req.session.username == 'admin'){
      const allusers = await userBL.getAllUsers();
      res.render('usermanagement', {allusers});
    }
    else{
      res.render("menuPage", { title: "Menu Page" });
    }
    

  
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
