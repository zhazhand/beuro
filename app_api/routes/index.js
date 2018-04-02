var express = require('express');
var router = express.Router();
var ctrlLogin = require('../controllers/login');
var ctrlTourist = require('../controllers/tourist');

router.get('/manager', ctrlLogin.managerList); //get запрос по ссылке /manager будет получать список менеджеров
router.put('/manager', ctrlLogin.managerUpdate); //put запрос по ссылке /manager будет обновлять данные менеджера
router.post('/manager', ctrlLogin.managerAdd); //post запрос по ссылке /manager будет создавать нового менеджера
router.delete('/manager', ctrlLogin.managerDelete); //delete запрос по ссылке /admin будет удалять менеджера

router.get('/country', ctrlLogin.countryList); //get запрос по ссылке /country будет получать список стран

router.put('/touristes_change', ctrlTourist.touristCollectionUpdate); //put запрос по ссылке /touristes_change будет обновлять менеджера у коллекции туристов
router.put('/tourist', ctrlTourist.touristUpdate); //put запрос по ссылке /tourist будет обновлять данные туриста
router.post('/tourist', ctrlTourist.touristAdd); //post запрос по ссылке /tourist будет добавлять нового туриста
router.get('/tourist', ctrlTourist.touristListAll); //get запрос по ссылке /tourist будет получать список всех туристов
router.get('/tourist/tourist_id/:id', ctrlTourist.touristReadOne); //get запрос по ссылке будет получать данные туриста
router.get('/tourist/touristes_list/:id', ctrlTourist.touristesList); //get запрос по ссылке будет получать список туристов прикрепленных к менеджеру

//router.get('/admin', ctrlLogin.adminReadOne); //get запрос по ссылке /admin будет получать данные администратора
router.put('/admin', ctrlLogin.adminUpdate); //put запрос по ссылке /admin будет обновлять данные администратора

router.get('/logins', ctrlLogin.loginList); //get запрос по ссылке /logins будет получать список логинов для входа
router.post('/logins', ctrlLogin.loginPass); //post запрос по ссылке /logins будет проверять соответствие пароля логину


module.exports = router;