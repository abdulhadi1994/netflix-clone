let value = document.querySelector(".home__input")

value.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    searchBarClick();
  }
});

async function searchBarClick() {
  const value = document.querySelector(".home__input").value;

  const movies = document.querySelector(".movies__list")
  const loadingSpinner = `<i class="fa-solid fa-spinner movies__list-spinner" id="spinner"></i>`
  movies.innerHTML = loadingSpinner

  searchResult(value);
  await fetchMovies(value);
}

  function searchResult(value) {
    const searchResult = document.querySelector(".movies__heading-result");
    const searchHeading = document.querySelector(".movies__heading");
  
    searchResult.innerHTML = `"${value}"`;
    searchResult.style.display = 'block'
  }

async function fetchMovies(value) {
  const movies = document.querySelector("#movies-list");

  try{
  const response = await fetch(
    `https://omdbapi.com/?type=movie&apikey=13d20677&s=${value}`
  );

  const data = await response.json();
  const slicedArray = await data.Search.slice(0, 6);

  const moviesHTML = slicedArray
    .map((movie) => {
      return `<div class="movie">
   <figure class="movie__img-wrapper">
     <img src="${movie.Poster}" alt="" class="movie__img" />
     <h3 class="movie__info-title">${movie.Title}</h3>
     <div class="movie__info-list">
       <div class="movie__info movie__info1">
         <p class="movie__info--text">
           <i class="fa-solid fa-clock"></i> 136m
         </p>
       </div>
       <div class="movie__info movie__info2">
         <p class="movie__info--text">
           <i class="fa-solid fa-star"></i> 4.5
         </p>
       </div>
       <div class="movie__info movie__info3">
         <p class="movie__info--text">
           <i class="fa-solid fa-earth-americas"></i> English
         </p>
       </div>
     </div>
   </figure>
 </div>`;
    })
    .join("");
   
  movies.innerHTML = moviesHTML;
}

catch (e) {
  console.error("Error fetching movies:", e);
  movies.innerHTML = `<div class="error__">
        <p class="error-message">Your search for <span class="movie-error">"${value}"</span> did not have any matches.</p>
        <div class="error-suggestion-wrapper">
        <p class="error-suggestions">Suggestions:
          <li>
            Try different keywords
          </li>
          <li>
            Looking for a film or TV programme?
          </li>
          <li>
            Try using a film, TV programme title, an actor or director
          </li>
          <li>
            Try a genre, such as comedy, romance, sports or drama
          </li>
        </div>
        </p>
      </div>`
}
}