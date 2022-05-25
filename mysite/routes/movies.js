var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');
const userBL = require("../models/userBL");

  router.post("/createMovie", async function (req, res, next) {
    //1. Pressing create button count as 1 action        
    await userBL.updateNumofTransactions(req.session.username); 

    const numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    console.log("numOfTrans: " , numOfTrans);

    // if((req.session.mycounter >= 5 && req.session.username != 'admin') || req.session.username == 'undefined' ){
    //   res.render('login', { result: "false" });
    //   return res.json()
    // }

    const obj = req.body;
    const result = await moviesBL.addMovie(obj);         
    if (result == "OK") {      
      res.render("menuPage", { title: "Menu Page" });
    }
    else{
      //res.render('login', { result: "false" });
    }
  });

  router.get("/menuPage", async function (req, res, next) {   
    res.render('menuPage', { title: "Menu Page" });    
  });
  
  router.get("/createMovie", async function (req, res, next) {   
    res.render('createMoviePage', {});    
  });
  
  router.get("/searchMovie", async function (req, res, next) {     
    res.render('searchMovie', {});    
  });

  router.get("/:name", async function (req, res, next) {
     //1. Pressing create button count as 1 action        
    await userBL.updateNumofTransactions(req.session.username); 

    const numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    console.log("numOfTrans: " , numOfTrans);

    // if((req.session.mycounter >= 5 && req.session.username != 'admin') || req.session.username == 'undefined' ){
    //   res.render('login', { result: "false" });
    //   return res.json()
    // }

    let name = req.params.name;  
    let movie = await moviesBL.getMovieDataByName(name);
    res.render("movieData", {movie});
  });



  router.post("/searchMovie", async function (req, res, next) {
    const obj = req.body;  
    //1. Pressing search button count as 1 action        
    await userBL.updateNumofTransactions(req.session.username); 
    const numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    console.log("numOfTrans: " , numOfTrans);
    
    // if((req.session.mycounter >= 5 && req.session.username != 'admin') || req.session.username == 'undefined' ){
    //   res.render('login', { result: "false" });
    //   return res.json()
    // }
    
    // Note if user refresh the page mycounter increasing by 1
    // TODO (Find a way to avoid it)


    //2. Send obj to moviesBL and get in return the movies
    const movies = await moviesBL.getMoviesData(obj);
    
    //3. render "Search Results Page" and send their a new obj with all movies        
    res.render("searchResultsPage", {movies});
  });

  module.exports = router;
