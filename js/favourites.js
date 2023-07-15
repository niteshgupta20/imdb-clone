const fmovies = document.getElementById('favouriteMovies');

// get the favourites from the local storage.
function getFavouriteMovies() {
  const response = localStorage.getItem('favouriteMovies');
  const movies = JSON.parse(response);
  addToDOM(movies);
}

// add the favouites movie in the database
function addToDOM(movies) {
  let output = '';
  if (movies != null) {
    movies.forEach((movie) => {
      output += `
      <div class="col-md-3 mb-2">
        <div class="card bg-dark text-white border" style="width: 18rem;">
         <img src="${
           movie.img === 'N/A' ? 'img/default.jpg' : movie.img
         }" class="card-img-top" alt="...">
         <div class="card-body d-flex flex-column justify-content-center align-items-center">
           <h5 class="card-title">${movie.name}</h5>
           <button class="btn btn-danger" onclick="removeFavouriteMovie('${
             movie.id
           }')">Remove From Favourites</button>
         </div>
        </div>
      </div>
      `;
    });
  }
  fmovies.innerHTML = output;
}

// it will remove a movie from the favourite movies
function removeFavouriteMovie(movieId) {
  const newfavouriteMovies = favouriteMovies.filter((favouriteMovie) => {
    return favouriteMovie.id != movieId;
  });
  favouriteMovies = newfavouriteMovies;
  updateLocalStorage();
  addToDOM(favouriteMovies);
}

getFavouriteMovies();
