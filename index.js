let value = document.querySelector(".home__input")

value.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    searchBarClick();
  }
});

async function searchBarClick() {
  const value = document.querySelector(".home__input").value;

  searchResult(value);
  await fetchMovies(value);
}

  function searchResult(value) {
    const searchResult = document.querySelector(".movies__heading-result");
    const searchHeading = document.querySelector(".movies__heading");
  
    searchResult.innerHTML = `"${value}"`;
  
    searchHeading.style.display = "block";
    searchResult.style.display = "block";
  }

async function fetchMovies(value) {
  const movies = document.querySelector("#movies-list");

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

