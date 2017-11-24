const axios = require('axios');

const BASE_URL = 'http://api.steampowered.com';
const STEAM_API_KEY = '9F244C44270D8C67BC15EA8ABF706FC6';

export { getRepos, getUserData, isSteamLoggedIn };

function isSteamLoggedIn() {

  // Check Steam authentication
  axios.get('/authcheck')
  .then((response) => {

    // Set state for authenticated user
    if(response.data.status === 'authed')
    {
      this.setState({
        loading: false,
        auth: response.data.status,
        steamid: response.data.user.steamid, 
        username: response.data.user.username,
        profile: response.data.user.profile,
        avatar: response.data.user.avatar
      });
    }
    // Set loader indicator state for not authenticated user
    if(response.data.status === 'not_authed') {
      this.setState({
        loading: false
      });
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

function getSteamFriendList(user_id) {

  axios.get(`${BASE_URL}/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${user_id}&relationship=friend`)
  .then((response) => {

    if(response.data.friendslist)
    {
      return response.data.friendslist;
    }

    if(response.data.status === 'not_authed') {
      this.setState({
        loading: false
      });
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });



  fetch(`/ISteamUser/GetFriendList/v0001/?key=9F244C44270D8C67BC15EA8ABF706FC6&steamid=76561198038689431&relationship=friend', {mode: 'no-cors'})
  .then((response) => {
    return response.text();
  }).then(function(text) {  
    var obj = JSON.parse(text);
    console.log(obj);
  })  
  .catch(function(error) {  
    console.log('Request failed', error)  
  });
}

function getRepos(username) {
  const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
  return axios.get(url).then(response => response.data);
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