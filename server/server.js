const express = require('express');
const path = require('path');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const steam = require('steam-login');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to our MongoDB server
mongoose.connect(`mongodb://${config.MONGO_USER}:${config.MONGO_PASS}@ds255455.mlab.com:55455/pubgsurvivors`, { useMongoClient: true });
mongoose.Promise = global.Promise;

// Say "hi" to Express!
const app = express();

// Constants
const PORT = process.env.PORT || 5000; // 5000: Express server port
const CI_PORT = process.env.PORT || 3000; // 3000: React dev server port
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'production';

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieParser());

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
	realm: `http://${HOST}:${PORT}`, 
	verify: `http://${HOST}:${PORT}/verify`,
	apiKey: config.STEAM_API_KEY
}));

// Login via Steam
app.get('/auth', steam.authenticate(), function(req, res) {
	res.redirect('/');
	//console.log(req);
});

// Return callback for steam login
app.get('/verify', steam.verify(), function(req, res) {
	let token;

	if(req.user) {
		let userData = {
			steamid: req.user.steamid,
			username: req.user.username,
			profile: req.user.profile,
			avatar: req.user.avatar.medium
		};

		// If user data exists, do not create another one!
		let condition = { steamid: userData.steamid };
		let update = { 
			steamid: userData.steamid,
			username: userData.username,
			steam_profile: userData.profile,
			avatar: userData.avatar 
		};
		let options = { upsert: true };

		User.findOneAndUpdate(condition, update, options, (error, result) => {
			if (!error) {
					// If the document doesn't exist
					if (!result) {
							// Create it
							result = new Model();
					}
					// Save the document
					result.save(function(error) {
							if (!error) {
									// Create our json webtoken for user data
									token = jwt.sign(userData, config.JWT_SECRET, { expiresIn: 4000 });
									
									// Set cookie for json webtoken data and return user to home page
									res.cookie('token', token);
									//res.redirect(`http://${HOST}:${CI_PORT}`); // dev - heroku does not let us to use port
									res.redirect('/'); // prod
							} else {
									throw error;
							}
					});
			}
	});
		
	}
	else {
		res.json({
			status: 'not authorized'
		});
	}

	

});

// Check if user is authenticated with Steam
app.get('/authcheck', function(req, res) {

	let token = req.cookies.token;

	// verify a token symmetric
	jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
		if(err) {
			res.json({ status: 'not_authed' });
		} else {
			res.json({ status: 'authed', user: decoded });
		}
	});

});

// Probably not need but let it stay for logout from Steam
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
	req.logout();
	res.redirect('/');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});