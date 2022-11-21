import axios from "axios"

export let endpoint = {
    'Users': (page) => `api/Users/Pagination/${page}`,
    'ListUser': (page) => `api/Users/Current/${page}`,
    'FindUser': (find) => `api/Users/Find/${find}`,
    'SortUser': (sort) => `api/Users/Sort/${sort}`,
    'ListUserByType': (type, page) => `api/Users/${type}/${page}`
}
export default axios.create({
    baseURL: 'https://localhost:44303'
})