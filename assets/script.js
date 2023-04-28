let requestMovieUrl = ' http://www.omdbapi.com/?i=tt3896198&apikey=9b9137db';
let requestVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&part=snippet,contentDetails,statistics,status';
let requestMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&libraries=places'
 
var searchBtn = document.querySelector(".ui button");
var input = document.querySelector("input")


var searchMovie = function(event) {
    event.preventDefault();
    var movieTitle = input.value.trim();
    if(movieTitle) {
       getMovieQuery(movieTitle);
       input.value = "";
    } else {
        //  TODO Add modal alert
    }
};
searchBtn.addEventListener("click", searchMovie);
