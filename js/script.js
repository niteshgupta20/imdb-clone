const searchbar = document.querySelector('#searchText');
let resultList = document.querySelector('#result');
let favouriteMovies = getLocalStrorage();

if (searchbar != null) {
  searchbar.addEventListener('keyup', async (event) => {
    const text = event.target.value;
    if (text === '') {
      resultList.classList.remove('d-block');
      resultList.classList.add('d-none');
    } else {
      const data = await getMovies(text);
      addToDOM(data);
      resultList.classList.remove('d-none');
      resultList.classList.add('d-block');
    }
  });
}

function addToDOM(data) {
  resultList.innerHTML = '';
  let output = '';
  if (data.Response == 'False') {
    output = '<p>No results</p>';
  } else {
    const movies = data.Search;
    movies.forEach((movie) => {
      output += `
          <li class="list-group-item">
            <a href="#" class="d-flex justify-content-between align-items-center">
             <img src="${movie.Poster}" alt="img" class="search-img" />
             <p class="d-inline text-dark title" data-id="${movie.imdbID}">${movie.Title}</p>
             <i class="bi bi-heart f-22 text-danger" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add to favourites" data-img="${movie.Poster}" data-name="${movie.Title}" data-id="${movie.imdbID}"></i>
            </a>
          </li>
      `;
    });
  }
  resultList.style.overflow = 'scroll';
  resultList.innerHTML = output;
  enableTooltip();
}

async function getMovies(searchText) {
  try {
    const response = await fetch(
      `https://omdbapi.com/?apikey=5e3f4bc1&page=1&s=${searchText}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error in getMovies: ', error);
  }
}

function handleClickEvent(event) {
  const target = event.target;
  if (target.classList.contains('title')) {
    const id = target.dataset.id;
    movieSelected(id);
  }
  if (target.classList.contains('bi-heart')) {
    target.classList.remove('bi-heart');
    target.classList.add('bi-heart-fill');
    const favouriteMovie = {};
    favouriteMovie.id = target.dataset.id;
    favouriteMovie.name = target.dataset.name;
    favouriteMovie.img = target.dataset.img;
    addTofavouites(favouriteMovie);
  }
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
}

function addTofavouites(favouriteMovie) {
  if (favouriteMovie) {
    favouriteMovies.push(favouriteMovie);
    updateLocalStorage();
    alert('Added to Favourites');
  }
}

function updateLocalStorage() {
  localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
}

function getLocalStrorage() {
  const data = JSON.parse(localStorage.getItem('favouriteMovies'));
  if (data != null) {
    return data;
  } else {
    return [];
  }
}

document.addEventListener('click', handleClickEvent);

// Enabling bootstrap tooltip
function enableTooltip() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}
