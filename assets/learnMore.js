let requestMovieUrl = ' https://www.omdbapi.com/?apikey=9b9137db';

var getMoreInfo = function(imdbID) {
    var apiUrl = requestMovieUrl + '&i=' + imdbID;

    fetch(apiUrl)
        .then(function (response) {  
            if (response.ok) {
                response.json().then(function (data) {
                    displayMore(data)
                });
            } else {
                modalDescription.textContent = 'Error: ' + response.statusText;
            }
        })
        .catch(function (error) {
            modalDescription.textContent = 'Unable to connect to OMDb database';
            $('.ui.modal').modal('show');
        })
};

function getMoreData () {
   var movie = JSON.parse(localStorage.getItem("imdbID"));
   getMoreInfo(movie);

}
getMoreData();