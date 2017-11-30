import axios from 'axios';

const BASE_URL = 'http://api.steampowered.com';
const STEAM_API_KEY = '9F244C44270D8C67BC15EA8ABF706FC6';

export { isSteamLoggedIn, getSteamFriendList };

function isSteamLoggedIn() {
  return axios.get('/authcheck');
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