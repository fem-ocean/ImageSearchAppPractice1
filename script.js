//1. User types in a value in the input bar and we get the value
// 2. When user click on the search button, we would use the input value as a query to make the search to an API and get a result.
//3. the result is displayed in the .search-results class div.
//4.  if the result page is more than 1, the show more button displays. If it is not more than 1, it doesnt show.

// IMPORTANT VARIABLES

let page = 1;

const searchResults = document.querySelector(".search-results");

//1. User types in a value in the input bar and we get the value
const searchInput = document.getElementById("search-input");
let searchInputValue = "";

// 2. When user click on the search button we use the input value to make the search and it gets the result.

function getImages() {
  searchInputValue = searchInput.value;

  //form validation for empty input
  if (searchInputValue === "") {
    window.alert("Oops!....Empty query. You need to input a value");
  } else {
    const API = `https://api.unsplash.com/search/photos/?query=${searchInputValue}&client_id=QGtQu40-81LdBQtPOjxktYTtKy3b1OIAfw-tsB7XELU&page=${page}&orientation=landscape`;

    //This means when this function is called and the page equals 1, remove whatever content is in the div. i.e make the div empty.
    if (page === 1) {
      searchResults.innerHTML = "";
    }

    // consume the API
    fetch(API)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        var imageData = response.results;
        imageData.map((result) => {
          const searchResult = document.createElement("div");
          searchResult.classList.add("search-result");
          const image = document.createElement("img");
          image.src = result.urls.small;
          image.alt = result.alt_description;
          const anchor = document.createElement("a");
          anchor.href = result.links.html;
          anchor.target = "_blank";
          anchor.textContent = result.alt_description;

          searchResult.append(image);
          searchResult.append(anchor);
          document.querySelector(".search-results").append(searchResult);
        });
      })
      .catch((err) => console.log(err));

    //Increase the page count and let show-more-button know that page count has increased.
    page++;

    if (page > 1) {
      document.getElementById("show-more-button").style.display = "block";
    }
  }
}

//get the form element and put a submit event on it.

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  getImages();
});

//Event that happens when the show more button is clicked.

document.getElementById("show-more-button").addEventListener("click", () => {
  getImages();
});
