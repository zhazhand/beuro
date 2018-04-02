var mongoose = require('mongoose');
var managerModel = mongoose.model('manager');
var countryModel = mongoose.model('country');
var url = require('url');
const qs = require("querystring");

/*var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}*/

/*var dbURI = 'mongodb://localhost:27017/bpVP';
const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};*/

/*var managerModel = require('../models/manager');*/

//Получение списка менеджеров
module.exports.managerList = function(req, res) {
    managerModel.find({
        login: {
            $ne: 'admin'
        }
    }, function(err, doc) {
        if (err) {
            return console.log(err)
        };

        res.type('application/json');
        res.jsonp(doc);
    });
}

//Получение списка логинов менеджеров
module.exports.loginList = function(req, res) {
    managerModel.find({}, {
        login: true,
        _id: false
    }, function(err, doc) {
        if (err) {
            return console.log(err)
        };

        res.type('application/json');
        res.jsonp(doc);
    });
}

//Сверка логина и пароля
module.exports.loginPass = function(req, res) {
    managerModel.findOne({
        login: req.body.login,
        password: req.body.password
    }, function(err, doc) {
        if (err) {
            return console.log(err)
        };

        res.type('application/json');
        res.jsonp(doc);
    });
}

/*//Получение данных администратора
module.exports.adminReadOne = function(req, res) {
    managerModel.findOne({
        login: "admin"
    }, {
        password: true
    }, function(err, doc) {
        if (err) {
            return console.log(err)
        };

        res.type('application/json');
        res.jsonp(doc);
    });
}*/

//Обновление данных администратора
module.exports.adminUpdate = function(req, res) {
    managerModel.updateOne({
        _id: req.body._id,
        password: req.body.oldPassword
    }, {
        $set: {
            password: req.body.newPassword
        }
    }, function(err, doc) {
        if (err) return console.log(err);

        if (doc.n) {
            res.status(200).send();
            console.log("admin is updated", doc);
        } else {
            res.status(403).send();
        }
    });
};
//Удаление менеджера
module.exports.managerDelete = function(req, res) {
    let parse_url = url.parse(req.url).query;
    let idd = qs.parse(parse_url).id;
    console.log('=====================================');
    console.log(idd);
    managerModel.remove({
        _id: idd
    }, function(err) {
        if (err)
            res.send(err);
        res.json("Manager deleted :(");
    });
};

//Добавление менеджера
module.exports.managerAdd = function(req, res) {
    console.log('=====================================');
    console.log(req.body);
    var newManager = new managerModel({
        login: req.body.login,
        name: req.body.name,
        password: req.body.password,
        admission: req.body.admission
    });

    newManager.save(function(err, doc) {
        if (err) return console.log(err);
        res.type('application/json');
        res.jsonp(doc);
        console.log("manager " + req.body.name + " is added to collection");
    });
};

//Обновление данных менеджера
module.exports.managerUpdate = function(req, res) {

    let parUpdt = req.body._id;

    managerModel.update({
        _id: parUpdt
    }, {
        id: parUpdt,
        login: req.body.login,
        name: req.body.name,
        password: req.body.password,
        admission: req.body.admission
    }, {
        upsert: false
    }, function(err, doc) {
        if (err) return console.log(err);

        res.json("manager " + req.body.name + " is updated");
        console.log("manager is updated");
    });
};
//Получение списка стран
module.exports.countryList = function(req, res) {

    countryModel.find({}, function(err, doc) {
        if (err) {
            return console.log(err)
        };

        res.type('application/json');
        res.jsonp(doc);
    });
};