const axios = require('axios');


const getShows = () =>
{
    return axios.get("https://api.tvmaze.com/shows");
}

const getShowById = (id) =>
{
    return axios.get("https://api.tvmaze.com/shows/" + id);
}

module.exports = {getShows, getShowById}