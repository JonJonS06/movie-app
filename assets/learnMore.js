let requestMovieUrl = ' https://www.omdbapi.com/?apikey=9b9137db';

var getMoreInfo = function(imdbID) {
    var apiUrl = requestMovieUrl + '&i=' + imdbID + '&plot=full';

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