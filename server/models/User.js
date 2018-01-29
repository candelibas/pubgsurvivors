const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: String,
  username: String,
  steam_profile: String,
  avatar: String,
  lang: { 
    type: Array, 
    default: ['all'] 
  },
  reddit: { type: String, default: '' },
  discord: { type: String, default: '' },
  fav_games: { type: String, default: '' },
  microphone: { type: Boolean, default: true },
  gamestyle: { type: String, default: true }
});

module.exports = mongoose.model('User', userSchema);