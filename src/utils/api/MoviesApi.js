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

    getMovies() {
        return fetch(this._apiUrl, {
            method: 'GET',
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

}

export const moviesApiClass = new MoviesApi(moviesApiInfo);