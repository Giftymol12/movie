// TMDB

// Urls and API 

const API_KEY = 'api_key=b8f7c239fbb91a854b03b3aec88227b4';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + 'search/movie?' + API_KEY;
const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

// creating constants and assigning ids

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsElement = document.getElementById('tags')

// to show genres

var selectedGenre = []
setGenre();
function setGenre() {
    tagsElement.innerHTML = ''; //to remove elements when the page is reloaded
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tags');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id)
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, index) => {
                        if (id == genre.id) {
                            selectedGenre.splice(index, 1);
                        }
                    })
                }
                else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
        })
        tagsElement.append(t);

    })

}

// to show the details in cards

getMovies(API_URL);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);

    })
}



function showMovies(data) {
    main.innerHTML = '';
    data.forEach(moviecard => {
        const { title, poster_path, vote_average, overview } = moviecard;
        const movieElement = document.createElement('div');
        movieElement.classList.add('moviecard');
        movieElement.innerHTML =
            ` <div class="moviecards">
                       <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h2>${title}</h2>
                <h4>${vote_average}</h4>
            </div>
            <div class="movie-review">
               ${overview}
            </div>
            </div>`
        main.appendChild(movieElement)
    })

    console.log(data.results);
}

// search 


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    }
})
