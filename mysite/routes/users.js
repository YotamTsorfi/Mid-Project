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

    const createdDate = await userBL.getCreatedDate(req.session.username);
    let numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    
    let today = getDats(obj.name).today;
    let createdDate_ = createdDate;

    // if createdDate < today -- initialize to zero and update the createdDate
    if (createdDate_ < today) {
      await userBL.updateCreatedDateAndZeroCounter(req.session.username, today);  // update the createdDate
      numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    }

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



    function getDats(usersName){

      function formatDate(testdate) {
        let date = testdate.split('/').join('-');
        return date
      }

      let today = new Date().toLocaleDateString();
      today =  formatDate(today);
      let a = today.split("-");
      today = a[2]+ "-" + a[1] + "-" + a[0];
      //console.log("today: ", today);
  
      let tomorrow = new Date(Date(Date.now()));
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow = formatDate(tomorrow.toLocaleDateString());
      let b = tomorrow.split("-");
      tomorrow = b[2]+ "-" + b[1] + "-" + b[0];
      //console.log("tomorrow: ", tomorrow);
  
  
      const dats = { today: today, tomorrow: tomorrow};
  
      return dats;
    }

module.exports = router;
