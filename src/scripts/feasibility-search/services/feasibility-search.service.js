'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services', []);

module.service('feasibilitySearchService', function($log, $parse) {
    return {
        getLocalities: getLocalities,
        getSubLocalities: getSubLocalities,
        getStreets: getStreets
    };

    function getLocalities(masterData) {
        var localities = [];
        var localitiesObj = {};
        var countries = $parse('countries.country')(masterData);
        if(countries && countries.length) {
            countries.forEach(function(c) {
                var provinces = $parse('provinces.province')(c);
                if(provinces && provinces.length) {
                    provinces.forEach(function(p) {
                        var cities = $parse('cities.city')(p);
                        if(cities && cities.length) {
                            cities.forEach(function(city) {
                                localitiesObj[city.code] = city;
                            });
                        }
                    });
                }
            });
        }
        localities = masterData.localities.locality.map(function(loc) {
            return angular.merge({}, loc, localitiesObj[loc.code]); 
        });
        return localities;
    }

    function getSubLocalities(masterData, locality) {
        var subLocalities = [];
        return subLocalities;
    }

    function getStreets(masterData, locality, subLocality) {
        var streets = [];
        return streets;
    }
});
