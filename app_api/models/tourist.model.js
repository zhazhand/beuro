const mongoose = require('mongoose');

var touristSchema = new mongoose.Schema({
    childrenList: [String],
    countryRegions: [String],
    hotelStars: [String],
    hotelTypes: [String],
    firstName: String,
    lastName: String,
    gender: String,
    country: String,
    manager: String,
    index_id: String,
    startTalk: Date,
    wishes: String,
    wishesAnother: String,
    restFrequency: String,
    sputnic: String,
    makeDecisions: String,
    importantNuances: String,
    importantNuancesMotivation: String,
    earlyReserve: String,
    earlyAgency: String,
    earlyAgencyChangeCause: String,
    earlyAgencyMinus: String,
    countryErVis: Boolean,
    endRequirements: Date,
    requirements: Number,
    earlyHotels: String,
    earlyHotelsPlus: String,
    earlyHotelsMinus: String,
    countryVisited: Boolean,
    countryVisitedEarly: String,
    otherRestFeatures: String,
    tripStart: Date,
    tripEnd: Date,
    tripDurationFrom: String,
    tripDurationTo: String,
    quantity: String,
    hasChildren: Boolean,
    childrenQuantity: String,
    childrenHasPassport: String,
    childrenHasPermission: String,
    favoriteAirports: String,
    regionFavorite: Boolean,
    selectRegion: [String],
    favoriteRegion: String,
    hotelLine: String,
    hotelRate: String,
    time: String,
    messenger: String,
    restMotivation: String,
    endTalk: Date,
    talkDuration: Number
});

mongoose.model('tourist', touristSchema);