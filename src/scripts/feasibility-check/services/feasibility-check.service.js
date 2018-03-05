'use strict';

var module = angular.module('TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckService', []);

function FeasibilityCheckService($parse) {
    return {
        getLocalities: getLocalities,
        getSubLocalities: getSubLocalities,
        getStreets: getStreets,
        getValidators: getValidators
    };

    function getLocalities(masterData) {
        var localities;
        var localitiesList = $parse('localities.locality')(masterData);
        if (localitiesList && localitiesList.length) {
            var localitiesObj = {};
            var countries = $parse('countries.country')(masterData);
            if (countries && countries.length) {
                countries.forEach(function(c) {
                    var provinces = $parse('provinces.province')(c);
                    if(provinces && provinces.length) {
                        provinces.forEach(function(p) {
                            var cities = $parse('cities.city')(p);
                            if(cities && cities.length) {
                                cities.forEach(function(city) {
                                    city.countryCode = c.code;
                                    city.provinceCode = p.code;
                                    localitiesObj[city.code] = city;
                                });
                            }
                        });
                    }
                });
            }
            localities = localitiesList.map(function(loc) {
                return angular.merge({}, loc, localitiesObj[loc.code]);
            });
            localities.splice(0, 0, {
                name: 'Choose Locality',
                code: ''
            });
        }
        return localities;
    }

    function getSubLocalities(localities, locality) {
        var subLocalities = [];
        localities.forEach(function(loc) {
            if (!locality || (loc.code === locality)) {
                var sls = $parse('subLocalities.subLocality')(loc);
                if (sls && sls.length) {
                    sls.forEach(function(sl) {
                        sl.locality = {code: loc.code};
                        subLocalities.push(sl);
                    });
                }
            }
        });
        subLocalities.splice(0, 0, {
            name: 'Choose Sub Locality',
            code: ''
        });
        return subLocalities;
    }

    function getStreets(subLocalities, subLocality) {
        var streets = [];
        subLocalities.forEach(function(sl) {
            if(!subLocality || (subLocality === sl.code)) {
                var sts = $parse('streets.street')(sl);
                if(sts && sts.length) {
                    sts.forEach(function(st) {
                        st.subLocality = {code: sl.code};
                        streets.push(st);
                    });
                }
            }
        });
        streets.splice(0, 0, {
            name: 'Choose Street',
            code: ''
        });
        return streets;
    }

    function getValidators(config) {
        return {
            locality: {
                required: true
            },
            subLocality: {
                required: true
            },
            street: {
                required: true
            },
            serviceNumber: {
                required: true,
                minLength: 7,
                maxLength: 15
            }
        };
    }

}
FeasibilityCheckService.$inject = ['$parse'];
module.service(FeasibilityCheckService.name, FeasibilityCheckService);
