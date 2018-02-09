'use strict';

var module = angular.module('TT-UI.Common.Services.FieldMapping', []);

function FieldMapping($log, $parse) {
	var findNextArray = function(path) {
		if (path) {
			var index = path.indexOf('[]');

			if (index >= 0) {
				return {
					arrayPath: path.substring(0, index),
					remainingPath: path.substring(index + 2)
				};
			}
		}
	};

	var hasArray = function(path) {
		return !!findNextArray(path);
	};

	var fieldExists = function(model, path) {
		return !angular.isUndefined($parse(path)(model));
	};

	var makeArrayPath = function(variablePath, index) {
		return variablePath + '[' + index + ']';
	};

	var extract = function(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) {
		includeEmpty = !!includeEmpty;

		var extractArrayPaths = function(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) {
			var paths = [];
			var arrayIndex;

			var src = findNextArray(sourcePath);
			var dst = findNextArray(targetPath);

			if (dst) {
				var array = $parse(sourcePathPrefix + src.arrayPath)(model);
				if (array) {
					for (arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
						var srcArrayPath = sourcePathPrefix + makeArrayPath(src.arrayPath, arrayIndex);
						var dstArrayPath = targetPathPrefix + makeArrayPath(dst.arrayPath, arrayIndex);
						var subPaths = [];

						if (fieldExists(model, srcArrayPath)) {
							subPaths = extract(model, src.remainingPath, srcArrayPath, dst.remainingPath, dstArrayPath, includeEmpty);
						}

						paths = paths.concat(subPaths);
					}
				}
			} else {
				$log.error('Unsupported array mapping', [].slice.call(arguments));
			}
			return paths;
		};

		var extractSinglePropertyPath = function(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) {
			var paths = [];
			var sourceFullPath = sourcePathPrefix + sourcePath;
			var targetFullPath = targetPathPrefix + targetPath;

			if (includeEmpty || fieldExists(model, sourceFullPath)) {
				paths.push({
					sourcePath: sourceFullPath,
					targetPath: targetFullPath
				});
			} else {
				$log.debug('Problems with mapping, possible missing value', [].slice.call(arguments));
			}

			return paths;
		};

		return hasArray(sourcePath) ?
			extractArrayPaths(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) :
			extractSinglePropertyPath(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty);
	};

	return {
		extractFields: function(model, sourcePath, targetPath, includeEmpty) {
			return extract(model, sourcePath, '', targetPath, '', includeEmpty);
		}
	};
}
FieldMapping.$inject = ['$log', '$parse'];

module.factory(FieldMapping.name, FieldMapping);
