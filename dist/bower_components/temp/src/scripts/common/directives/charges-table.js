'use strict';

angular.module('TT-UI.Common.Directives.ChargesTable', [
	'smart-table'
])
.directive('chargesTable', ['$translate', '$filter', 'translateFilter', function($translate, $filter, translateFilter) {
	var template =
		'<div>' +
			'<table class="table table-data-ttui">' +
				'<thead>' +
					'<tr>' +
						'<th translate="Description">Description</th>' +
						'<th translate="Type">Type</th>' +
						'<th translate="Periodicity">Periodicity</th>' +
						'<th translate="Tax">Tax</th>' +
						'<th translate="Amount">Amount</th>' +
						'<th translate="Net Amount">Net Amount</th>' +
						'<th translate="Amount">Amount</th>' +
						'<th translate="Net Amount">Net Amount</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +

					'<tr ng-repeat="payment in monthlyPayments">' +
						'<td>{{ payment.commercialArticleName || payment.commercialArticle }}</td>' +
						'<td>{{ payment.chargeType }}</td>' +
						'<td>Monthly</td>' +
						'<td  class="format-price">{{ formatPrice(payment.taxRate, totalCurrencySymbol) }}</td>' +
						'<td  class="format-price">{{ formatPrice(payment.amount, totalCurrencySymbol) }}</td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(payment.netAmount, totalCurrencySymbol) }}</strong><br/>' +
							'<small>-{{ payment.discountPercentage*100 | number: 0 }}%</small>' +
						'</td>' +
						'<td>-</td>' +
						'<td>-</td>' +
					'</tr>' +
					'<tr ng-repeat="payment in oneTimePayments">' +
						'<td>{{ payment.commercialArticleName || payment.commercialArticle }}</td>' +
						'<td>{{ payment.chargeType }}</td>' +
						'<td>One Time</td>' +
						'<td  class="format-price">{{ formatPrice(payment.taxRate, totalCurrencySymbol) }}</td>' +
						'<td>-</td>' +
						'<td>-</td>' +
						'<td  class="format-price">{{ formatPrice(payment.amount, totalCurrencySymbol) }}</td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(payment.netAmount, totalCurrencySymbol) }}</strong><br/>' +
							'<small>-{{ payment.discountPercentage*100 | number: 0 }}%</small>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td></td>' +
						'<td></td>' +
						'<td></td>' +
						'<td>' +
							'<strong translate="TOTAL inc. TAX">TOTAL inc. TAX</strong><br>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(totalNetMounthly, totalCurrencySymbol) }}</strong><br>' +
							'<small translate="Monthly Charge">Monthly Charge</small>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(totalNetOnetime, totalCurrencySymbol) }}</strong><br>' +
							'<small translate="Pay Upfront">Pay Upfront</small>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>' +
		'</div>';

	function agregatePayments(scope){

		var __ = translateFilter;
		var payments = angular.copy(scope.payments);
		var totalNetMonthly = 0;
		var totalNetOnetime = 0;
		var totalCurrencySymbol;

		if (!angular.isArray(payments)){ // if this is not an array of payments
			payments = [payments];
		}

		scope.monthlyPayments = [];
		scope.oneTimePayments = [];
		scope.formatPrice = formatPrice;

		angular.forEach(payments, function(payment){
			scope.monthlyPayments.push(payment.getMonthlyPayments());
			scope.oneTimePayments.push(payment.getOneTimePayments());
			totalNetMonthly += payment.getTotalNetMonthly();
			totalNetOnetime += payment.getTotalNetOnetime();

			if (payment.payment && payment.payment.currency) {
				totalCurrencySymbol = payment.payment.currency; // currency for the total prices will be the last defined payment's currency
			}
		});

		scope.totalCurrencySymbol = totalCurrencySymbol;
		scope.monthlyPayments = [].concat.apply([], scope.monthlyPayments);
		scope.oneTimePayments = [].concat.apply([], scope.oneTimePayments);
		scope.totalNetMounthly = Math.round(totalNetMonthly * 100) / 100;
		scope.totalNetOnetime = Math.round(totalNetOnetime * 100) / 100;

		angular.forEach(scope.monthlyPayments.concat(scope.oneTimePayments), function(c){
			c.amount = Math.round(c.amount * 100) / 100;
			c.netAmount = Math.round(c.netAmount * 100) / 100;
		});

		function formatPrice(amount, currency) {
			var translationId = 'currencySymbols.';
			var currencySymbol = '';

			if (!amount) {
				return;
			}

			if (!currency) {
				return $filter('currency')(amount);
			}

			translationId += currency;
			currencySymbol = __(translationId);

			return translationId === currencySymbol ? $filter('currency')(amount) : $filter('currency')(amount, currencySymbol);
		}
	}

	return {
		require: '?ngModel',
		restrict: 'E',
		scope: {
			payments: '='
		},
		link: function(scope){
			if (!scope.payments){
				return;
			}

			scope.$watch('payments', function(){
				agregatePayments(scope);
			});
		},
		replace: true,
		template: template
	};
}]);
