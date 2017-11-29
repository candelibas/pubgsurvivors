const axios = require('axios');

const BASE_URL = 'http://api.steampowered.com';
const STEAM_API_KEY = '9F244C44270D8C67BC15EA8ABF706FC6';

export { getUserData, isSteamLoggedIn, getSteamFriendList };

function isSteamLoggedIn() {
  let state = null;
  // Check Steam authentication
  axios.get('/authcheck')
  .then((res) => {
    state = res.data.status;
  })
  .catch(function (error) {
    console.log(error);
  });
  return state;
} 

// Get all Steam friends
function getSteamFriendList(steam_id) {

  if(steam_id) {
    return axios.get(`
    ${BASE_URL}/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steam_id}&relationship=friend
    `);
  } else {
    return false;
  }

  
}


function getUserData(username) {
  return axios.all([
    axios.get(`${BASE_URL}/users/${username}`),
    axios.get(`${BASE_URL}/users/${username}/orgs`),
  ])
  .then(([user, orgs]) => ({
    user: user.data,
    orgs: orgs.data,
  }));
}