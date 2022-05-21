var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL');


  router.post("/createMovie", async function (req, res, next) {
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
    let name = req.params.name;
  
    let movie = await moviesBL.getMovieDataByName(name);
    res.render("movieData", {movie});
  });



  router.post("/searchMovie", async function (req, res, next) {
    const obj = req.body;
  
    //TODO
    //1. Pressing search button will count as 1 operation

    //2. Send obj to moviesBL and get in return the movies
    const movies = await moviesBL.getMoviesData(obj);
    
    //3. render "Search Results Page" and send their a new obj with all movies        
    res.render("searchResultsPage", {movies});
  
  });





  module.exports = router;
