let requestMovieUrl = ' https://www.omdbapi.com/?apikey=9b9137db';
let backToHome = document.querySelector('#homeBtn');

backToHome.addEventListener('click', function() {
    window.location.replace('./index.html');
})

var getMoreInfo = function(imdbID) {
    var apiUrl = requestMovieUrl + '&i=' + imdbID + '&plot=full';

    fetch(apiUrl)
        .then(function (response) {  
            if (response.ok) {
                response.json().then(function (data) {
                    displayMovieCard(data);
                    displayExtraInfo(data);
                    localStorage.removeItem("imdbID")
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
   

};

getMoreData();

function displayMovieCard (data) {
    var cardContainer= document.getElementsByClassName('card-container');
    var uiCard = document.createElement('div')
    $(uiCard).addClass("ui card")
    var img = $('<img />', { 
    src: data.Poster,
    });
    img.appendTo($(uiCard));
    var main = document.createElement('div');
    $(main).addClass("content");
    var title = document.createElement('a');
    $(title).addClass("header movieTitle");
    title.textContent = data.Title;
    main.append(title);
    var meta = document.createElement('div');
    $(meta).addClass("meta");
    var year = document.createElement('span');
    $(year).addClass("year");
    year.textContent= data.Year;
    meta.append(year);
    var type = document.createElement('span');
    $(type).addClass("type");
    type.textContent= data.Type;
    meta.append(type);
    main.append(meta);
    uiCard.append(main);
    $(uiCard).appendTo(cardContainer);
    $(uiCard).addClass("column"); 
}

function displayExtraInfo(data) {
    var plot= document.getElementsByClassName('plot');
    $(plot).text(data.Plot);
    var cast= document.getElementsByClassName('cast');
    $(cast).text(data.Actors);
    var director= document.getElementsByClassName('director');
    $(director).text(data.Director);
    var writer= document.getElementsByClassName('writer');
    $(writer).text(data.Writer);
    console.log(data.Plot)
};

function start() {
    // Initializes the client with the API key and the Translate API.
    gapi.client.init({
      'apiKey': 'AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc',
      'discoveryDocs': ['https://www.googleapis.com/youtube/v3/search'],
    }).then(function() {
      // Executes an API request, and returns a Promise.
      return gapi.client.youtube.search.list({
        q: `batman`,
        part: 'snippet'
      });
    }).then(function(response) {
      console.log(response.result.data.translations[0].translatedText);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  };

  // Loads the JavaScript client library and invokes `start` afterwards.
  gapi.load('client', start);