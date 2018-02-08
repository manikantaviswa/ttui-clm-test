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

    function getSubLocalities(localities, locality) {
        var subLocalities = [];
        localities.forEach(function(loc) {
            var sls = $parse('subLocalities.subLocality')(loc);
            if(sls && sls.length) {
                sls.forEach(function(sl) {
                    sl.locality = {code: loc.code};
                    subLocalities.push(sl);
                });
            }
        });
        return subLocalities;
    }

    function getStreets(subLocalities, subLocality) {
        var streets = [];
        subLocalities.forEach(function(sl) {
            var sts = $parse('streets.street')(sl);
            if(sts && sts.length) {
                sts.forEach(function(st) {
                    st.subLocality = {code: sl.code};
                    streets.push(st);
                });
            }
        });
        return streets;
    }
});
