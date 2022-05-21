const movieDal = require("../repository/moviesDAL");
const moveisWS = require("../repository/wsShowsDAL");

const addMovie = async (obj) => {
  const result = await movieDal.addToFile(obj);
  return result;
};

const getMoviesData = async (obj) => {
  const movies = await moveisWS.getShows();
  const moviesData = movies.data;

  //Compare movies from ws with obj received from view
  const movieName = obj.name;
  const movieGenre = obj.genre;
  const movieLanguage = obj.language;

  let objToReturn = { moviesName: [], moviesWithSameGenre: [] };

  //Getting all movies from ws with the same name,language and genre
  const movieFromWs = moviesData.find(
    (x) => x.name == movieName && x.language == movieLanguage
  );

  //find movies from moviesFromWs with the same genre
  if (movieFromWs) {
    const isEXist = movieFromWs.genres.indexOf(movieGenre);
    if (isEXist > -1) {
      let movieNameFromWs = movieFromWs.name;
      objToReturn.moviesName.push(movieNameFromWs);
    }
  }

  moviesData.forEach((element) => {
    const sameGenre = element.genres.indexOf(movieGenre);
    if (sameGenre > -1) {
      objToReturn.moviesWithSameGenre.push(element.name);
    }
  });

  //-------------------- From File

  //Getting all movies from json file with the same name,language and genre
  const moviesFromFile = await movieDal.readFromFile();
  const moviesDataFromFile = moviesFromFile.movies;

  const movieNameFromFile = moviesDataFromFile.find(
    (x) => x.name == movieName && x.language == movieLanguage
  );
  if (movieNameFromFile) {
    const isEXist2 = movieNameFromFile.genres.indexOf(movieGenre);
    if (isEXist2 > -1) {
      //console.log("movieNameFromFile.name: ", movieNameFromFile.name);
      objToReturn.moviesName.push(movieNameFromFile.name);
    }
  }

  //
  moviesDataFromFile.forEach((elem) => {
    const sameGenre2 = elem.genres.indexOf(movieGenre);
    if (sameGenre2 > -1) {
      //console.log(elem.name);
      objToReturn.moviesWithSameGenre.push(elem.name);
    }
  });

  return objToReturn;
};




const getMovieDataByName = async (movieName) => {
  const movies = await moveisWS.getShows();
  const moviesData = movies.data;

  const movieFromWs = moviesData.find((x) => x.name == movieName);

  if (movieFromWs) {
    let returnObj = {
      oId: movieFromWs.id,
      oName: movieFromWs.name,
      oGenres: movieFromWs.genres,
      oLanguage: movieFromWs.language,
      oImage: movieFromWs.image.medium,
    };

    return returnObj;
  }
  else{ //Check in file
    const moviesFromFile = await movieDal.readFromFile();
    const moviesDataFromFile = moviesFromFile.movies;

    const movieNameFromFile = moviesDataFromFile.find(
      (x) => x.name == movieName
    );

    if(movieNameFromFile){
      let returnObj = {
        oId: movieNameFromFile.id,
        oName: movieNameFromFile.name,
        oGenres: movieNameFromFile.genres,
        oLanguage: movieNameFromFile.language,
        oImage: null
      };
  
      return returnObj;
    }

  }


};

module.exports = { addMovie, getMoviesData, getMovieDataByName };
