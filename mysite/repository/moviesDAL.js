const jFile = require('jsonfile');
var path = require("path");



const readFromFile = function()
{  
    return new Promise((resolve, reject ) => 
        {
            jFile.readFile(path.join(__dirname, '..', '/Data/NewMovies.json'), function(err, data)
            {
                if(err){
                    reject(err);
                }
                else{
                    resolve(data); 
                }                
            })
        })
}




const addToFile = (obj) =>
{    
    return new Promise ((resolve, reject) => {
        jFile.readFile(path.join(__dirname, '..', '/Data/NewMovies.json'), function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let arr = data.movies;
                
                //get the last id in arr
                const lastItem = arr[arr.length -1];
                const index = lastItem.id; 
                let newIndex = index + 1;
                //console.log("index: ", index); //5
                //console.log("obj.name: ", obj.name);
                //console.log("obj.lang: ", obj.lang);

                const re = /\s*(?:;,|$)\s*/
                const genreList = obj.genre.split(re);

                const newMovieObj = {"id": newIndex, "name": obj.name, "language": obj.lang, "genres": genreList };

                console.log(newMovieObj);

                arr.push(newMovieObj);

                let fullData = {"movies": arr};

                jFile.writeFile(path.join(__dirname, '..', '/Data/NewMovies.json'), fullData, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.log("Created!");
                            resolve("OK");
                        }
                    })      
            
            }
        })
    })   
}



module.exports = {readFromFile, addToFile}