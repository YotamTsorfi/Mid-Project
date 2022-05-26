var express = require('express');
var router = express.Router();
const userBL = require("../models/userBL");
const LIMIT_ACTIONS_PER_DAY = 5;

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post("/validation", async function (req, res, next) {
    const obj = req.body;
    const users = await userBL.checkCredentials(obj);
    req.session.username = obj.name;

    //Initialize numbers transactions to 0 if it's a new day
    console.log(req.session);
    console.log("req.session._expires: ", req.session.cookie._expires);

    const numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    console.log("number Of Transactions for" , req.session.username , "is", numOfTrans);

    if ( (users && numOfTrans <= LIMIT_ACTIONS_PER_DAY && req.session.username != 'admin') || req.session.username == 'admin') {
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
