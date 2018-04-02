const mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    name: String,
    region: [String]
});

mongoose.model('country', countrySchema);