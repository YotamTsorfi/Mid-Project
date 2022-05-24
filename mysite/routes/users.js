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
    
    // Check if mycounter exceeded 5 (5 Actions per day)
    if(!req.session.mycounter)
    {
        req.session.username = obj.name;
        req.session.mycounter = 0;
    }
    else{
        req.session.mycounter += 1;
        console.log(req.session);
        req.session.username = obj.name;

        if(req.session.mycounter >= 5 && req.session.username != 'admin' ){
          res.render('login', { result: "false" });
          return res.json()
        }
    } 
    console.log(req.session);
    if (users) {
      res.render("menuPage", { title: "Menu Page" , req});
    }
    else{
      res.render('login', { result: "false" });
    }
  });
  
  router.get('/usermanagment', async function(req, res, next) {
    // First Check if Admin is login in this session, if not, redirect the 
    // User back to Menu Page.
    if( req.session.username == 'admin'){
      const allusers = await userBL.getAllUsers();
      res.render('usermanagement', {allusers});
    }
    else{
      res.render("menuPage", { title: "Menu Page", req });
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
