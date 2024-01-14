const express = require('express');

const authRoute = express.Router();

const {login , signUp, setPreferences } = require('../controllers/auth');

authRoute.post('/login' , login);
authRoute.post('/signup' , signUp);
authRoute.post('/setPreference' , setPreferences);

module.exports = authRoute ;