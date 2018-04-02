var mongoose = require('mongoose');
var touristModel = mongoose.model('tourist');

module.exports.touristAdd = function(req, res) {

    var newTourist = new touristModel({
        childrenList: req.body.childrenList,
        countryRegions: req.body.countryRegions,
        hotelStars: req.body.hotelStars,
        hotelTypes: req.body.hotelTypes,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        country: req.body.country,
        manager: req.body.manager,
        index_id: req.body.index_id,
        startTalk: req.body.startTalk,
        wishes: req.body.wishes,
        wishesAnother: req.body.wishesAnother,
        restFrequency: req.body.restFrequency,
        sputnic: req.body.sputnic,
        makeDecisions: req.body.makeDecisions,
        importantNuances: req.body.importantNuances,
        importantNuancesMotivation: req.body.importantNuancesMotivation,
        earlyReserve: req.body.earlyReserve,
        earlyAgency: req.body.earlyAgency,
        earlyAgencyChangeCause: req.body.earlyAgencyChangeCause,
        earlyAgencyMinus: req.body.earlyAgencyMinus,
        countryErVis: req.body.countryErVis,
        endRequirements: req.body.endRequirements,
        requirements: req.body.requirements,
        earlyHotels: req.body.earlyHotels,
        earlyHotelsPlus: req.body.earlyHotelsPlus,
        earlyHotelsMinus: req.body.earlyHotelsMinus,
        countryVisited: req.body.countryVisited,
        countryVisitedEarly: req.body.countryVisitedEarly,
        otherRestFeatures: req.body.otherRestFeatures,
        tripStart: req.body.tripStart,
        tripEnd: req.body.tripEnd,
        tripDurationFrom: req.body.tripDurationFrom,
        tripDurationTo: req.body.tripDurationTo,
        quantity: req.body.quantity,
        hasChildren: req.body.hasChildren,
        childrenQuantity: req.body.childrenQuantity,
        childrenHasPassport: req.body.childrenHasPassport,
        childrenHasPermission: req.body.childrenHasPermission,
        favoriteAirports: req.body.favoriteAirports,
        regionFavorite: req.body.regionFavorite,
        selectRegion: req.body.selectRegion,
        favoriteRegion: req.body.favoriteRegion,
        hotelLine: req.body.hotelLine,
        hotelRate: req.body.hotelRate,
        time: req.body.time,
        messenger: req.body.messenger,
        restMotivation: req.body.restMotivation,
        endTalk: req.body.endTalk,
        talkDuration: req.body.talkDuration
    });

    newTourist.save(function(err, doc) {
        if (err) return console.log(err);
        res.type('application/json');
        res.jsonp(doc);
        console.log("tourist " + req.body.lastName + " is added to collection");
    });
};

module.exports.touristReadOne = function(req, res) {
    touristModel.findOne({
        _id: req.params.id
    }, function(err, doc) {
        if (err) {
            return console.log(err)
        }
        console.log('GETTING DOC', doc);
        res.type('application/json');
        res.jsonp(doc);
    });
};

module.exports.touristListAll = function(req, res) {
    touristModel.find({}, function(err, doc) {
        if (err) {
            return console.log(err)
        };

        res.type('application/json');
        res.jsonp(doc);
    });
}

module.exports.touristesList = function(req, res) {
    console.log("req.params.id//////////==========", req.params.id);
    touristModel.find({
        index_id: req.params.id
    }, function(err, doc) {
        if (err) {
            return console.log(err)
        }
        console.log('GETTING DOC', doc);
        res.type('application/json');
        res.jsonp(doc);
    });
};

module.exports.touristUpdate = function(req, res) {

    touristModel.updateOne({
        _id: req.body._id
    }, {
        $set: {
            index_id: req.body.index_id,
            manager: req.body.manager
        }
    }, function(err) {
        if (err) return console.log(err);

        res.json("турист сменил менеджера");
        console.log("tourist is updated");
    });
};

module.exports.touristCollectionUpdate = function(req, res) {
    console.log(req.body);
    touristModel.updateMany({
        index_id: req.body._id
    }, {
        $set: {
            index_id: req.body.index_id,
            manager: req.body.manager
        }
    }, function(err) {
        if (err) return console.log(err);

        res.json("туристы (все в коллекции) сменили менеджера");
        console.log("touristes are updated");
    });
};