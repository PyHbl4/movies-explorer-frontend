import { moviesApiInfo } from "../constants/moviesApiInfo"

class MoviesApi {
    constructor(options) {
        this._apiUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    getFilteredMovies(searchQuery, shortsOnly) {
        return fetch(this._apiUrl, {
            method: 'GET',
        })
            .then(this._checkResponse)
            .then((result) => {
                const filteredMovies = result.filter(movie => {
                    const { nameRU, nameEN, director, description, duration } = movie;
                    const searchText = searchQuery.toLowerCase().trim();
                    return (
                        (shortsOnly ? +duration <= 40 : true) &&
                        (nameRU.toLowerCase().includes(searchText) ||
                            nameEN.toLowerCase().includes(searchText) ||
                            director.toLowerCase().includes(searchText) ||
                            description.toLowerCase().includes(searchText))
                    );
                });
                return filteredMovies;
            });
    }

}

export const moviesApiClass = new MoviesApi(moviesApiInfo);