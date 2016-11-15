var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/db_name");


// BRING IN YOUR SCHEMAS & MODELS
require('../models/user.model');
