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

  const container = document.getElementById('results');
  
  apiResult.forEach((result) => {

    const card = document.createElement('div');
    card.classList = 'card-body';
  
    const content = `
    <div class="ui card">
    <div class="image">
      <img src="./batman-superman.jpg">
    </div>
    <div class="content">
      <a class="header">${result.title}</a>
      <div class="meta">
        <span class="date">${result.releaseYear}</span>
        <span class="runtime">${result.runTime}</span>
      </div>
      <div class="description">
        ${result.description}
      </div>
    </div>
    <div class="extra content">
      <a>
        <button class="ui button">Learn More</button>
      </a>
      <div class="ui animated button" tabindex="0">
        <div class="visible content">Favorite</div>
        <div class="hidden content">
          <i class="heart icon"></i>
        </div>
    </div>
  </div>
    `;
  
    container.innerHTML += content;
  })