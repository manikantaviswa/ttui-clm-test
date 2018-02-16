/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-common.tpl';
}

(function (window, angular, undefined) {
	"use strict";

   angular.module('TT-UI.Common.Tpl', []).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/common/views/angular-strap/alert.tpl.html',
    "<div class=\"alert\" ng-class=\"[type ? 'alert-' + type : null]\"><button type=\"button\" class=\"close\" ng-if=\"dismissable\" ng-click=\"$hide()\">&times;</button><div ng-if=\"content | isArray:false\"><strong ng-bind=\"::title\"></strong>&nbsp;<span ng-bind-html=\"content\"></span></div><div ng-if=\"content | isArray\"><strong ng-bind=\"::title\"></strong><div ng-repeat=\"msg in ::content\" ng-bind-html=\"msg\"></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/bootstrap/accordion/accordion-group.tpl.html',
    "<div class=\"panel panel-ttui accordion-ttui\"><div class=\"panel-heading\"><h3 class=\"panel-title\"><span href class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></span></h3></div><div class=\"panel-collapse\" uib-collapse=\"!isOpen\"><div class=\"panel-body\" ng-transclude></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/bootstrap/accordion/accordion.tpl.html',
    "<div class=\"panel-group panel-group-ttui\" ng-transclude></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/accordion.tpl.html',
    "<h3 class=\"form-section\" ng-if=\"form.title\" translate=\"{{::form.title}}\"></h3><uib-accordion close-others=\"form.closeOther\"><uib-accordion-group ng-repeat=\"item in :: form.items\" is-open=\"status.open\" data-role=\"accordion\" ng-attr-data-section=\"{{::item.id}}\" ng-attr-data-opened=\"{{status.open?1:0}}\"><uib-accordion-heading>{{::item.title}} <span data-role=\"toggle\" class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-up': status.open, 'glyphicon-chevron-down':!status.open}\"></span></uib-accordion-heading><sf-decorator form=\"item\" ng-init=\"item.notitle = true\"></sf-decorator></uib-accordion-group></uib-accordion>"
  );


  $templateCache.put('scripts/common/views/directives/forms/actions-trcl.tpl.html',
    "<div class=\"btn-group\" ng-transclude></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/actions.tpl.html',
    "<div class=\"btn-group\"><input ng-repeat-start=\"item in form.items\" type=\"submit\" class=\"btn {{ item.style || 'btn-primary' }}\" value=\"{{item.title}}\" ng-if=\"item.type === 'submit'\"> <button ng-repeat-end class=\"btn {{ item.style || 'btn-default' }}\" type=\"button\" ng-disabled=\"form.readonly\" ng-if=\"item.type !== 'submit'\" ng-click=\"buttonClick($event,item)\">{{item.title}}</button></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/array.tpl.html',
    "<div sf-array=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\"><div class=\"panel panel-ttui\"><div class=\"panel-heading\"><h3 class=\"panel-title\" ng-if=\"form.title && form.notitle !== true\" translate=\"{{::form.title}}\"></h3></div><div ng-switch on=\"form.schema.format\"><div ng-switch-when=\"table\"><table class=\"table table-data-ttui\" ng-model=\"modelArray\"><thead><tr><th class=\"col-md-2\" ng-repeat=\"item in copyWithIndex($index).items\" ng-class=\"{'has-error': item.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': item.required}\" translate=\"{{::item.title}}\"></th><th ng-if=\"!form.readonly && canDeleteFromArray()\"></th></tr></thead><tbody><tr ng-init=\"arrayIndex = $index\" ng-repeat=\"item in modelArray track by $index\"><td ng-repeat=\"item in copyWithIndex($index).items\"><sf-decorator form=\"item\"></sf-decorator></td><td ng-if=\"form.remove !== false && !form.readonly && canDeleteFromArray()\"><button ng-click=\"deleteFromArray($index)\" style=\"position: relative; z-index: 20\" type=\"button\" class=\"close pull-right\" data-role=\"remove-section\" data-section=\"{{::form.id}}\"><span aria-hidden=\"true\">&times;</span> <span class=\"sr-only\">Close</span></button></td></tr></tbody></table></div><div ng-switch-default><ol class=\"list-group list-group-ttui\" ng-model=\"modelArray\" ui-sortable data-role=\"section\" ng-attr-data-section=\"{{::form.id}}\"><li class=\"list-group-item\" ng-repeat=\"item in modelArray track by $index\" ng-attr-data-section-index=\"{{::$index}}\"><button ng-if=\"form.remove !== false && !form.readonly && canDeleteFromArray()\" ng-click=\"deleteFromArray($index)\" style=\"position: relative; z-index: 20\" type=\"button\" class=\"close pull-right\" data-role=\"remove-section\" data-section=\"{{::form.id}}\"><span aria-hidden=\"true\">&times;</span> <span class=\"sr-only\">Close</span></button><sf-decorator ng-init=\"arrayIndex = $index\" form=\"copyWithIndex($index)\"></sf-decorator></li></ol></div></div></div><div class=\"clearfix\"><button ng-if=\"form.add !== false && !form.readonly && canAppendToArray()\" ng-click=\"appendToArray()\" type=\"button\" class=\"btn btn-link pull-right\" data-role=\"add-section\" data-section=\"{{::form.id}}\"><i class=\"glyphicon glyphicon-plus\"></i> <span translate=\"{{::form.add || 'Add'}}\">Add</span></button></div><div class=\"help-block\" sf-message=\"::form.description\"></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/break.tpl.html',
    "<hr>"
  );


  $templateCache.put('scripts/common/views/directives/forms/checkbox.tpl.html',
    "<div class=\"checkbox\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': hasSuccess()}\"><label><input type=\"checkbox\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\"> <span ng-bind-html=\"form.title\"></span></label><div class=\"help-block\" sf-message=\"::form.description\"></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/checkboxes.tpl.html',
    "<div class=\"form-group\" sf-array=\"form\" schema-name=\"form\" ng-init=\"hasFocus = false\" ng-model=\"$$value$$\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\"><label ng-mousedown=\"$parent.hasFocus = true\"><input type=\"checkbox\" schema-name=\"form\" sf-changed=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" auto-tab-field ng-focus=\"$parent.hasFocus = true\" ng-blur=\"$parent.hasFocus = false\" ng-disabled=\"form.readonly || (form.enabled && !evalExpr(form.enabled,{ model: model, 'arrayIndex': arrayIndex }))\" ng-model=\"titleMapValues[$index]\" ng-model-options=\"form.ngModelOptions\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\"> <span ng-bind-html=\"form.titleMap[$index].name\"></span></label></div><div class=\"help-block\" sf-message=\"::form.description\"></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/columns-inline.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label label-align-top\" ng-class=\"::form.labelHtmlClass\" ng-if=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"row\" ng-init=\"columns = 12; columnsNum = form.columns.length\"><div ng-disabled=\"form.readonly\" ng-repeat=\"column in form.columns\" ng-class=\"column.style || ('col-md-' + (columns / columnsNum))\"><sf-decorator ng-repeat=\"item in column.items\" form=\"item\" class=\"inline-form-groups\" ng-init=\"itemCount = column.items.length\"></sf-decorator></div></div><div class=\"help-block\" sf-message></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/columns.tpl.html',
    "<div class=\"panel panel-ttui\"><div class=\"panel-heading\" ng-if=\"form.title && !form.notitle\"><h3 class=\"panel-title\" translate=\"{{::form.title}}\"></h3></div><div class=\"panel-body forms-ttui row\" ng-init=\"columns = 12; columnsNum = form.columns.length\"><div ng-disabled=\"form.readonly\" ng-repeat=\"column in form.columns\" ng-class=\"column.style || ('col-md-' + (columns / columnsNum))\"><sf-decorator ng-repeat=\"item in column.items\" form=\"item\"></sf-decorator></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/datepicker.tpl.html',
    "<div class=\"form-group has-feedback\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><input type=\"text\" class=\"form-control\" placeholder=\"{{form.description}}\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" auto-tab-field field-validator ng-show=\"form.key\" ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model-options=\"{updateOn: 'default change blur'}\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly || (form.disabled && evalExpr(form.disabled, {model: model, arrayIndex: arrayIndex}))\" ng-attr-autofocus=\"{{::form.focus}}\" ng-attr-tabindex=\"{{::form.tabindex}}\" bs-datepicker ng-attr-data-autoclose=\"1\" ng-attr-data-date-format=\"{{::form.dateFormat}}\" ng-attr-data-min-view=\"{{::form.minView}}\" ng-attr-data-min-date=\"{{form.minDate === 'today' ? 'today' : form.minDate === 'minYearOfBirth' ? 'minYearOfBirth' : evalExpr(form.minDate, {model: model, arrayIndex: arrayIndex})}}\" ng-attr-data-max-date=\"{{::form.maxDate}}\" date-validator is-date-after-validator=\"{{::form.dateShouldBeAfter}}\" date-input-mask date-input-mask-format=\"{{evalExpr(form.dateInputMaskFormat)}}\" auto-format=\"{{::form.format}}\"> <i class=\"form-control-feedback glyphicon glyphicon-calendar\"></i><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/default.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required, 'hidden': form.type === 'hidden'}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\" ng-if=\"form.type !== 'hidden'\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><input type=\"{{::form.type}}\" class=\"form-control\" placeholder=\"{{::form.description | translate}}\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" auto-tab-field field-validator ng-show=\"form.key\" ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly || (form.disabled && evalExpr(form.disabled, {model: model, arrayIndex: arrayIndex}))\" ng-attr-autofocus=\"{{::form.focus}}\" ng-attr-tabindex=\"{{::form.tabindex}}\" ng-attr-maxlength=\"{{::form.maxlength}}\" ng-minlength=\"{{::form.minlength}}\"><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/fieldset-trcl.tpl.html',
    "<fieldset ng-disabled=\"form.readonly\"><legend ng-show=\"form.title\" translate=\"{{::form.title}}\"></legend><div class=\"help-block\" sf-message=\"::form.description\"></div><div ng-transclude></div></fieldset>"
  );


  $templateCache.put('scripts/common/views/directives/forms/fieldset.tpl.html',
    "<fieldset ng-disabled=\"form.readonly\"><legend ng-show=\"form.title\" translate=\"{{::form.title}}\"></legend><div class=\"help-block\" sf-message=\"::form.description\"></div><sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator></fieldset>"
  );


  $templateCache.put('scripts/common/views/directives/forms/help.tpl.html',
    "<div class=\"form-group\"><div class=\"control-label helpvalue\" ng-class=\"::form.labelHtmlClass || 'col-sm-12'\" ng-bind-html=\"form.helpvalue\"></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/multiselect-dropdown.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><multiselect-dropdown-legacy class=\"form-control\" options=\"form.titleMap\" preselected=\"$$value$$\" ng-disabled=\"form.readonly || (form.enabled && !evalExpr(form.enabled,{ model: model, 'arrayIndex': arrayIndex }))\" ng-attr-tabindex=\"{{form.tabindex}}\" ng-model=\"$$value$$\" auto-tab-field schema-validate=\"form\" sf-changed=\"form\" schema-name=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\"></multiselect-dropdown-legacy><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/multiselect.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><select class=\"form-control\" multiple=\"multiple\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" auto-tab-field ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" ng-disabled=\"form.readonly\" ng-options=\"item.value as item.name for item in form.titleMap\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\"></select><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError()))\" ng-bind-html=\"(hasError() && errorMessage(schemaError()))\"></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/radio-buttons.tpl.html',
    "<div class=\"form-group\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': hasSuccess()}\"><div><label class=\"control-label\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label></div><div class=\"btn-group\"><label class=\"btn {{ (item.value === $$value$$) ? form.style.selected || 'btn-primary' : form.style.unselected || 'btn-primary'; }}\" ng-class=\"{ active: item.value === $$value$$ }\" ng-repeat=\"item in form.titleMap\"><input type=\"radio\" sf-changed=\"form\" style=\"display: none\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" ng-value=\"item.value\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"::form.description\"></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/radios-inline.tpl.html',
    "<div schema-validate=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\" ng-show=\"!form.reload || form.titleMap.length > 1\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><div schema-name=\"form\" sf-changed=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" ng-model=\"$$value$$\"><label class=\"radio-inline\" ng-repeat=\"item in form.titleMap\" ng-mousedown=\"$parent.hasFocus = true\"><input type=\"radio\" name=\"radio-inline-{{$parent.$id}}\" ng-model=\"$$value$$\" ng-focus=\"$parent.hasFocus = true\" ng-blur=\"$parent.hasFocus = false\" ng-disabled=\"form.readonly || (form.enabled && !evalExpr(form.enabled,{ model: model, 'arrayIndex': arrayIndex }))\" ng-value=\"item.value\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\"> <span translate=\"{{::item.name}}\"></span></label></div><div class=\"help-block\" sf-message=\"::form.description\"></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/radios.tpl.html',
    "<div schema-validate=\"form\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><div class=\"radio\" ng-repeat=\"item in form.titleMap\"><label ng-mousedown=\"$parent.hasFocus = true\"><input type=\"radio\" schema-name=\"form\" sf-changed=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" ng-focus=\"$parent.hasFocus = true\" ng-blur=\"$parent.hasFocus = false\" ng-disabled=\"form.readonly || (form.enabled && !evalExpr(form.enabled,{ model: model, 'arrayIndex': arrayIndex }))\" ng-model=\"$$value$$\" ng-value=\"item.value\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\"> <span translate=\"{{::item.name}}\"></span></label></div><div class=\"help-block\" sf-message=\"::form.description\"></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/readonly.tpl.html',
    "<div class=\"form-group\"><label ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><input ng-if=\"form.type !== 'textarea'\" type=\"text\" disabled=\"disabled\" class=\"form-control\" value=\"{{$$value$$}}\"><textarea ng-if=\"form.type === 'textarea'\" disabled=\"disabled\" class=\"form-control\">{{$$value$$}}</textarea><div class=\"help-block\" sf-message=\"::form.description\"></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/section.tpl.html',
    "<div ng-if=\"!form.condition || evalExpr(form.condition,{ model: model, 'arrayIndex': arrayIndex })\"><sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/select.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><select class=\"form-control\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" auto-tab-field reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" ng-disabled=\"form.readonly || (form.disabled && evalExpr(form.disabled, {model: model, arrayIndex: arrayIndex}))\" ng-options=\"item.value as item.name for item in form.titleMap | form:this:model:form\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\"><option value=\"\">{{::form.description || 'Select' | translate}}</option></select><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/static.tpl.html',
    "<div class=\"form-group\"><label class=\"control-label\" translate=\"{{::form.title}}\"></label><p class=\"form-control-static\" schema-name=\"form\" ng-model=\"$$value$$\" ng-bind=\"$$value$$\"></p></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/submit.tpl.html',
    "<div ng-if=\"form.hidden\" class=\"hide\"><input type=\"submit\" class=\"btn {{ form.style || 'btn-primary' }}\" translate-attr-value=\"{{::form.title}}\" ng-disabled=\"form.readonly\"></div><div class=\"form-group\" ng-if=\"!form.hidden\"><div class=\"col-sm-9 col-md-offset-3\"><input type=\"submit\" class=\"btn {{ form.style || 'btn-primary' }}\" ng-disabled=\"form.readonly\" ng-if=\"form.type === 'submit'\" translate-attr-value=\"{{::form.title}}\"> <button class=\"btn {{ form.style || 'btn-default' }}\" type=\"button\" ng-click=\"buttonClick($event, form)\" ng-disabled=\"form.readonly\" ng-if=\"form.type !== 'submit'\" translate=\"{{::form.title}}\"></button></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/suggestion-box.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label label-align-top\" ng-class=\"::form.labelHtmlClass\" ng-if=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content suggestion-box {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><input type=\"text\" class=\"form-control\" placeholder=\"{{::form.description | translate}}\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" auto-tab-field field-validator ng-show=\"form.key\" ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model=\"$$value$$\" ng-disabled=\"evalExpr(form.readonly) || (form.disabled && evalExpr(form.disabled, {model: model, arrayIndex: arrayIndex}))\" ng-attr-autofocus=\"{{::form.focus}}\" ng-attr-tabindex=\"{{::form.tabindex}}\" aria-autocomplete=\"list\" aria-expanded=\"true\"><div class=\"suggestion-list\"><div ng-hide=\"evalExpr(form.readonly)\" ng-switch on=\"evalExpr(form.itemsLoading) || false\"><div ng-switch-when=\"true\" class=\"load-indicator\"><span class=\"glyphicon glyphicon-refresh glyphicon-refresh-animate\"></span></div><ul ng-switch-when=\"false\"><li ng-repeat=\"item in evalExpr(form.itemsSource, {})\" ng-click=\"$$value$$ = item[form.itemsSourceField]\"><span class=\"list-group-item-text\">{{::item[form.itemsSourceField] | translate}}</span></li></ul></div><div class=\"suggestion-actions\"><div class=\"btn-group btn-group-justified\" role=\"group\" ng-init=\"buttons = {'Search' : form.searchMore,  'More': form.fetchMore}\" ng-if=\"!evalExpr(form.readonly) && !evalExpr(form.selectAllowed)($$value$$)\"><div class=\"btn-group\" role=\"group\" ng-repeat=\"(label, fn) in buttons\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"evalExpr(fn)(model, $$value$$)\"><span class=\"glyphicon\" ng-class=\"{ 'glyphicon-search': label  === 'Search'}\" aria-hidden=\"true\"></span> {{label | translate}}</button></div></div><button type=\"button\" class=\"btn btn-primary\" ng-if=\"!evalExpr(form.readonly) && evalExpr(form.selectAllowed)($$value$$)\" ng-click=\"evalExpr(form.selectAction)($$value$$)\"><span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span> {{::form.selectText || 'Select' | translate}}</button> <button type=\"button\" class=\"btn btn-default\" ng-if=\"evalExpr(form.readonly)\" ng-click=\"evalExpr(form.changeAction)($$value$$)\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span> {{'Change' | translate}}</button></div></div><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/tabarray.tpl.html',
    "<div sf-array=\"form\" ng-init=\"selected = { tab: 0 }\" class=\"clearfix\"><div ng-if=\"!form.tabType || form.tabType !== 'right'\" ng-class=\"{'col-xs-3': !form.tabType || form.tabType === 'left'}\"><ul class=\"nav nav-tabs\" ng-class=\"{ 'tabs-left': !form.tabType || form.tabType === 'left'}\" style=\"margin-bottom: 15px\"><li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{evalExpr(form.title,{'$index':$index, value: item}) || $index}}</a></li><li ng-hide=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = appendToArray().length - 1)\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || 'Add'}}</a></li></ul></div><div ng-class=\"{'col-xs-9': !form.tabsType || form.tabsType === 'left' || form.tabsType === 'right'}\"><div class=\"tab-content\"><div class=\"tab-pane clearfix\" ng-repeat=\"item in modelArray track by $index\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><sf-decorator form=\"copyWithIndex($index)\"></sf-decorator><button ng-hide=\"form.readonly\" ng-click=\"selected.tab = deleteFromArray($index).length - 1\" type=\"button\" class=\"btn {{ form.style.remove || 'btn-default' }} pull-right\"><i class=\"glyphicon glyphicon-trash\"></i> {{ form.remove || 'Remove'}}</button></div></div></div><div ng-if=\"form.tabType === 'right'\" class=\"col-xs-3\"><ul class=\"nav nav-tabs tabs-right\" style=\"margin-bottom: 15px\"><li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{evalExpr(form.title,{'$index':$index, value: item}) || $index}}</a></li><li ng-hide=\"form.readonly\" ng-click=\"$event.preventDefault() || appendToArray()\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || 'Add'}}</a></li></ul></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/tabs.tpl.html',
    "<div ng-init=\"selected = { tab: 0 }\"><ul class=\"nav nav-tabs\" style=\"margin-bottom: 15px\"><li ng-repeat=\"tab in form.tabs\" ng-disabled=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\" translate=\"{{::tab.title}}\"></a></li></ul><div class=\"tab-content\"><div class=\"tab-pane\" ng-disabled=\"form.readonly\" ng-repeat=\"tab in form.tabs\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><sf-decorator ng-repeat=\"item in tab.items\" form=\"item\"></sf-decorator></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/textarea.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><textarea class=\"form-control\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" reload-options=\"form\" populate-to=\"form\" autopopulate-to=\"form\" auto-tab-field field-validator ng-show=\"form.key\" ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly || (form.disabled && evalExpr(form.disabled, {model: model, arrayIndex: arrayIndex}))\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\" ng-attr-maxlength=\"{{::form.maxlength}}\" ng-minlength=\"{{::form.minlength}}\">\r" +
    "\n" +
    "\t\t</textarea><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/tmp.tpl.html',
    "<div class=\"{{form.style.divClass}}\" style=\"{{form.style.divStyle}}\"><button type=\"button\" class=\"btn {{form.style.buttonClass}}\" style=\"{{form.style.buttonStyle}}\" ng-click=\"buttonClick($event, form); $event.preventDefault();\" translate=\"{{::form.title}}\">{{form.title}}</button></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/typeahead.tpl.html',
    "<div class=\"form-group\" ng-init=\"hasFocus = false\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-focus': hasFocus, 'is-required': form.required}\"><label class=\"control-label\" ng-class=\"::form.labelHtmlClass\" ng-show=\"showTitle()\" translate=\"{{::form.title}}\"></label><div class=\"control-content {{::form.fieldStyle}}\" ng-class=\"{'col-sm-2': form.fieldSize === 'small', 'col-sm-5': form.fieldSize === 'medium'}\"><input type=\"text\" class=\"form-control\" placeholder=\"{{form.description}}\" schema-name=\"form\" sf-changed=\"form\" schema-validate=\"form\" auto-tab-field field-validator ng-show=\"form.key\" ng-focus=\"hasFocus = true\" ng-blur=\"hasFocus = false\" ng-model=\"$$value$$\" ng-model-options=\"{ updateOn: 'default blur'}\" ng-disabled=\"form.readonly || (form.disabled && evalExpr(form.disabled, {model: model, arrayIndex: arrayIndex}))\" ng-attr-autofocus=\"{{form.focus}}\" ng-attr-tabindex=\"{{form.tabindex}}\" typeahead-on-select=\"evalExpr(form.itemSelect)($item, $$value$$, $label, $event, form.key)\" typeahead-editable=\"form.typeaheadEditable\" typeahead-focus-first=\"true\" typeahead-select-on-blur=\"form.typeaheadSelectOnBlur\" typeahead-select-on-exact=\"true\" uib-typeahead=\"item as item[form.itemsSourceField] for item in evalExpr(form.itemsSource, {model: model, arrayIndex: arrayIndex}) | filter:$viewValue | limitTo:form.itemsLimit\"><div class=\"help-block\" sf-message></div></div></div>"
  );


  $templateCache.put('scripts/common/views/directives/forms/validation-status.tpl.html',
    "<validation-status validator=\"{{item.validator}}\"></validation-status>"
  );


  $templateCache.put('scripts/common/views/directives/multiselect-dropdown.tpl.html',
    "<div class=\"btn-group multiselect-dropdown-ttui\" ng-class=\"{looksDisabled: isDisabled}\" data-role=\"multiselect\"><div class=\"dropdown-container\"><div class=\"search-container\"><input tabindex=\"0\" class=\"form-control\" placeholder=\"type in to filter\" ng-model=\"searchText\" ng-focus=\"open = true; clearCurrentSelected();\" ng-model-options=\"{ debounce: { default: 200, blur: 0 }}\"><span class=\"caret-placeholder\" ng-class=\"{dropup: open}\" ng-click=\"toggleDropdown()\"><span class=\"caret\"></span></span></div><div ng-show=\"open\" class=\"dropdown\"><ul ng-mousedown=\"onMenuMouseDown($event)\"><li tabindex=\"-1\" id=\"{{option.value}}\" ng-show=\"open\" ng-repeat=\"option in (filteredOptions = (options | filter:searchText)) track by $index\" ng-click=\"setSelectedItem(option, $event)\" ng-class=\"{selected: keyBoardPointer(option.value)}\" ng-class-even=\"'even'\"><span ng-bind-html=\"highlightMatching(option.name, searchText)\"></span> <input class=\"css-checkbox\" id=\"{{::option.value}}\" type=\"checkbox\" ng-click=\"setSelectedItem(option, $event)\" ng-checked=\"isChecked(option.value)\"><label class=\"pull-right css-label\" for=\"{{::option.value}}\"></label></li></ul><div class=\"panel-footer\"><div class=\"pull-right\"><span ng-if=\"count > 0\">({{count}}/{{options.length}})</span> <span tabindex=\"0\" id=\"select-all\" ng-if=\"filteredOptions.length === options.length\">SELECT ALL</span> <span tabindex=\"0\" id=\"select-all\" ng-if=\"filteredOptions.length < options.length\">SELECT FILTERED</span> <input class=\"css-checkbox\" id=\"select-all-value\" type=\"checkbox\" value=\"select-all\" ng-checked=\"allSelected\" ng-click=\"toggleSelectAll($event)\" ng-disabled=\"isDisabled\"><label class=\"css-label\" for=\"select-all-value\" ng-class=\"{'partially-selected': count > 0 && !allSelected}\"></label></div></div></div></div><div class=\"selected-container\"><span class=\"selected\" ng-repeat=\"selected in selectedOptions | limitTo:limit\" ng-click=\"setSelectedItem(selected, $event)\">{{selected.name}}</span> <span class=\"showAll\" ng-if=\"selectedOptions.length > limitNo && !showAll\" ng-click=\"toggleShowAll()\"><span class=\"glyphicon glyphicon-plus\"></span> All</span> <span class=\"showAll\" ng-if=\"selectedOptions.length > limitNo && showAll\" ng-click=\"toggleShowAll()\"><span class=\"glyphicon glyphicon-minus\"></span> Less</span></div></div>"
  );


  $templateCache.put('scripts/common/views/error.tpl.html',
    "<div class=\"message error\" translate=\"API is not available\">API is not available</div>"
  );


  $templateCache.put('scripts/common/views/modal-dialog.tpl.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\"><div class=\"modal-dialog {{::namespace ? 'modal-' + namespace : ''}}\"><div class=\"modal-content\"><div class=\"modal-header\" ng-show=\"::title\"><button type=\"button\" class=\"close\" ng-click=\"$hide()\">&times;</button><h4 class=\"modal-title\" ng-bind-html=\"::title\"></h4></div><div class=\"modal-body\" ng-show=\"::content\"><div compile-html=\"::content\"></div></div><div class=\"modal-footer\" ng-if=\"::!footer\"><button type=\"button\" class=\"btn btn-default\" ng-repeat=\"button in ::buttons\" ng-click=\"button.action()\" translate=\"{{::button.name}}\"></button></div><div class=\"modal-footer\" ng-if=\"::footer\" compile-html=\"::footer\"></div></div></div></div>"
  );


  $templateCache.put('scripts/common/views/modal-panel-dialog.tpl.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\"><div class=\"modal-dialog {{::namespace ? 'modal-' + namespace : ''}}\"><div class=\"panel panel-default\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" ng-click=\"$hide()\">&times;</button><h4 ng-show=\"::title\" class=\"modal-title\" ng-bind-html=\"::title\"></h4></div><div class=\"panel-body\" ng-show=\"::content\"><div compile-html=\"::content\"></div></div><div class=\"panel-footer text-right\" ng-if=\"::!footer\"><button type=\"button\" class=\"btn btn-default\" ng-repeat=\"button in ::buttons\" ng-click=\"button.action()\" translate=\"{{::button.name}}\"></button></div><div class=\"panel-footer text-right\" ng-if=\"::footer\" compile-html=\"::footer\"></div></div></div></div>"
  );


  $templateCache.put('scripts/common/views/modal.tpl.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\" ng-show=\"title\"><button type=\"button\" class=\"close\" ng-click=\"$hide()\">&times;</button><h4 class=\"modal-title\" ng-bind=\"title\"></h4></div><div class=\"modal-body\" ng-bind=\"content\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"$hide()\" translate=\"Close\">Close</button></div></div></div></div>"
  );

}]);
return angular;
})(window, window.angular);