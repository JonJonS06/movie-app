let requestMovieUrl = ' http://www.omdbapi.com/?apikey=9b9137db';
let requestVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&part=snippet,contentDetails,statistics,status';
let requestMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&libraries=places'
var resultContainer = document.getElementById('results')
var modal = document.querySelector('.modal');
var modalDescription = document.querySelector('.modal-content');

var getMovieQuery = function(movie) {
    var apiUrl = requestMovieUrl + '&s=' + movie;

    fetch(apiUrl)
        .then(function (response) {  
            if (response.ok) {
                response.json().then(function (data) {
                    displayMovieCards(data)
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
 
var searchBtn = document.querySelector(".ui button");
var input = document.querySelector("input")


var searchMovie = function(event) {
    event.preventDefault();
    var movieTitle = input.value.trim();
    if(movieTitle) {
       getMovieQuery(movieTitle);
       input.value = "";
    } else {
        modalDescription.textContent = 'Please input a movie title to search.';
        $('.ui.modal').modal('show');
    }
};
searchBtn.addEventListener("click", searchMovie);

function displayMovieCards (data) {
  var movieArray= data.Search;
  for (var i = 0; i < movieArray.length; i++) {
    var data = movieArray[i];
    var uiCard = document.createElement('div')
    $(uiCard).addClass("ui card")
    var img = $('<img />', { 
      src: data.Poster,
    });
    img.appendTo($(uiCard));
    var main = document.createElement('div');
    $(main).addClass("content");
    var title = document.createElement('a');
    $(title).addClass("header");
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
    var description = document.createElement('div');
    $(description).addClass("description");
    description.textContent= "Placeholder";
    main.append(description);
    uiCard.append(main);
    var extra = document.createElement('div');
    $(extra).addClass("extra content");
    var learnMore = document.createElement('a');
    var moreButton = document.createElement('button');
    $(moreButton).addClass("ui button learnMore");
    moreButton.textContent="Learn More";
    learnMore.append(moreButton);
    extra.append(learnMore);
    var favorite = document.createElement('div');
    $(favorite).addClass("ui animated button");
    var visible = document.createElement('div');
    $(visible).addClass("visible content");
    visible.textContent= "Favorite";
    favorite.append(visible);
    var hidden = document.createElement('div');
    $(hidden).addClass("hidden content");
    var icon = document.createElement('i');
    $(icon).addClass("heart icon");
    var hiddenId = document.createElement('p');
    $(hiddenId).hide();
    hiddenId.textContent= data.imdbID;
    extra.append(hiddenId);
    hidden.append(icon);
    favorite.append(hidden);
    extra.append(favorite);
    uiCard.append(extra);
    resultContainer.append(uiCard);


  }
}


// function getMovie () {

//   console.log('Its working')
// }
var learnMoreBtn = document.querySelector('.learnMore');
  document.body.addEventListener("click", function(event) {
    if (event.target.classList.contains ('learnMore')) {
      
      console.log('Its Working')
    }
  });

        
