let requestMovieUrl = 'http://www.omdbapi.com/?apikey=2f390371';
var resultContainer = document.getElementById('results')
var modal = document.querySelector('.modal');
var modalDescription = document.querySelector('.modal-content');
var clearBtn = document.getElementById('clear-btn');
var favorites = document.getElementById('favorite-movies');

// Omdb api search query given a movie title returns json data for parsing and sends results to displayMovieCards for card generation
var getMovieQuery = function(movie) {
  var apiUrl = requestMovieUrl + '&s=' + movie;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data!==undefined) {
            displayMovieCards(data);
          } else {
            modalDescription.textContent = 'Error: ' + response.statusText;
            $('.ui.modal').modal('show');
          }
        });
      } else {
        modalDescription.textContent = 'Error: ' + response.statusText;
        $('.ui.modal').modal('show');
      }
    })
    .catch(function (error) {
      modalDescription.textContent = 'Unable to connect to OMDb database.';
      $('.ui.modal').modal('show');
    })
}

var searchBtn = document.querySelector(".ui button");
var input = document.querySelector("input");

// Takes search input and sends to getMovieQuery for omdb search
// Empty searches displays modal
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

// Event listener for search button click event
searchBtn.addEventListener("click", searchMovie);

// Makes the 'Enter' key functional wiith the searchMovie function
input.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
      searchMovie(event);
  }
});

// Generates card information and poster image to search results section of page
function displayMovieCards(data) {
  $('.movies').hide();
  $('.results-container').show();
  $(resultContainer).empty();
  var movieArray= data.Search;
  for (var i = 0; i < movieArray.length; i++) {
    var data = movieArray[i];
    var movieTitle = data.Title;
    var column = $('<div>')
    column.addClass('column');
    var uiCard = document.createElement('div');
    $(uiCard).addClass("fluid ui card");
    var spacer = document.createElement('div');
    $(spacer).addClass("fluid ui hidden divider");
    uiCard.append(spacer);
    var img = $('<img />', {
      src: data.Poster,
    });
    img.appendTo($(uiCard));
    var main = document.createElement('div');
    $(main).addClass("content");
    var title = document.createElement('a');
    $(title).addClass("compact segment header movieTitle");
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
    $(moreButton).addClass("fluid ui button learnMore");
    moreButton.textContent="Learn More";
    learnMore.append(moreButton);
    extra.append(learnMore);
    learnMore.append(spacer);
    var favorite = document.createElement('button');
    $(favorite).addClass('fluid ui button favMovie');
    favorite.textContent= "Favorite";
    var hiddenId = document.createElement('p');
    $(hiddenId).attr('id', 'imdbId');
    $(hiddenId).hide();
    hiddenId.textContent= data.imdbID;
    extra.append(hiddenId);
    extra.append(favorite);
    uiCard.append(extra);
    column.append(uiCard);
    console.log(column);
    $('#results').append(column);
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

// Event listener for the 'Favorite' button click to pass movie title to save functionality
var favoriteBtn = document.querySelector('.favMovie');
document.body.addEventListener("click", function(event) {
  if (event.target.classList.contains ('favMovie')) {
    var getTitle= event.target.parentElement.parentElement.firstChild.nextSibling.firstChild;
    var movieTitle= getTitle.textContent;
    saveMovie(movieTitle);
  }
});

// Saves movie title from favorting to local storage
// Checks that the movie is not already in favorites list
// Calls display function for favorited movies
function saveMovie(movieTitle) {
  var favoriteMovies = localStorage.getItem("favoriteMovies");
  if (favoriteMovies === null) {
    favoriteMovies = [];
  } else {
    favoriteMovies = JSON.parse(favoriteMovies);
  }
  if (favoriteMovies.includes(movieTitle)) {
    modalDescription.textContent = 'Movie already added to favorites.';
    $('.ui.modal').modal('show');
  } else {
    favoriteMovies.push(movieTitle);
    var newSearch = JSON.stringify(favoriteMovies);
    localStorage.setItem("favoriteMovies", newSearch);
  }
  displayFavoriteMovies();
}

// Displays favorited movies that exist in local storage and creates the list below the search bar
function displayFavoriteMovies() {
  var favorites = document.getElementById('favorite-movies');
  favorites.textContent = '';
  var favoriteMovies = localStorage.getItem("favoriteMovies");
  var parsed = JSON.parse(favoriteMovies);
  if (parsed !== null) {
    for (var i = 0; i < parsed.length; i++) {
      var createLi = document.createElement("div");
      $(createLi).addClass("item")
      createLi.textContent = parsed[i];
      createLi.style.borderBottom = 'thin dashed black';
      favorites.appendChild(createLi);
    }
  }
}
displayFavoriteMovies();

// Event listener for button click for clear favorites list
clearBtn.addEventListener('click', clearFavorites);

// Clears favorite list generated and local storage of that list
function clearFavorites() {
  favorites.textContent = '';
  localStorage.clear();
}