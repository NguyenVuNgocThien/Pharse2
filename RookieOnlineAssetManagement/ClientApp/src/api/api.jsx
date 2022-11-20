import axios from "axios";

export let endpoint = {
    ListUser: "api/Users",
    FindUser: (find) => `api/Users/Find/${find}`,
    SortUser: (sort) => `api/Users/Sort/${sort}`,
    ListUserByType: (type) => `api/Users/${type}`,
};
export default axios.create({
    baseURL: "https://localhost:5001",
});
