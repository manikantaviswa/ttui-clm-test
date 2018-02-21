	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.SuggestionBoxPresentationModel', [
        'TT-UI-CLM.Common.Services.OfferingData'
	]);
	function SuggestionBoxPresentationModelFactory($parse, $q, OfferingData) {

		function SuggestionBoxPresentationModel() {
			this.itemsSource = [];
			this.itemsSourceField = 'label';
		}

		SuggestionBoxPresentationModel.prototype = {

			getOfferingDataService: function(offering){
                var offerDataService = new OfferingData(offering);
                return offerDataService;
			},
			selectAction: function(value) {
                /*var offerDataService = this.getOfferingDataService(value.selectedOffering);
                var serviceDetails = {
                    'serviceType': offerDataService.getServiceType(),
                    'subServiceType': offerDataService.getSubServiceType(),
					'numberSelectionMode': $parse('serviceDetails.gsmService.stDirect.MSISDNSelection.masterCode')(value),
					'serviceNumber': $parse('serviceDetails.gsmService.stDirect.MSISDN')(value)
				};*/
				$q.when(this._select(value))
					.then(this._setSelectedItem.bind(this));
			},

			changeAction: function(value) {
				$q.when(this._deselect(value))
					.then(this._setSelectedItem.bind(this, undefined))
					.then(this.fetchMore.bind(this));
			},

			fetchMore: function(model, searchNumber) {
				this._processResponseData(this._load(searchNumber));
			},

			searchMore: function(model, searchNumber) {
                /*var offerDataService = this.getOfferingDataService(model.selectedOffering);

				var serviceData = {
                    'serviceType': offerDataService.getServiceType(),
                    'subServiceType': offerDataService.getSubServiceType(),
                    'technology': offerDataService.getTechnology(),
                    'businessType': offerDataService.getBusinessType(),
                    'activatedVia': $parse('serviceDetails.gsmService.activatedVia.masterCode')(model)
				};
                //console.log("serviceData>>>>>>>>", serviceData)*/
				this._processResponseData(this._search(searchNumber));
			},

			isSelectionAllowed: function() {
				return true;
			},

			isReadonly: function() {
				return false;
			},

			_load: function() {
				return [];
			},

			_search: function() {
				return [];
			},

			_select: function() {
				throw new Error('To be implemented in inheriting function.');
			},

			_deselect: function() {
				throw new Error('To be implemented in inheriting function.');
			},

			_setSelectedItem: function() {

			},

			_processResponseData: function(promise) {
				//console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>",promise)
				this.isLoading = true;
				this.itemsSource = [];

				var saveItemsSource = function(result){
					this.itemsSource = result;
				}.bind(this);

				var restoreIsLoading = function(){
					this.isLoading = false;
				}.bind(this);

				var catchException = function() {
					this.itemsSource = [];
				}.bind(this);

				$q.when(promise)
					.then(saveItemsSource)
					.catch(catchException)
					.finally(restoreIsLoading);
			},

			clearItemSource: function() {
				this.itemsSource = [];
			}
		};

		return SuggestionBoxPresentationModel;
	}

	SuggestionBoxPresentationModelFactory.$inject = ['$parse', '$q', 'OfferingData'];

	module.factory('SuggestionBoxPresentationModel', SuggestionBoxPresentationModelFactory);