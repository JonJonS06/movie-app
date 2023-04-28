let requestMovieUrl = ' http://www.omdbapi.com/?apikey=9b9137db';
let requestVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&part=snippet,contentDetails,statistics,status';
let requestMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&libraries=places'

var getMovieQuery = function(movie) {
    var apiUrl = requestMovieUrl + '&s=' + movie;

    fetch(apiUrl)
        .then(function (response) {  
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // displayResults(data);
                });
            } else {
                // TODO add modal after adding html and css styling
                // modal.style.display = 'block'
                // modal.textContent = 'Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            // TODO continued add modal
            // modal.textContent = 'Unable to connect to OMDb database';
        })
};
getMovieQuery('batman');
console.log('hi');
 
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
