module.exports = function(grunt) {
    'use strict';

    var moduleFilePrefix = 'ttui-clm-';

    var modules = {
        'fxl-select-offering': 'TT-UI-CLM.FxlSelectOffering.Tpl',
        'feasibility-check': 'TT-UI-CLM.FeasibilityCheck.Tpl',
        'select-number': 'TT-UI-CLM.SelectNumber.Tpl',
        'calendar-picker': 'TT-UI-CLM.CalendarPicker.Tpl',
        'appointment-slot-picker': 'TT-UI-CLM.AppointmentSlotPicker.Tpl',
        'select-plan-offering': 'TT-UI-CLM.CommonSelectPlanOffering.Tpl',
        'selected-offer-cart': 'TT-UI-CLM.SelectedOfferCart.Tpl',
        'auto-debit-new': 'TT-UI-CLM.AutoDebitNew.Tpl'
    };

    grunt.initConfig({
        jshint: {
            scripts: {
                src: [
                    'src/scripts/feasibility-check/**/*.js'
                ]
            }
        },

        jscs: {
			options: {
				fix: (grunt.option('fix') ? true : false), // Autofix code style violations when possible.
			},
			scripts: {
                // src: ['app/scripts/feasibility-check/**/*.js']
                src: ['app/scripts/**/*.js']
			},
			unit: {
				src: ['test/unit/**/*.js']
			}
		},

        clean: {
            dist: 'dist',
            server: '.tmp',
            removeNgTemplates: ['src/scripts/**/*.tpl.js']
        },

        copy: {
            dist: {
                expand: true,
                dot: true,
                cwd: 'src',
                dest: 'dist',
                src: [
                    '!bower_components/**/*',
                    'scss/**/*',
                    'scripts/**/*.tpl.js'
                ]
            }
        },

        concat: {
            dist: {
                options: {
                    banner:
                    '/* commonjs package manager support (eg componentjs) */\n' +
                    'if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){\n' +
                    '  module.exports = \'@@@@__SOURCE_FILENAME__\';\n' +
                    '}\n\n' +
                    '(function (window, angular, undefined) {\n' +
                    '  "use strict";\n\n',

                    footer:
                    '\n'+
                    'return angular;\n'+
                    '})(window, window.angular);\n',

                    sourceMap: false, // uglify does this

                    process: function(src, filepath) {
                        return '\n// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },

                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts/',
                        src: [
                            'common/polyfills/Function.name.js',
                            '**/*/index.js',
                            '**/*.js',
                            '!index.js'
                        ],
                        dest: 'dist/scripts/',
                        rename: function(dest, src) {
                            var moduleName = src.split('/')[0];
                            return dest + moduleName + '/' + moduleFilePrefix + moduleName + '.js';
                        }
                    }
                ]
            },

            library: {
                options: {},
                files: [{
                    src: [
                        'src/scripts/**/*',
                    ],
                    dest: 'dist/scripts/' + moduleFilePrefix + 'library.js'
                }]
            }
        },

        uglify: {
            dist: {
                options: {
                    preserveComments: 'some',
                    sourceMap: true,
                    screwIE8: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/scripts/',
                    src: [
                        '**.js'
                    ],
                    dest: 'dist/scripts/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: function(src) {
                        var cwd = grunt.template.process('src/scripts/');
                        var modulePath = src.replace(cwd, '').split('/')[0];
                        return modules[modulePath];
                    },
                    prefix: 'scripts',
                    bootstrap: function(moduleName, script) {

                        var header =
                            '/* commonjs package manager support (eg componentjs) */\n' +
                            'if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){\n' +
                            '  module.exports = \'@@@@__SOURCE_FILENAME__\';\n' +
                            '}\n\n' +
                            '(function (window, angular, undefined) {\n' +
                            '  "use strict";\n\n'+
                            'angular.module(\''+moduleName+'\',[]).run([\'$templateCache\', function($templateCache) {\n';


                        var footer =
                            '}]);\n'+
                            'return angular;\n'+
                            '})(window, window.angular);\n';

                        var cwd = grunt.template.process('');
                        script = script.replace(new RegExp(cwd, 'g'), '');
                        script = script.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                        return grunt.template.process(header) + script + footer;
                    },
                    htmlmin: {
                        collapseBooleanAttributes: false,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false,
                        removeComments: true,
                        removeEmptyAttributes: false,
                        removeRedundantAttributes: false,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts/',
                        src: [
                            '**/*.html'
                        ],
                        dest: 'src/scripts/',
                        rename: function(dest, src) {
                            var moduleName = src.split('/')[0];
                            return dest + moduleName + '/' + moduleFilePrefix + moduleName+'.tpl.js';
                        }
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('build', [
        'clean',
        // 'jshint',
        // 'jscs',
        'concat:dist',
        'ngtemplates',
        'copy:dist',
        // 'concat:library',
        // 'uglify'
        'clean:removeNgTemplates'
    ]);
};