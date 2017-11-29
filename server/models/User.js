const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: String,
  username: String,
  steam_profile: String,
  avatar: String 
});

module.exports = mongoose.model('User', userSchema);