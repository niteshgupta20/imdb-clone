const movieOutput = document.getElementById('movie');

// fetch the details of a particular movie.
async function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  if (movieId === null) {
    return;
  }
  const spinner = `
                <div class="spinner-border text-primary mx-auto" role="status">
                </div>`;
  movieOutput.innerHTML = spinner;
  const response = await fetch(
    `https://omdbapi.com/?apikey=5e3f4bc1&i=${movieId}`
  );
  const movie = await response.json();
  if (movie) {
    let output = `
        <div class="row mb-2">
          <div class="col-md-3">
            <img src="${
              movie.Poster === 'N/A' ? 'img/default.jpg' : movie.Poster
            }" class="img-fluid" alt="Movie Poster">
          </div>
          <div class="col-md-9">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${
                movie.Genre === 'N/A' ? '' : movie.Genre
              }</li>
              <li class="list-group-item"><strong>Released:</strong> ${
                movie.Released === 'N/A' ? '' : movie.Released
              }</li>
              <li class="list-group-item"><strong>Rated:</strong> ${
                movie.Rated === 'N/A' ? '' : movie.Rated
              }</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                movie.imdbRating === 'N/A' ? '' : movie.imdbRating
              }</li>
              <li class="list-group-item"><strong>Director:</strong> ${
                movie.Director === 'N/A' ? '' : movie.Director
              }</li>
              <li class="list-group-item"><strong>Writer:</strong> ${
                movie.Writer === 'N/A' ? '' : movie.Writer
              }</li>
              <li class="list-group-item"><strong>Actors:</strong> ${
                movie.Actors === 'N/A' ? '' : movie.Actors
              }</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div>
            <h3>Plot</h3>
            ${movie.Plot === 'N/A' ? '' : movie.Plot}
            <hr>
            <a href="index.html" class="btn btn-primary">Go Back To Search</a>
          </div>
        </div>
      `;
    movieOutput.innerHTML = output;
  }
}

getMovie();
