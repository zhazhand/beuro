const mongoose = require('mongoose');

var managerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    login: {
        type: String,
        unique: true
    },
    password: String,
    admission: Boolean
});

mongoose.model('manager', managerSchema);