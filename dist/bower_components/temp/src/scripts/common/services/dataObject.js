'use strict';

angular.module('TT-UI.Common.Services.DataObject', [])
.factory('DataObject', [function(){

	function DataObject(){}
	DataObject.prototype = {
		setData: function(dataObjectData){
			if (dataObjectData){
				angular.extend(this, dataObjectData);
				this.initDataObject();
			}
		},
		initDataObject: function(){
			// override this for some specific initions
		},
		getName: function(){
			return this.name;
		},
		getCode: function(){
			return this.code;
		},
		getDescription: function(){
			return this.description;
		}
	};

	return DataObject;
}])

.factory('DataObjectCollection', function(){
	function DataObjectCollection(){}

	DataObjectCollection.prototype = {
		setData: function(dataObjectCollectionData){
			if (dataObjectCollectionData){
				angular.extend(this, dataObjectCollectionData);
			}
			this.dataObjects = this.initDataObjects();
		},
		initDataObjects: function(){
			// Override this function in every specific case.
			return []; // should return an array of dataObjects
		},
		getDataObjectByName: function(name){
			return this.getDataObjectBy('name', name);
		},
		getDataObjectByCode: function(code){
			return this.getDataObjectBy('code', code);
		},
		getDataObjectBy: function(fieldName, fieldValue){
			for (var i = 0; i < this.dataObjects.length; i++){
				if (this.dataObjects[i][fieldName] === fieldValue){
					return this.dataObjects[i];
				}
			}
			return null;
		},
		getAllDataObjects: function(){
			return this.dataObjects;
		}
	};

	return DataObjectCollection;
});
