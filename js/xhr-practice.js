// This is now an Array
let jsonData = JSON.parse(xhr.responseText);

/*
// OPTION 1: counted loop
for (let i = 0; i < jsonData.results.length; i++) {

  const movie = jsonData.results[i];

  let img = `http://image.tmdb.org/t/p/w400${movie.poster_path}`;
  movieDiv.innerHTML += `
    <a data-movieid="${movie.id}"><img src="${img}" id="button"></a>
    <h1 class="title">${movie.title}</h1><h2 class="subtitle">${movie.overview}</h2>
    <p class="subtitle">Rating ${movie.vote_average}</p> 
    <p class="subtitle">Release Date: ${movie.release_date}</p>
    `
}*/

/*
// OPTION 2: forEach
jsonData.results.forEach( movie => {
  let img = `http://image.tmdb.org/t/p/w400${movie.poster_path}`;
  movieDiv.innerHTML += `
    <a data-movieid="${movie.id}"><img src="${img}" id="button"></a>
    <h1 class="title">${movie.title}</h1><h2 class="subtitle">${movie.overview}</h2>
    <p class="subtitle">Rating ${movie.vote_average}</p> 
    <p class="subtitle">Release Date: ${movie.release_date}</p>
    `;
})*/


const formatMovieToHtml = (movie) => {
  let img = `http://image.tmdb.org/t/p/w400${movie.poster_path}`;
  return `
    <a data-movieid="${movie.id}"><img src="${img}" id="button"></a>
    <h1 class="title">${movie.title}</h1><h2 class="subtitle">${movie.overview}</h2>
    <p class="subtitle">Rating ${movie.vote_average}</p> 
    <p class="subtitle">Release Date: ${movie.release_date}</p>
    `;
}

movieDiv.innerHTML = jsonData.results.map( formatMovieToHtml ).join(``);

const apiKey = `069ab44642a4a50fee3bb9fdfc9677a2`;
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4) {
    // All good!
    // Remove loading modal
  }
}

const getDateFromCertainPage = (pg) => {
  let endPoint = `https://api.themoviedb.org/3/movie/popular?page=${pg}&language=en-US&api_key=${apiKey}`; 
  // Add loading modal here
  xhr.open(`GET`, endPoint);
  xhr.send();
}

const getMovieFromId = (id) => {
  let endPoint = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`; 
  xhr.open(`GET`, endPoint);
  xhr.send();
}
