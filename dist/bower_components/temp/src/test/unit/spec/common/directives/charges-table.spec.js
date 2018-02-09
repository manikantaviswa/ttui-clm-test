'use strict';

describe('Directive: "charges-table" ', function() {
	var $compile, $rootScope, $scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.ChargesTable');

		angular.mock.inject(function(_$compile_, _$rootScope_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
		});
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<charges-table></charges-table>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toEqual('wizard');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile(
			'<charges-table></charges-table>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html.find('table').length).toEqual(1);
	});

	it('Should test if currency symbol has been prepended', function() {
		// given
		$scope.fakePayments = {
			'payment': {
				'currency': 'EUR',
				'charges': [
					{
						'chargeMaster': {
							'code': 'Rental'
						},
						'chargeType': {
							'code': 'Fixed'
						},
						'refundable': false,
						'commercialArticle': {
							'code': 'd1e603c3-63a8-40e4-a24b-da82576c6641',
							'name': 'LTE-Data'
						},
						'taxPolicy': {
							'code': '9788f710-69dd-4224-b754-744e2e117486',
							'name': 'VAT 14%'
						},
						'chargeAmount': 80,
						'taxable': true,
						'invalid': true,
						'taxAmount': 11.2,
						'type': 'rental',
						'taxRate': 11.2,
						'isUpfrontCharge': false,
						'isRecurringCharge': true
					}
				],
				'discounts': {},
				'payments': {
					'onetime': [],
					'monthly': [
						{
							'commercialArticle': 'd1e603c3-63a8-40e4-a24b-da82576c6641',
							'chargeType': 'Rental',
							'amount': 80,
							'discountPercentage': 0,
							'discountedAmount': 80,
							'taxRate': 11.2,
							'tax': 11.2,
							'netAmount': 91.2
						}
					],
					'upfront': [],
					'billing': [
						{
							'commercialArticle': 'd1e603c3-63a8-40e4-a24b-da82576c6641',
							'chargeType': 'Rental',
							'amount': 80,
							'discountPercentage': 0,
							'discountedAmount': 80,
							'taxRate': 11.2,
							'tax': 11.2,
							'netAmount': 91.2
						}
					]
				},
				'totals': {
					'onetime': {
						'amount': 0,
						'discountedAmount': 0,
						'tax': 0,
						'netAmount': 0
					},
					'monthly': {
						'amount': 80,
						'discountedAmount': 80,
						'tax': 11.2,
						'netAmount': 91.2
					},
					'upfront': {
						'amount': 0,
						'discountedAmount': 0,
						'tax': 0,
						'netAmount': 0
					},
					'billing': {
						'amount': 80,
						'discountedAmount': 80,
						'tax': 11.2,
						'netAmount': 91.2
					},
					'listPrice': 0
				}
			}
		};

		$scope.fakePayments.getMonthlyPayments = function() {
			return this.payment.payments.monthly;
		};
		$scope.fakePayments.getOneTimePayments = function() {
			return this.payment.payments.onetime;
		};
		$scope.fakePayments.getTotalNetMonthly = function() {
			return this.payment.totals.monthly.netAmount;
		};
		$scope.fakePayments.getTotalNetOnetime = function() {
			return this.payment.totals.onetime.netAmount;
		};

		var html = $compile(
			'<charges-table payments="fakePayments"></charges-table>'
		)($scope);

		// when
		$scope.$digest();

		// then
		var result = html[0].getElementsByClassName('format-price');
		var resultLength = result.length;

		for ( var i = 0; i < resultLength; i++ ) {
			if (result[i].innerText) {
				expect(result[i].innerText.indexOf('€')).not.toEqual(-1);
			}
		}

	});

});
