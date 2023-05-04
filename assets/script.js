let requestMovieUrl = ' https://www.omdbapi.com/?apikey=9b9137db';
let requestVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&part=snippet,contentDetails,statistics,status';
let requestMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc&libraries=places'
var resultContainer = document.getElementById('results')
var modal = document.querySelector('.modal');
var modalDescription = document.querySelector('.modal-content');
var clearBtn = document.getElementById('clear-btn');
var favorites = document.getElementById('favorite-movies')
var getMovieQuery = function(movie) {
    var apiUrl = requestMovieUrl + '&s=' + movie;

    fetch(apiUrl)
        .then(function (response) {  
            if (response.ok) {
                response.json().then(function (data) {
                    displayMovieCards(data)
                    console.log(data)
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


//Makes the 'Enter' key functional wiith the searchMovie function
input.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
      searchMovie(event);
  }
});

function displayMovieCards (data) {
  $(resultContainer).empty();
  var movieArray= data.Search;
  for (var i = 0; i < movieArray.length; i++) {
    var data = movieArray[i];
    var movieTitle= data.Title;
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
    var extra = document.createElement('div');
    $(extra).addClass("extra content");
    var learnMore = document.createElement('a');
    var moreButton = document.createElement('button');
    $(moreButton).addClass("ui button learnMore");
    moreButton.textContent="Learn More";
    learnMore.append(moreButton);
    extra.append(learnMore);
    var favorite = document.createElement('div');
    $(favorite).addClass("ui animated button favMovie");
    var visible = document.createElement('div');
    $(visible).addClass("visible content favMovie");
    visible.textContent= "Favorite";
    favorite.append(visible);
    var hidden = document.createElement('div');
    $(hidden).addClass("hidden content");
    var icon = document.createElement('i');
    $(icon).addClass("heart icon favMovie");
    var hiddenId = document.createElement('p');
    $(hiddenId).attr('id', 'imdbId');
    $(hiddenId).hide();
    hiddenId.textContent= data.imdbID;
    extra.append(hiddenId);
    hidden.append(icon);
    favorite.append(hidden);
    extra.append(favorite);
    uiCard.append(extra);
    resultContainer.append(uiCard);
    $(uiCard).addClass("column");

  }
}


//Adds event listner to the 'Learn More' button on each card.
//Stores the IMDb ID to local storage.
//Redirects user to the secondary page and more information.
var learnMoreBtn = document.querySelector('.learnMore');
  document.body.addEventListener("click", function(event) {
    if (event.target.classList.contains ('learnMore')) {
      var getID = event.target.parentElement.nextSibling;
      var logID = getID.textContent;
      localStorage.setItem('imdbID', JSON.stringify(logID));
      window.location.replace("./learnMore.html");
    }
  });

  var favoriteBtn = document.querySelector('.favMovie');
  document.body.addEventListener("click", function(event) {
    if (event.target.classList.contains ('favMovie')) {
     var getTitle= event.target.parentElement.parentElement.parentElement.parentElement.firstChild.nextSibling.firstChild;
     var movieTitle= getTitle.textContent
     console.log(movieTitle)
    
      saveMovie(movieTitle);
    }
  });
  
  function saveMovie(movieTitle) {
      likedMovie = {
              Movie:movieTitle,
          
          }
          console.log(likedMovie);
          var favoriteMovies = localStorage.getItem("favoriteMovies");
          if (favoriteMovies === null) {
              favoriteMovies = [];
          } else {
              favoriteMovies = JSON.parse(favoriteMovies);
          }
          favoriteMovies.push(likedMovie);
          var newSearch = JSON.stringify(favoriteMovies);
          localStorage.setItem("favoriteMovies", newSearch);
          displayFavoriteMovies()
        }
    
        function displayFavoriteMovies() {
          var favorites = document.getElementById('favorite-movies')
          favorites.textContent = '';
          var favoriteMovies = localStorage.getItem("favoriteMovies");
          var parsed = JSON.parse(favoriteMovies);
          if (parsed !== null) {
        
        
              for (var i = 0; i < parsed.length; i++) {
         
                  var createLi = document.createElement("li");
                  createLi.textContent = parsed[i].Movie;
                 
                  favorites.appendChild(createLi);
         
              }
          }
        
        
           
        }
        displayFavoriteMovies()
        
clearBtn.addEventListener('click', clearFavorites)

function clearFavorites() {
  favorites.textContent = '';
}