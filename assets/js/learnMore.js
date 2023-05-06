let requestMovieUrl = ' https://www.omdbapi.com/?apikey=9b9137db';
let backToHome = document.querySelector('#homeBtn');
let youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
let googleapiKey = 'AIzaSyCHGRBU3FkHUBex7-Ry8oZIxA-fQvhVnZc';

// Event listener for return to home screen button to continue searching 
// Clears local storage of imdbID so that it does not persist with continued searches and cause issues with additional learnMore page loading
backToHome.addEventListener('click', function() {
    localStorage.removeItem("imdbID");
    window.location.replace('./index.html');
})

// Omdb api request for specific movie title given the imdbID
// Sends api data response to display card generation and extra infor generation
var getMoreInfo = function(imdbID) {
  var apiUrl = requestMovieUrl + '&i=' + imdbID + '&plot=full';

  fetch(apiUrl)
    .then(function (response) {  
      if (response.ok) {
        response.json().then(function (data) {
          displayMovieCard(data);
          displayExtraInfo(data);
        });
      } else {
        modalDescription.textContent = 'Error: ' + response.statusText;
      }
    })
    .catch(function (error) {
      modalDescription.textContent = 'Unable to connect to OMDb database';
      $('.ui.modal').modal('show');
    })
}

// Pulls imdbID from local storage that was saved from the previous page from clicking the 'Learn More' button
// Sends imdbID to omdb api call function and youtube v3 api
function getMoreData () {
  var movie = JSON.parse(localStorage.getItem("imdbID"));
  getMoreInfo(movie);
  findVideo(movie);
}

getMoreData();

// Generates the display card for the movie similarily to the one one the previous page
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

// Displays the additional infomation about the movie (full plot summary, cast, director, and writer)
function displayExtraInfo(data) {
  var plot= document.getElementsByClassName('plot');
  $(plot).text(data.Plot);
  var cast= document.getElementsByClassName('cast');
  $(cast).text(data.Actors);
  var director= document.getElementsByClassName('director');
  $(director).text(data.Director);
  var writer= document.getElementsByClassName('writer');
  $(writer).text(data.Writer);
}

// Youtube v3 api query to find the movie's trailer
// Finds the first video the matches the given the imdbID and trailer
function findVideo(imdbID) {
  var query = `${youtubeURL}?part=snippet&q=${imdbID}%20trailer&key=${googleapiKey}`;
  if (document.getElementsByClassName('movieTitle')) {
    fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let videos = data.items;
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].snippet.title.includes(document.querySelector('.movieTitle').textContent)) {
          var videoMatch = videos[i];
          var videoID = videoMatch.id.videoId;
          var movieTrailerURL =`https://www.youtube.com/watch?v=${videoID}`;
          $(document).ready(showVideo(movieTrailerURL));
          break;
        }
      }
    })
  } else {
    setTimeout(findVideo, 15);
  }
}

// Displays the movie trailer found from the youtube v3 api request and embeds it below the displayed movie info
// Adds youtube source data given semantic ui class guidelines
// Makes the video adjust in size to screen display 
function showVideo(video) {
  if (video){
    var embedlink = video.replace(/watch\?v=/,`embed/`)
    var id = video.substring(32,video.length);
    var videocontainer = document.createElement('div');
    $(videocontainer).addClass('ui embed fullscreen');
    var videoplayer = document.createElement('iframe');
    $(videocontainer).attr('id','video');
    $(videocontainer).attr('data-source','youtube');
    $(videocontainer).attr('data-id',id);
    $(videoplayer).attr('src',embedlink);
    $(videoplayer).attr('class','fluid ui container');
    $(videoplayer).attr('width','100%');
    $(videoplayer).attr('height','100%');
    $(videoplayer).attr('scrolling','no');
    $(videoplayer).appendTo(videocontainer);
    var main = document.getElementsByTagName('main');
    $(main).children().first().append(videocontainer);
  } else {
    setTimeout(showVideo,30);
  }
}
