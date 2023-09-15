const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const users = data.users;