import axios from "axios";

const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://www.omdbapi.com'
})

const requestMovies = {
    getFoundMovies(fromSearch) {
        return instance.get(`/?s=${fromSearch}&apikey=4a3b711b`)
    },
    getMovie(name, year) {
        return instance.get(`/?t=${name}&y=${year}&apikey=4a3b711b`)
    }
}

export default requestMovies