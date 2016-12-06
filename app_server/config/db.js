var mongoose = require('mongoose');


// mongoose.connect("mongodb://dangthailam:Lamtp1989@ds119578.mlab.com:19578/moniteurdeconduite");
mongoose.connect("mongodb://localhost/db_name");


// BRING IN YOUR SCHEMAS & MODELS
require('../models/user.model');
