let requestMovieUrl = 'http://www.omdbapi.com/?apikey=9b9137db';
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

// below is the code to dynamically generate the movie cards
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