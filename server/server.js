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

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(require('express-session')({ resave: true, saveUninitialized: true, name: 'sesid', secret: 'a secret' }));

passport.use(new SteamStrategy({
	returnURL: `http://${HOST}/auth/steam/return`,
	realm: `http://${HOST}`,
	apiKey: config.STEAM_API_KEY
},
function(identifier, profile, done) {
	// asynchronous verification, for effect...
	process.nextTick(function () {

		// To keep the example simple, the user's Steam profile is returned to
		// represent the logged-in user.  In a typical application, you would want
		// to associate the Steam account with a user record in your database,
		// and return that user instead.
		profile.identifier = identifier;
		return done(null, profile);
	});
}
));

app.use(passport.initialize());
app.use(passport.session());
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieParser());

app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
		let token;

	if (req.user) {
		let userData = {
			steamid: req.user._json.steamid,
			username: req.user.displayName,
			profile: req.user._json.profileurl,
			avatar: req.user._json.avatarmedium
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
				result.save(function (error) {
					if (!error) {
						// Create our json webtoken for user data
						token = jwt.sign(userData, config.JWT_SECRET, { expiresIn: '1h' });

						// Set cookie for json webtoken data and return user to home page
						res.cookie('token', token);
						res.redirect(`/`); // dev - heroku does not let us to use port
						//res.redirect('/'); // prod
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
app.get('/authcheck', function (req, res) {

	let token = req.cookies.token;

	// verify a token symmetric
	jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
		if (err) {
			res.json({ status: 'not_authed' });
		} else {

			User.find({"steamid": decoded.steamid}, (err, user_data) => {  
				if (err) {
					res.json({ status: 'no_user' });
				} else {
						res.json({ status: 'authed', user: user_data });
				}
			});

			
		}
	});

});


/*
// Get user profile
app.get('/get-profile', function (req, res) {

	let token = req.cookies.token;
	// verify a token symmetric
	jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
		if (err) {
			res.json({ status: 'not_authed' });
		} else {
			// Seek and destroy! Jebaited
			User.
			res.json({ status: 'authed', user: decoded });
		}
	});
}); */

/* Update user profile
app.post('update-profile', (req, res) => {
	const { steamid } = req.body;
	let token = req.cookies.token;
	jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.json({ status: 'not_authed' });
		} else {
			// Update user profile on Mongoose

			User.
			res.json({ status: 'authed', user: decoded });
		}
	});
}); */

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`);
});