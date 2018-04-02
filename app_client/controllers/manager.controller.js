(function() {
    angular
        .module('bpApp')
        .controller('managerCtrl', managerCtrl);

    managerCtrl.$inject = ['$scope', '$http', '$location', '$log', 'bpCurrent'];
    function managerCtrl($scope, $http, $location, $log, bpCurrent) {
        if (bpCurrent.getCurrent()) {
            var tmpCurrent = bpCurrent.getCurrent();
            var str = 'year=' + tmpCurrent.year + '&_id=' + tmpCurrent.member._id + '&name=' + tmpCurrent.member.name;
            $location.search(str);
        }
        $scope.current = $location.search();

        $http.get("countries.json").then(function(response) {
            $scope.countries = response.data;

        }, function(data, status, headers, config) {
            $log.log(data);
            $log.log(status);
            $log.log(headers);
            $log.log(config);
        });

        $scope.page = { //локальный объект для манипуляции с представлением
            comf: 0,
            newClient: 0,
            earlyCountries: [],
            airports: [],
            terminals: ["Киев", "Днепр", "Запорожье", "Кривой Рог", "Харьков", "Одесса", "Львов"],
            setChildrenArray: [],
            childrenListFlag: false,
            step1: false,
            step2: false,
            step3: false,
            step4: false,
            step5: false,
            step6: false,
            step7: false,
            step15: false
        };
        $scope.client = {}; //текущий турист

        function toSetRegion() {
            let country = $scope.client.country;
            for (var i = 0; i < $scope.countries.length; i++) {
                var arrayCountry = $scope.countries[i].name;
                if (country.toLowerCase() == arrayCountry.toLowerCase()) {
                    $scope.page.region = $scope.countries[i].region;
                    break;
                }
            }
        }

        $scope.page.toInp = function() {
            toSetRegion();
        };

        $scope.page.toSelect = function() {
            $scope.client.country = '';
            if ($scope.page.selected == $scope.countries[$scope.countries.length - 1]) {
                $scope.page.step7 = true;
            } else {
                $scope.page.step7 = false;
                $scope.client.country = $scope.page.selected.name;
            }
            toSetRegion();
            /*после выбора страны передаем в созданный объект (client) свойство manager - менеджер прикрепленный к клиенту*/
            $scope.client.manager = $scope.current.name;
            $scope.client.index_id = $scope.current._id;
            var manName = $scope.client.manager;
            manName = manName.split(' ');
            $scope.current.firstName = manName[0];
        }

        $scope.page.newStep = function() {
            $scope.page.newClient = $scope.page.newClient + 1;
        };
        $scope.page.oldStep = function() {
            $scope.page.newClient = $scope.page.newClient - 1;
        };

        $scope.page.comfort = function(par) {
            $scope.page.comf = par;
            if ($scope.page.comf == 1) {
                $scope.client.startTalk = new Date();
            }
        };

        $scope.page.peopleAmount = (function() {
            var result = [];
            for (var i = 0; i < 15; i++) {
                result[i] = +i + 1;
            }
            result.push('>15');
            return result;
        })();

        $scope.page.noChildren = function(par) {
            $scope.page.step3 = par;
        };

        $scope.page.childrenAmount = (function() {
            var result = [];
            for (var i = 0; i < 15; i++) {
                result[i] = +i + 1;
            }
            return result;
        })();

        $scope.client.setChildrenQuantity = function(par) {
            $scope.page.setChildrenArray.length = 0;
            for (var i = 0; i < par; i++) {
                $scope.page.setChildrenArray[i] = +i + 1;
            }
        };

        $scope.client.childrenList = [];
        $scope.client.countChildren = function(ind, age, len) {
            var sum = 0;
            var str = "";
            str = (age == 1) ? " год" : ((age > 1 && age < 5) ? " года" : " лет");
            $scope.client.childrenList[ind] = +ind + 1 + " ребенок - возраст " + age + str;
            for (var i = 0; i < len; i++) {
                if ($scope.client.childrenList[i]) {
                    sum++;
                }
            }
            $scope.page.childrenListFlag = (sum == len) ? true : false;
        };

        $scope.page.toSelectCountries = function() {
            $scope.page.earlyCountries.length = 0;
            for (var i = 0; i < $scope.client.selectCountries.length; i++) {
                $scope.page.earlyCountries.push($scope.client.selectCountries[i].name);
            }
            $scope.client.countryVisitedEarly = $scope.page.earlyCountries.join(', ');
        };

        $scope.page.changeCountryVisited = function(par) {
            return $scope.page.step2 = par;
        }

        $scope.page.changeAirport = function(par) {
            $scope.page.step4 = par;
        };

        $scope.page.toSelectAirport = function() {
            $scope.page.airports.length = 0;
            for (var i = 0; i < $scope.page.selectAirport.length; i++) {
                $scope.page.airports.push($scope.page.selectAirport[i]);
            }
            $scope.client.favoriteAirports = $scope.page.airports.join(', ');
        };

        $scope.client.countryRegions = [];
        $scope.page.toSelectRegion = function() {
            $scope.client.countryRegions.length = 0;
            for (var i = 0; i < $scope.client.selectRegion.length; i++) {
                $scope.client.countryRegions.push($scope.client.selectRegion[i]);
            }
            $scope.client.favoriteRegion = $scope.client.countryRegions.join(', ');
        };

        $scope.client.changeRegion = function(par) {
            $scope.page.step5 = par;
        };

        $scope.client.hotelStars = [];
        $scope.client.hotelTypes = [];
        $scope.page.toStar = function(par, result) {
            $scope.page.step6 = true;
            var str = par;
            str = str.split('-');
            (+str[1]) ? result.push(str[0]) : result.splice(result.indexOf(str[0]), 1);
        };

        $scope.client.selectMotiv = function(par1, par2) {
            var tmp = new Date().getHours() + 2;
            var morning = 'завтра утром (мы работаем с 10 часов)';
            var today = 'сегодня, к обеду (в районе' + (+tmp + 1) + 'часов)';
            var evening = 'сегодня, после обеда (мы работаем до 18 часов, но можем немного задержаться)';
            $scope.client.time = (tmp >= 18) ? morning : (tmp < 14) ? today : evening;
            $scope.client.restMotivation = par1 ? par1 : 'что-то другое';
            $scope.page.step15 = par2;
        }

        $scope.page.goTable = function() {
            $scope.client.endTalk = new Date();
            $scope.setTalkDuration();
            $http.post("/api/tourist", $scope.client) //добавляем туриста в БД
            .then(function(response) {
                $scope.current.tourist_id = response.data._id;
                bpCurrent.setCurrent($scope.current);
                $location.path("/table");
            }, function(data, status, headers, config) {
                $log.log(data);
                $log.log(status);
                $log.log(headers);
                $log.log(config);
            });
        };

        $scope.page.listOfTourists = function() {
            $location.path("/list");

        };

        $scope.setTalkDuration = function() {
            return $scope.client.talkDuration = +($scope.client.endTalk - $scope.client.startTalk);
        };

        $scope.client.endTalkRequirements = function() {
            $scope.client.endRequirements = new Date();
            $scope.page.step1 = true; //открытие первой части страницы
            return $scope.client.requirements = +($scope.client.endRequirements - $scope.client.startTalk);
        };

    }
})();