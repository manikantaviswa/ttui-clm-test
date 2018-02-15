'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [
    'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService'
])

function SelectPlanOfferingCtrl($scope, $parse, selectPlanOfferingService) {
    $scope.offeringData = [];
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectAllowance = "";

    this.setInitialState = function () {
        this.getOfferings();
    }

    this.getOfferings = function () {
        this.setSelectOfferings();
       // this.setAllowanceDescription();
    }

    this.setSelectOfferings = function () {
		
		var offering = $parse('masterData.response.body')($scope);
		var items = [
			{
			  summary:"My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.",
			  title:"inclusionsAllowance",			  
			  inclusionsAllowance: [				
				{  
					code: 1212331,
					item1: 'Item 1 product name',
					item2: 'Item 2 product name'
				},
				{
					code: 122212331,
					item1: 'Item 3 product name',
					item2: 'Item 4 product name'
				}
			],
		},
		{
			summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
			title:"equipments",			  
			equipments: [				
			  {  
				  code: 1212331,
				  item1: 'Item 1 product name',
				  item2: 'Item 2 product name'
			  },
			  {
				  code: 122212331,
				  item1: 'Item 3 product name',
				  item2: 'Item 4 product name'
			  }
		  ],
	  },
	  {
		summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
		title:"charges",			  
		inclusionsAllowance: [				
		  {  
			  code: 1212331,
			  item1: 'Item 1 product name',
			  item2: 'Item 2 product name'
		  },
		  {
			  code: 122212331,
			  item1: 'Item 3 product name',
			  item2: 'Item 4 product name'
		  }
	  ],
  },
  {
	summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
	title:"contracts Penalty",			  
	inclusionsAllowance: [				
	  {  
		  code: 1212331,
		  item1: 'Item 1 product name',
		  item2: 'Item 2 product name'
	  },
	  {
		  code: 122212331,
		  item1: 'Item 3 product name',
		  item2: 'Item 4 product name'
	  }
  ],
},
{
	summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
	title:"EMI Plans",			  
	inclusionsAllowance: [				
	  {  
		  code: 1212331,
		  item1: 'Item 1 product name',
		  item2: 'Item 2 product name'
	  },
	  {
		  code: 122212331,
		  item1: 'Item 3 product name',
		  item2: 'Item 4 product name'
	  }
  ],
}	
		];

        $scope.offeringData = offering.map(function (offering) {
            return angular.extend({}, {
				selected: false,
				details:items,
                allowanceDescription: offering.offering.allowances.allowance[0].dedicatedAccounts.dedicatedAccount[0].description
				
            }, offering);
		});
		debugger;
    }
    this.setAllowanceDescription = function () {
        var offering = $parse('masterData.response.body')($scope);

        $scope.offeringData = offering.map(function (offer) {
            return angular.extend({}, {
            }, offer);
        });

    }

    $scope.getSelectedVariant = function (selectedOffer) {
        //setSelectedVariantAllowance(offer);
        // var allowance = $parse('allowances.allowance')(offer);
        var selectedVariant = $scope.selectedVariant.code;
        var offeringData = $scope.offeringData;
        $scope.offeringData.map(function (offer) {
            if (selectedOffer.code === offer.offering.code) {
                var allowance = $parse('allowances.allowance')(offer.offering)
                allowance.find(function (obj) {
                    obj.product.code === selectedVariant ? offer.allowanceDescription = obj.dedicatedAccounts.dedicatedAccount[0].description : "";
                });
            }

        });


        // var updateAllowance = allowance.find(function (obj) {
        //     obj.product.code === selectedVariant ? obj.allowanceDescription = obj.dedicatedAccounts.dedicatedAccount[0].description : "";
        // });

    }
    this.setSelectedVariantAllowance = function (offer) {
        debugger
        var allowance = $parse('allowances.allowance')(offer);
        var selectedVariant = $scope.selectedVariant.code;
        $scope.offeringData = allowance.find(function (obj) {
            obj.product.code === selectedVariant ? obj.allowanceDescription = obj.dedicatedAccounts.dedicatedAccount[0].description : "";
        });
        $parse('allowances.allowance').assign(offer);
    }
	this.setInitialState();
	
 $scope.getOfferingDetailsView=function(){
	debugger;
	  $scope.tab =[]
	  $scope.offeringData.map(function(offerDetails,$index){
	   debugger;
	   var summary = $parse('summary')(offerDetails.details[$index]);
	   var title =   $parse('title')(offerDetails.details[$index]);
	   var inclusionsAllowance = $parse('inclusionsAllowance')(offerDetails.details[$index].inclusionsAllowance);

		$scope.tab.push({
			summary:summary,
			title:title,			  
			tabsContent: [inclusionsAllowance]
		});
		
	  })

	   

	 
	 $scope.expand = "test";
   console.log($scope.expand);



 }

}

SelectPlanOfferingCtrl.$inject = [
    '$scope',
    '$parse',
    'SelectPlanOfferingService'
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)