const express = require('express');
const path = require('path');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const steam = require('steam-login');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const TOKEN_SECRET = 'dafuqsecret';

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieParser());


app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
	realm: 'http://localhost:5000/', 
	verify: 'http://localhost:5000/verify',
	apiKey: '9F244C44270D8C67BC15EA8ABF706FC6'}
));


app.get('/auth', steam.authenticate(), function(req, res) {
	res.redirect('/');
	console.log(req);
});


app.get('/verify', steam.verify(), function(req, res) {
	//res.send(req.user.steamid).end();
	let token;

	if(req.user) {
		let userData = {
			steamid: req.user.steamid,
			username: req.user.username,
			profile: req.user.profile,
			avatar: req.user.avatar.medium
		};
		
		token = jwt.sign(userData, TOKEN_SECRET, { expiresIn: 4000 });

		res.cookie('token', token);
		res.redirect('http://localhost:3000');
		
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
	jwt.verify(token, TOKEN_SECRET, function(err, decoded) {
		if(err) {
			res.json({ status: 'not_authed' });
		} else {
			res.json({ status: 'authed', user: decoded });
		}
	});

});

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