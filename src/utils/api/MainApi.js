import { apiInfo } from "../constants/apiInfo"

class MainApi {
    constructor(options) {
        this._apiUrl = options.baseUrl;
        this._authUrl = options.authUrl;
        this._registerUrl = options.registerUrl;
        this._checkUrl = options.checkUrl;
        this._moviesUrl = options.moviesUrl;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }
    _getApiData(requestUrl, token) {
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    _setApiData(requestUrl, options) {
        return fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    checkAuthorization(token) {
        return fetch(`${this._apiUrl}${this._checkUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    registerUserRequest(options) {
        return this._setApiData(`${this._apiUrl}${this._registerUrl}`, options);
    }
    authorizeUserRequest(options) {
        return this._setApiData(`${this._apiUrl}${this._authUrl}`, options);
    }
    getMovies(token) {
        return this._getApiData(`${this._apiUrl}${this._moviesUrl}`, token);
    }
    getFilteredMovies(searchQuery, shortsOnly, token) {
        return fetch(`${this._apiUrl}${this._moviesUrl}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                const filteredMovies = result.data.filter(movie => {
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
    saveMovie(token, options) {
        return fetch(`${this._apiUrl}${this._moviesUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(options)
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    deleteMovie(token, movieId) {
        return fetch(`${this._apiUrl}${this._moviesUrl}/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    editUser(token, options) {
        return fetch(`${this._apiUrl}${this._checkUrl}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(options)
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
}
export const mainApiClass = new MainApi(apiInfo);