var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');
const userBL = require("../models/userBL");
const LIMIT_ACTIONS_PER_DAY = 5;

  router.post("/createMovie", async function (req, res, next) {
    
    //1. Pressing create button count as 1 action        
    await userBL.updateNumofTransactions(req.session.username); 
    const numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
    
    if ( (numOfTrans <= LIMIT_ACTIONS_PER_DAY && req.session.username != 'admin') || req.session.username == 'admin' ) {
      const obj = req.body;
      const result = await moviesBL.addMovie(obj);   
      if (result == "OK") {      
        res.render("menuPage", { title: "Menu Page" });
      }   
      else{
        res.render('login', { result: "false" });
      }
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
    
    if ( (numOfTrans <= LIMIT_ACTIONS_PER_DAY && req.session.username != 'admin') || req.session.username == 'admin' ) {
      let name = req.params.name;  
      let movie = await moviesBL.getMovieDataByName(name);
      res.render("movieData", {movie}); 
    }
    else{
      res.render('login', { result: "false" });
    }
  });

  router.post("/searchMovie", async function (req, res, next) {
    
    //1. Pressing search button count as 1 action        
    await userBL.updateNumofTransactions(req.session.username); 
    const numOfTrans = await userBL.getUserNumofTransactions(req.session.username);
        
    if ( (numOfTrans <= LIMIT_ACTIONS_PER_DAY && req.session.username != 'admin') || req.session.username == 'admin' ) {
    //2. Send obj to moviesBL and get in return the movies
    //and  render "Search Results Page" and send their a new obj with all movies        
      const obj = req.body;  
      const movies = await moviesBL.getMoviesData(obj);
      res.render("searchResultsPage", {movies});
    }
    else{
      res.render('login', { result: "false" });
    }
    
    // Note if user refresh the page mycounter increasing by 1
    // TODO (Find a way to avoid it)
  });

  module.exports = router;
