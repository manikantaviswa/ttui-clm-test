define(app, [], function() { return { init:   'use strict';

  $templateCache.put('dist/bower_components/angular-ui-select/docs/index.html',
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\" ng-app=\"ui.select.pages\">\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <title>AngularJS ui-select</title>\n" +
    "\n" +
    "  <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js\"></script>\n" +
    "  <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-sanitize.js\"></script>\n" +
    "\n" +
    "  <script src=\"./assets/app.js\" type=\"text/javascript\"></script>\n" +
    "  <script src=\"./assets/plunkr.js\" type=\"text/javascript\"></script>\n" +
    "\n" +
    "  <!-- themes -->\n" +
    "  <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"./assets/docs.css\" />\n" +
    "\n" +
    "</head>\n" +
    "\n" +
    "<body>\n" +
    "  <header class=\"navbar navbar-default navbar-fixed-top navbar-inner\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-3\" ng-click=\"isCollapsed = !isCollapsed\">\n" +
    "          <span class=\"sr-only\">Toggle navigation</span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <a class=\"navbar-brand visible-xs\" href=\"#\">UI Select</a>\n" +
    "      </div>\n" +
    "      <nav class=\"hidden-xs\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <a href=\"#top\" role=\"button\" class=\"navbar-brand\">\n" +
    "            UI Select\n" +
    "          </a>\n" +
    "          <li><a href=\"#getting_started\">Getting started</a></li>\n" +
    "          <li><a href=\"#documenation\">Documentation</a></li>\n" +
    "          <li><a href=\"#examples\">Examples</a></li>\n" +
    "          <!--<li class=\"dropdown\" uib-dropdown>\n" +
    "              <a role=\"button\" class=\"dropdown-toggle\" uib-dropdown-toggle>\n" +
    "                  Previous docs <b class=\"caret\"></b>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                  <li ng-repeat=\"version in oldDocs\">\n" +
    "                      <a ng-href=\"{{version.url}}\">{{version.version}}</a>\n" +
    "                  </li>\n" +
    "              </ul>\n" +
    "          </li>-->\n" +
    "        </ul>\n" +
    "      </nav>\n" +
    "      <nav class=\"visible-xs\" uib-collapse=\"!isCollapsed\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <li><a href=\"#getting_started\" ng-click=\"isCollapsed = !isCollapsed\">Getting started</a></li>\n" +
    "          <li><a href=\"#directives_small\" ng-click=\"isCollapsed = !isCollapsed\">Directives</a></li>\n" +
    "        </ul>\n" +
    "      </nav>\n" +
    "    </div>\n" +
    "  </header>\n" +
    "  <div class=\"header-placeholder\"></div>\n" +
    "  <div role=\"main\">\n" +
    "    <header class=\"bs-header text-center\" id=\"overview\">\n" +
    "      <div class=\"container\">\n" +
    "\n" +
    "        <h1>UI Select</h1>\n" +
    "        <p>\n" +
    "          A native <a href=\"http://angularjs.org\">AngularJS</a> implementation of Select2/Selectize by the\n" +
    "          <a href=\"http://angular-ui.github.io\">AngularUI Team</a>\n" +
    "        </p>\n" +
    "\n" +
    "        <p>\n" +
    "          <a class=\"btn btn-outline-inverse btn-lg\" href=\"https://github.com/angular-ui/ui-select\"><i class=\"icon-github\"></i>Code on Github</a>\n" +
    "          <!--<button type=\"button\" class=\"btn btn-outline-inverse btn-lg\" ng-click=\"showDownloadModal()\">\n" +
    "              <i class=\"glyphicon glyphicon-download-alt\"></i> Download <small>(<%= pkg.version%>)</small>\n" +
    "          </button>-->\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div class=\"bs-social container\">\n" +
    "        <ul class=\"bs-social-buttons\">\n" +
    "            <li>\n" +
    "                <iframe src=\"//ghbtns.com/github-btn.html?user=angular-ui&repo=ui-select&type=watch&count=true\"\n" +
    "                        allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\"></iframe>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <iframe src=\"//ghbtns.com/github-btn.html?user=angular-ui&repo=ui-select&type=fork&count=true\"\n" +
    "                        allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\"></iframe>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"https://twitter.com/share\" class=\"twitter-share-button\"\n" +
    "                   data-hashtags=\"angularjs\">Tweet</a>\n" +
    "                <script>\n" +
    "                !function (d, s, id) {\n" +
    "                    var js, fjs = d.getElementsByTagName(s)[0];\n" +
    "                    if (!d.getElementById(id)) {\n" +
    "                        js = d.createElement(s);\n" +
    "                        js.id = id;\n" +
    "                        js.src = \"//platform.twitter.com/widgets.js\";\n" +
    "                        fjs.parentNode.insertBefore(js, fjs);\n" +
    "                    }\n" +
    "                }(document, \"script\", \"twitter-wjs\");</script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <!-- Place this tag where you want the +1 button to render. -->\n" +
    "                <div class=\"g-plusone\" data-size=\"medium\"></div>\n" +
    "\n" +
    "                <!-- Place this tag after the last +1 button tag. -->\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    (function () {\n" +
    "                        var po = document.createElement('script');\n" +
    "                        po.type = 'text/javascript';\n" +
    "                        po.async = true;\n" +
    "                        po.src = 'https://apis.google.com/js/plusone.js';\n" +
    "                        var s = document.getElementsByTagName('script')[0];\n" +
    "                        s.parentNode.insertBefore(po, s);\n" +
    "                    })();\n" +
    "                </script>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </header>\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <section id=\"getting_started\">\n" +
    "            <div class=\"page-header\">\n" +
    "              <h1>Getting started</h1>\n" +
    "            </div>\n" +
    "            <h3>Dependencies</h3>\n" +
    "            <p>\n" +
    "              This repository contains a <strong>native AngularJS</strong> select directive based on\n" +
    "              Bootstrap/Select2/Selectize's CSS. As a result no dependency on jQuery or 3rd-Party \n" +
    "              JavaScript is required. The only <strong>required</strong> dependencies are:\n" +
    "            </p>\n" +
    "            <ul>\n" +
    "              <li>\n" +
    "                <a href=\"http://angularjs.org\" target=\"_blank\">AngularJS</a> (requires AngularJS 1.2.x or higher, tested with 1.5.3).\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"http://angularjs.org\" target=\"_blank\">Angular-Sanitize</a> (the version should match your version of angular.js).\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                The matching CSS for your the theme you wish to use:\n" +
    "                <ul>\n" +
    "                  <li>Bootstrap</li>\n" +
    "                  <li>Select2</li>\n" +
    "                  <li>Selectize</li>\n" +
    "                </ul>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <h3>Installation</h3>\n" +
    "            <h4>Install via npm</h4>\n" +
    "            <pre>$ npm install ui-select</pre>\n" +
    "            <h4>Install via bower</h4>\n" +
    "            <pre>$ bower install angular-ui-select</pre>\n" +
    "            <p>\n" +
    "              As soon as you've got all the files downloaded and included in your page you just need to declare\n" +
    "              a dependency on the <code>ui.select</code> <a href=\"http://docs.angularjs.org/guide/module\">module</a>:<br>\n" +
    "              <pre><code>angular.module('myModule', ['ui.select', 'ngSanitize']);</code></pre>\n" +
    "            </p>\n" +
    "\n" +
    "          </section>\n" +
    "          <section id=\"documenation\">\n" +
    "            <div class=\"page-header\">\n" +
    "              <h1>Documentation</h1>\n" +
    "            </div>\n" +
    "            <h3>Wiki</h3>\n" +
    "            For up to date information please refer to the <a href=\"https://github.com/angular-ui/ui-select/wiki\" target=\"_blank\">Wiki</a>\n" +
    "            <h3>FAQ</h3>\n" +
    "            <p>Please check <a href=\"https://github.com/angular-ui/ui-select/wiki/FAQs\" target=\"_blank\">our FAQ section</a> for common problems / solutions.</p>\n" +
    "          </section>\n" +
    "          <section id=\"examples\">\n" +
    "            <div class=\"page-header\">\n" +
    "              <h1>Examples</h1>\n" +
    "            </div>\n" +
    "            <p>You can fork one of the plunkers from this page to see a working example of what is described here.</p>\n" +
    "            \n" +
    "            <!-- INSERT EXAMPLES HERE -->\n" +
    "          </section>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div><!-- /.container -->\n" +
    "  </div><!-- /.main -->\n" +
    "  <footer class=\"footer\">\n" +
    "    <div class=\"container\">\n" +
    "      <p>Designed and built by all ui-select <a href=\"https://github.com/angular-ui/ui-select/graphs/contributors\" target=\"_blank\">contributors</a>.</p>\n" +
    "      <p>Code licensed under <a href=\"https://github.com/angular-ui/ui-select/blob/master/LICENSE\">MIT License</a>.</p>\n" +
    "      <p><a href=\"https://github.com/angular-ui/ui-select/issues?state=open\">Issues</a></p>\n" +
    "    </div>\n" +
    "  </footer>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('dist/bower_components/angular-ui-select/docs/partials/_footer.html',
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('dist/bower_components/angular-ui-select/docs/partials/_header.html',
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\" ng-app=\"demo\">\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <title>AngularJS ui-select</title>\n" +
    "\n" +
    "    <!--\n" +
    "      IE8 support, see AngularJS Internet Explorer Compatibility https://docs.angularjs.org/guide/ie\n" +
    "      For Firefox 3.6, you will also need to include jQuery and ECMAScript 5 shim\n" +
    "    -->\n" +
    "    <!--[if lt IE 9]>\n" +
    "      <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js\"></script>\n" +
    "      <script src=\"https://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js\"></script>\n" +
    "      <script>\n" +
    "        document.createElement('ui-select');\n" +
    "        document.createElement('ui-select-match');\n" +
    "        document.createElement('ui-select-choices');\n" +
    "      </script>\n" +
    "    <![endif]-->\n" +
    "\n" +
    "    <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js\"></script>\n" +
    "    <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-sanitize.js\"></script>\n" +
    "\n" +
    "    <!-- ui-select files -->\n" +
    "    <script src=\"./dist/select.js\"></script>\n" +
    "    <link rel=\"stylesheet\" href=\"./dist/select.css\">\n" +
    "\n" +
    "    <script src=\"./assets/demo.js\"></script>\n" +
    "\n" +
    "    <!-- themes -->\n" +
    "    <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css\">    \n" +
    "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.default.css\">\n" +
    "    <!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.bootstrap2.css\"> -->\n" +
    "    <!--<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.bootstrap3.css\">--> \n" +
    "\n" +
    "    <style>\n" +
    "        body {\n" +
    "            padding: 15px;\n" +
    "        }\n" +
    "\n" +
    "        .select2 > .select2-choice.ui-select-match {\n" +
    "            /* Because of the inclusion of Bootstrap */\n" +
    "            height: 29px;\n" +
    "        }\n" +
    "\n" +
    "        .selectize-control > .selectize-dropdown {\n" +
    "            top: 36px;\n" +
    "        }\n" +
    "        /* Some additional styling to demonstrate that append-to-body helps achieve the proper z-index layering. */\n" +
    "        .select-box {\n" +
    "          background: #fff;\n" +
    "          position: relative;\n" +
    "          z-index: 1;\n" +
    "        }\n" +
    "        .alert-info.positioned {\n" +
    "          margin-top: 1em;\n" +
    "          position: relative;\n" +
    "          z-index: 10000; /* The select2 dropdown has a z-index of 9999 */\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body class=\"ng-cloak\" ng-controller=\"DemoCtrl as ctrl\">\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/node_modules/html-minifier/node_modules/uglify-js/tools/props.html',
    "<html>\n" +
    "  <head>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "    <script>(function(){\n" +
    "      var props = {};\n" +
    "\n" +
    "      function addObject(obj) {\n" +
    "        if (obj == null) return;\n" +
    "        try {\n" +
    "          Object.getOwnPropertyNames(obj).forEach(add);\n" +
    "        } catch(ex) {}\n" +
    "        if (obj.prototype) {\n" +
    "          Object.getOwnPropertyNames(obj.prototype).forEach(add);\n" +
    "        }\n" +
    "        if (typeof obj == \"function\") {\n" +
    "          try {\n" +
    "            Object.getOwnPropertyNames(new obj).forEach(add);\n" +
    "          } catch(ex) {}\n" +
    "        }\n" +
    "      }\n" +
    "\n" +
    "      function add(name) {\n" +
    "        props[name] = true;\n" +
    "      }\n" +
    "\n" +
    "      Object.getOwnPropertyNames(window).forEach(function(thing){\n" +
    "        addObject(window[thing]);\n" +
    "      });\n" +
    "\n" +
    "      try {\n" +
    "        addObject(new Event(\"click\"));\n" +
    "        addObject(new Event(\"contextmenu\"));\n" +
    "        addObject(new Event(\"mouseup\"));\n" +
    "        addObject(new Event(\"mousedown\"));\n" +
    "        addObject(new Event(\"keydown\"));\n" +
    "        addObject(new Event(\"keypress\"));\n" +
    "        addObject(new Event(\"keyup\"));\n" +
    "      } catch(ex) {}\n" +
    "\n" +
    "      var ta = document.createElement(\"textarea\");\n" +
    "      ta.style.width = \"100%\";\n" +
    "      ta.style.height = \"20em\";\n" +
    "      ta.style.boxSizing = \"border-box\";\n" +
    "      <!-- ta.value = Object.keys(props).sort(cmp).map(function(name){ -->\n" +
    "      <!--   return JSON.stringify(name); -->\n" +
    "      <!-- }).join(\",\\n\"); -->\n" +
    "      ta.value = JSON.stringify({\n" +
    "        vars: [],\n" +
    "        props: Object.keys(props).sort(cmp)\n" +
    "      }, null, 2);\n" +
    "      document.body.appendChild(ta);\n" +
    "\n" +
    "      function cmp(a, b) {\n" +
    "        a = a.toLowerCase();\n" +
    "        b = b.toLowerCase();\n" +
    "        return a < b ? -1 : a > b ? 1 : 0;\n" +
    "      }\n" +
    "    })();</script>\n" +
    "  </body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/expected/usemin.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "\n" +
    "    <script src=\"usemin/all.js\"></script>\n" +
    "\n" +
    "    <script src=\"duplicate/usemin/all.js\"></script>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"usemin/bar.css\">\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/expected/useminUgly.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "\n" +
    "    <script src=\"useminUgly/all.js\"></script>\n" +
    "\n" +
    "    <script src=\"duplicate/useminUgly/all.js\"></script>\n" +
    "\n" +
    "    <link rel=\"stylesheet\" href=\"useminUgly/bar.css\">\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/empty.html',
    ""
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/html5.html',
    "<div>\n" +
    "    <span>\n" +
    "        Self-closing, sucka!\n" +
    "        <br>\n" +
    "        <img src='path/to/img'> Howdy\n" +
    "</div>\n" +
    "\n" +
    "<hr>\n" +
    "\n" +
    "<table>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            Howdy\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/linebreak.html',
    "<textarea placeholder=\"This is a carriage return.\r" +
    "\n" +
    "Also also a newline.\"></textarea>"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/one.html',
    "<h1>One</h1>\n" +
    "\n" +
    "<p class=\"\">I am one.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/regexp.html',
    "<h1>Regexp</h1>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  var reg = new RegExp(/^(((\\+[1-9][0-9])|(00[1-9][0-9]))[0-9]{7,11})|((((01|02|03|04|05|07|08)[0-9])|(06[1-9]))[0-9]{7})$/)\n" +
    "  var reg2 = new RegExp(/^\\+-\\\\--\\|)$/)\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/three/three.html',
    "<h2>Three</h2>\n" +
    "\n" +
    "<!-- Comment for three -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are three.</textarea>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/three/three_two.html',
    "<h2>Three Two</h2>\n" +
    "\n" +
    "<!-- Comment for three two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are three two.</textarea>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/two/two.html',
    "<h2>Two</h2>\n" +
    "\n" +
    "<!-- Comment for two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are two.</textarea>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/undefined.html',
    "<h1>Undefined</h1>\n" +
    "\n" +
    "<p class=\"\">I am undefined.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/level2/empty.html',
    ""
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/level2/html5.html',
    "<div>\n" +
    "    <span>\n" +
    "        Self-closing, sucka!\n" +
    "        <br>\n" +
    "        <img src='path/to/img'> Howdy\n" +
    "</div>\n" +
    "\n" +
    "<hr>\n" +
    "\n" +
    "<table>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            Howdy\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/level2/level3/one.html',
    "<h1>One</h1>\n" +
    "\n" +
    "<p class=\"\">I am one.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/undefined.html',
    "<h1>Undefined</h1>\n" +
    "\n" +
    "<p class=\"\">I am undefined.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/unmerged/usemin.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <!-- build:js usemin/foo.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/bar.js -->\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js duplicate/usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:css usemin/bar.css -->\n" +
    "    <script src=\"usemin/bar.css\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/usemin.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <!-- build:js usemin/foo.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/bar.js -->\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js duplicate/usemin/all.js -->\n" +
    "    <script src=\"usemin/foo.js\"></script>\n" +
    "    <script src=\"usemin/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:css usemin/bar.css -->\n" +
    "    <script src=\"usemin/bar.css\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-angular-templates/test/fixtures/useminUgly.html',
    "<!DOCTYPE html>\n" +
    "    <head>\n" +
    "        <link rel=\"stylesheet\" href=\"styles/main.css\">\n" +
    "        <script src=\"scripts/vendor/modernizr.min.js\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "    <!-- build:js useminUgly/foo.js -->\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js useminUgly/bar.js -->\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js useminUgly/all.js -->\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:js duplicate/useminUgly/all.js -->\n" +
    "    <script src=\"useminUgly/foo.js\"></script>\n" +
    "    <script src=\"useminUgly/bar.js\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "\n" +
    "    <!-- build:css useminUgly/bar.css -->\n" +
    "    <script src=\"useminUgly/bar.css\"></script>\n" +
    "    <!-- endbuild -->\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-contrib-jshint/node_modules/jshint/node_modules/console-browserify/node_modules/date-now/test/static/index.html',
    "<!doctype html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title>TAPE Example</title>\n" +
    "    <script src=\"/testem.js\"></script>\n" +
    "    <script src=\"bundle.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-contrib-jshint/node_modules/jshint/node_modules/console-browserify/test/static/index.html',
    "<!doctype html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <meta http-equiv=\"x-ua-compatible\" content=\"IE=8\" >\n" +
    "    <title>TAPE Example</title>\n" +
    "    <script src=\"/testem.js\"></script>\n" +
    "    <script src=\"test-adapter.js\"></script>\n" +
    "    <script src=\"bundle.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-contrib-jshint/node_modules/jshint/node_modules/htmlparser2/test/Documents/Attributes.html',
    "<!doctype html>\n" +
    "<html>\n" +
    "<head>\n" +
    "	<title>Attributes test</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "	<!-- Normal attributes -->\n" +
    "	<button id=\"test0\" class=\"value0\" title=\"value1\">class=\"value0\" title=\"value1\"</button>\n" +
    "\n" +
    "	<!-- Attributes with no quotes or value -->\n" +
    "	<button id=\"test1\" class=value2 disabled>class=value2 disabled</button>\n" +
    "\n" +
    "	<!-- Attributes with no space between them. No valid, but accepted by the browser -->\n" +
    "	<button id=\"test2\" class=\"value4\"title=\"value5\">class=\"value4\"title=\"value5\"</button>\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('node_modules/grunt-contrib-jshint/node_modules/jshint/node_modules/htmlparser2/test/Documents/Basic.html',
    "<!DOCTYPE html><html><title>The Title</title><body>Hello world</body></html>"
  );


  $templateCache.put('node_modules/grunt-contrib-uglify/node_modules/uglify-js/tools/props.html',
    "<html>\n" +
    "  <head>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "    <script>(function(){\n" +
    "      var props = {};\n" +
    "\n" +
    "      function addObject(obj) {\n" +
    "        if (obj == null) return;\n" +
    "        try {\n" +
    "          Object.getOwnPropertyNames(obj).forEach(add);\n" +
    "        } catch(ex) {}\n" +
    "        if (obj.prototype) {\n" +
    "          Object.getOwnPropertyNames(obj.prototype).forEach(add);\n" +
    "        }\n" +
    "        if (typeof obj == \"function\") {\n" +
    "          try {\n" +
    "            Object.getOwnPropertyNames(new obj).forEach(add);\n" +
    "          } catch(ex) {}\n" +
    "        }\n" +
    "      }\n" +
    "\n" +
    "      function add(name) {\n" +
    "        props[name] = true;\n" +
    "      }\n" +
    "\n" +
    "      Object.getOwnPropertyNames(window).forEach(function(thing){\n" +
    "        addObject(window[thing]);\n" +
    "      });\n" +
    "\n" +
    "      try {\n" +
    "        addObject(new Event(\"click\"));\n" +
    "        addObject(new Event(\"contextmenu\"));\n" +
    "        addObject(new Event(\"mouseup\"));\n" +
    "        addObject(new Event(\"mousedown\"));\n" +
    "        addObject(new Event(\"keydown\"));\n" +
    "        addObject(new Event(\"keypress\"));\n" +
    "        addObject(new Event(\"keyup\"));\n" +
    "      } catch(ex) {}\n" +
    "\n" +
    "      var ta = document.createElement(\"textarea\");\n" +
    "      ta.style.width = \"100%\";\n" +
    "      ta.style.height = \"20em\";\n" +
    "      ta.style.boxSizing = \"border-box\";\n" +
    "      <!-- ta.value = Object.keys(props).sort(cmp).map(function(name){ -->\n" +
    "      <!--   return JSON.stringify(name); -->\n" +
    "      <!-- }).join(\",\\n\"); -->\n" +
    "      ta.value = JSON.stringify({\n" +
    "        vars: [],\n" +
    "        props: Object.keys(props).sort(cmp)\n" +
    "      }, null, 2);\n" +
    "      document.body.appendChild(ta);\n" +
    "\n" +
    "      function cmp(a, b) {\n" +
    "        a = a.toLowerCase();\n" +
    "        b = b.toLowerCase();\n" +
    "        return a < b ? -1 : a > b ? 1 : 0;\n" +
    "      }\n" +
    "    })();</script>\n" +
    "  </body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt-contrib-watch/node_modules/tiny-lr-fork/node_modules/faye-websocket/examples/sse.html',
    "<!doctype html>\n" +
    "<html>\n" +
    "  <head>\n" +
    "    <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\">\n" +
    "    <title>EventSource test</title>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "\n" +
    "    <h1>EventSource test</h1>\n" +
    "    <ul></ul>\n" +
    "\n" +
    "    <script type=\"text/javascript\">\n" +
    "      var logger = document.getElementsByTagName('ul')[0],\n" +
    "          socket = new EventSource('/');\n" +
    "\n" +
    "      var log = function(text) {\n" +
    "        logger.innerHTML += '<li>' + text + '</li>';\n" +
    "      };\n" +
    "\n" +
    "      socket.onopen = function() {\n" +
    "        log('OPEN');\n" +
    "      };\n" +
    "\n" +
    "      socket.onmessage = function(event) {\n" +
    "        log('MESSAGE: ' + event.data);\n" +
    "      };\n" +
    "\n" +
    "      socket.addEventListener('update', function(event) {\n" +
    "        log('UPDATE(' + event.lastEventId + '): ' + event.data);\n" +
    "      });\n" +
    "\n" +
    "      socket.onerror = function(event) {\n" +
    "        log('ERROR: ' + event.message);\n" +
    "      };\n" +
    "    </script>\n" +
    "\n" +
    "  </body>\n" +
    "</html>\n" +
    "\n"
  );


  $templateCache.put('node_modules/grunt-contrib-watch/node_modules/tiny-lr-fork/node_modules/faye-websocket/examples/ws.html',
    "<!doctype html>\n" +
    "<html>\n" +
    "  <head>\n" +
    "    <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\">\n" +
    "    <title>WebSocket test</title>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "\n" +
    "    <h1>WebSocket test</h1>\n" +
    "    <ul></ul>\n" +
    "\n" +
    "    <script type=\"text/javascript\">\n" +
    "      var logger = document.getElementsByTagName('ul')[0],\n" +
    "          Socket = window.MozWebSocket || window.WebSocket,\n" +
    "          protos = ['foo', 'bar', 'xmpp'],\n" +
    "          socket = new Socket('ws://' + location.hostname + ':' + location.port + '/', protos),\n" +
    "          index  = 0;\n" +
    "\n" +
    "      var log = function(text) {\n" +
    "        logger.innerHTML += '<li>' + text + '</li>';\n" +
    "      };\n" +
    "\n" +
    "      socket.addEventListener('open', function() {\n" +
    "        log('OPEN: ' + socket.protocol);\n" +
    "        socket.send('Hello, world');\n" +
    "      });\n" +
    "\n" +
    "      socket.onerror = function(event) {\n" +
    "        log('ERROR: ' + event.message);\n" +
    "      };\n" +
    "\n" +
    "      socket.onmessage = function(event) {\n" +
    "        log('MESSAGE: ' + event.data);\n" +
    "        setTimeout(function() { socket.send(++index + ' ' + event.data) }, 2000);\n" +
    "      };\n" +
    "\n" +
    "      socket.onclose = function(event) {\n" +
    "        log('CLOSE: ' + event.code + ', ' + event.reason);\n" +
    "      };\n" +
    "    </script>\n" +
    "\n" +
    "  </body>\n" +
    "</html>\n" +
    "\n"
  );


  $templateCache.put('node_modules/grunt-contrib-watch/node_modules/tiny-lr-fork/node_modules/qs/test/browser/index.html',
    "<html>\n" +
    "  <head>\n" +
    "    <title>Mocha</title>\n" +
    "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n" +
    "    <link rel=\"stylesheet\" href=\"mocha.css\" />\n" +
    "    <script src=\"jquery.js\" type=\"text/javascript\"></script>\n" +
    "    <script src=\"expect.js\"></script>\n" +
    "    <script src=\"mocha.js\"></script>\n" +
    "    <script>mocha.setup('bdd')</script>\n" +
    "    <script src=\"qs.js\"></script>\n" +
    "    <script src=\"../parse.js\"></script>\n" +
    "    <script src=\"../stringify.js\"></script>\n" +
    "    <script>onload = mocha.run;</script>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "    <div id=\"mocha\"></div>\n" +
    "  </body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/colors/example.html',
    "<!DOCTYPE HTML>\n" +
    "<html lang=\"en-us\">\n" +
    "  <head>\n" +
    "    <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\">\n" +
    "    <title>Colors Example</title>\n" +
    "    <script src=\"colors.js\"></script>\n" +
    "  </head>\n" +
    "  <body>\n" +
    "    <script>\n" +
    "\n" +
    "    var test = colors.red(\"hopefully colorless output\");\n" +
    "\n" +
    "    document.write('Rainbows are fun!'.rainbow + '<br/>');\n" +
    "    document.write('So '.italic + 'are'.underline + ' styles! '.bold + 'inverse'.inverse); // styles not widely supported\n" +
    "    document.write('Chains are also cool.'.bold.italic.underline.red); // styles not widely supported\n" +
    "    //document.write('zalgo time!'.zalgo);\n" +
    "    document.write(test.stripColors);\n" +
    "    document.write(\"a\".grey + \" b\".black);\n" +
    "\n" +
    "    document.write(\"Zebras are so fun!\".zebra);\n" +
    "\n" +
    "    document.write(colors.rainbow('Rainbows are fun!'));\n" +
    "    document.write(\"This is \" + \"not\".strikethrough + \" fun.\");\n" +
    "\n" +
    "    document.write(colors.italic('So ') + colors.underline('are') + colors.bold(' styles! ') + colors.inverse('inverse')); // styles not widely supported\n" +
    "    document.write(colors.bold(colors.italic(colors.underline(colors.red('Chains are also cool.'))))); // styles not widely supported\n" +
    "    //document.write(colors.zalgo('zalgo time!'));\n" +
    "    document.write(colors.stripColors(test));\n" +
    "    document.write(colors.grey(\"a\") + colors.black(\" b\"));\n" +
    "\n" +
    "    colors.addSequencer(\"america\", function(letter, i, exploded) {\n" +
    "      if(letter === \" \") return letter;\n" +
    "      switch(i%3) {\n" +
    "        case 0: return letter.red;\n" +
    "        case 1: return letter.white;\n" +
    "        case 2: return letter.blue;\n" +
    "      }\n" +
    "    });\n" +
    "\n" +
    "    colors.addSequencer(\"random\", (function() {\n" +
    "      var available = ['bold', 'underline', 'italic', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];\n" +
    "\n" +
    "      return function(letter, i, exploded) {\n" +
    "        return letter === \" \" ? letter : letter[available[Math.round(Math.random() * (available.length - 1))]];\n" +
    "      };\n" +
    "    })());\n" +
    "\n" +
    "    document.write(\"AMERICA! F--K YEAH!\".america);\n" +
    "    document.write(\"So apparently I've been to Mars, with all the little green men. But you know, I don't recall.\".random);\n" +
    "\n" +
    "    //\n" +
    "    // Custom themes\n" +
    "    //\n" +
    "\n" +
    "    colors.setTheme({\n" +
    "      silly: 'rainbow',\n" +
    "      input: 'grey',\n" +
    "      verbose: 'cyan',\n" +
    "      prompt: 'grey',\n" +
    "      info: 'green',\n" +
    "      data: 'grey',\n" +
    "      help: 'cyan',\n" +
    "      warn: 'yellow',\n" +
    "      debug: 'blue',\n" +
    "      error: 'red'\n" +
    "    });\n" +
    "\n" +
    "    // outputs red text\n" +
    "    document.write(\"this is an error\".error);\n" +
    "\n" +
    "    // outputs yellow text\n" +
    "    document.write(\"this is a warning\".warn);\n" +
    "\n" +
    "    </script>\n" +
    "  </body>\n" +
    "</html>"
  );


  $templateCache.put('node_modules/grunt/node_modules/grunt-legacy-log/node_modules/underscore.string/test/test.html',
    "<!DOCTYPE HTML>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <title>Underscore.strings Test Suite</title>\n" +
    "  <link rel=\"stylesheet\" href=\"test_underscore/vendor/qunit.css\" type=\"text/css\" media=\"screen\" />\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/jquery.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/qunit.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/jslitmus.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"underscore.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../lib/underscore.string.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"strings.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"speed.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <h1 id=\"qunit-header\">Underscore.string Test Suite</h1>\n" +
    "  <h2 id=\"qunit-banner\"></h2>\n" +
    "  <h2 id=\"qunit-userAgent\"></h2>\n" +
    "  <ol id=\"qunit-tests\"></ol>\n" +
    "  <br />\n" +
    "  <h1 class=\"qunit-header\">Underscore.string Speed Suite</h1>\n" +
    "  <!-- <h2 class=\"qunit-userAgent\">\n" +
    "    A representative sample of the functions are benchmarked here, to provide\n" +
    "    a sense of how fast they might run in different browsers.\n" +
    "    Each iteration runs on an array of 1000 elements.<br /><br />\n" +
    "    For example, the 'intersect' test measures the number of times you can\n" +
    "    find the intersection of two thousand-element arrays in one second.\n" +
    "  </h2> -->\n" +
    "  <br />\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/grunt-legacy-log/node_modules/underscore.string/test/test_standalone.html',
    "<!DOCTYPE HTML>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <title>Underscore.strings Test Suite</title>\n" +
    "  <link rel=\"stylesheet\" href=\"test_underscore/vendor/qunit.css\" type=\"text/css\" media=\"screen\" />\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/jquery.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/qunit.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../lib/underscore.string.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"strings_standalone.js\"></script>\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <h1 id=\"qunit-header\">Underscore.string Test Suite</h1>\n" +
    "  <h2 id=\"qunit-banner\"></h2>\n" +
    "  <h2 id=\"qunit-userAgent\"></h2>\n" +
    "  <ol id=\"qunit-tests\"></ol>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/grunt-legacy-log/node_modules/underscore.string/test/test_underscore/index.html',
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <title>Underscore Test Suite</title>\n" +
    "  <link rel=\"stylesheet\" href=\"vendor/qunit.css\" type=\"text/css\" media=\"screen\">\n" +
    "  <script src=\"vendor/jquery.js\"></script>\n" +
    "  <script src=\"vendor/qunit.js\"></script>\n" +
    "  <script src=\"vendor/jslitmus.js\"></script>\n" +
    "  <script src=\"../underscore.js\"></script>\n" +
    "  <script src=\"../../lib/underscore.string.js\"></script>\n" +
    "\n" +
    "  <script src=\"collections.js\"></script>\n" +
    "  <script src=\"arrays.js\"></script>\n" +
    "  <script src=\"functions.js\"></script>\n" +
    "  <script src=\"objects.js\"></script>\n" +
    "  <script src=\"utility.js\"></script>\n" +
    "  <script src=\"chaining.js\"></script>\n" +
    "  <script src=\"speed.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <div id=\"qunit\"></div>\n" +
    "  <div id=\"qunit-fixture\">\n" +
    "    <div id=\"map-test\">\n" +
    "      <div id=\"id1\"></div>\n" +
    "      <div id=\"id2\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <br>\n" +
    "  <h1 class=\"qunit-header\">Underscore Speed Suite</h1>\n" +
    "  <p>\n" +
    "    A representative sample of the functions are benchmarked here, to provide\n" +
    "    a sense of how fast they might run in different browsers.\n" +
    "    Each iteration runs on an array of 1000 elements.<br /><br />\n" +
    "    For example, the 'intersection' test measures the number of times you can\n" +
    "    find the intersection of two thousand-element arrays in one second.\n" +
    "  </p>\n" +
    "  <br>\n" +
    "  <script type=\"text/html\" id=\"template\">\n" +
    "    <%\n" +
    "    // a comment\n" +
    "    if (data) { data += 12345; }; %>\n" +
    "    <li><%= data %></li>\n" +
    "  </script>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/underscore.string/test/test.html',
    "<!DOCTYPE HTML>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <title>Underscore.strings Test Suite</title>\n" +
    "  <link rel=\"stylesheet\" href=\"test_underscore/vendor/qunit.css\" type=\"text/css\" media=\"screen\" />\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/jquery.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/qunit.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/jslitmus.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"underscore.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../lib/underscore.string.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"strings.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"speed.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <h1 id=\"qunit-header\">Underscore.string Test Suite</h1>\n" +
    "  <h2 id=\"qunit-banner\"></h2>\n" +
    "  <h2 id=\"qunit-userAgent\"></h2>\n" +
    "  <ol id=\"qunit-tests\"></ol>\n" +
    "  <br />\n" +
    "  <h1 class=\"qunit-header\">Underscore.string Speed Suite</h1>\n" +
    "  <!-- <h2 class=\"qunit-userAgent\">\n" +
    "    A representative sample of the functions are benchmarked here, to provide\n" +
    "    a sense of how fast they might run in different browsers.\n" +
    "    Each iteration runs on an array of 1000 elements.<br /><br />\n" +
    "    For example, the 'intersect' test measures the number of times you can\n" +
    "    find the intersection of two thousand-element arrays in one second.\n" +
    "  </h2> -->\n" +
    "  <br />\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/underscore.string/test/test_standalone.html',
    "<!DOCTYPE HTML>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <title>Underscore.strings Test Suite</title>\n" +
    "  <link rel=\"stylesheet\" href=\"test_underscore/vendor/qunit.css\" type=\"text/css\" media=\"screen\" />\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/jquery.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"test_underscore/vendor/qunit.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../lib/underscore.string.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"strings_standalone.js\"></script>\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "  <h1 id=\"qunit-header\">Underscore.string Test Suite</h1>\n" +
    "  <h2 id=\"qunit-banner\"></h2>\n" +
    "  <h2 id=\"qunit-userAgent\"></h2>\n" +
    "  <ol id=\"qunit-tests\"></ol>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/underscore.string/test/test_underscore/temp_tests.html',
    "<!DOCTYPE HTML>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <title>Underscore Temporary Tests</title>\n" +
    "  <link rel=\"stylesheet\" href=\"vendor/qunit.css\" type=\"text/css\" media=\"screen\" />\n" +
    "  <script type=\"text/javascript\" src=\"vendor/jquery.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"vendor/jslitmus.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../underscore.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"temp.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <h1 class=\"qunit-header\">Underscore Temporary Tests</h1>\n" +
    "  <h2 class=\"qunit-userAgent\">\n" +
    "    A page for temporary speed tests, used for developing faster implementations\n" +
    "    of existing Underscore methods.\n" +
    "  </h2>\n" +
    "  <br />\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('node_modules/grunt/node_modules/underscore.string/test/test_underscore/test.html',
    "<!DOCTYPE HTML>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <title>Underscore Test Suite</title>\n" +
    "  <link rel=\"stylesheet\" href=\"vendor/qunit.css\" type=\"text/css\" media=\"screen\" />\n" +
    "  <script type=\"text/javascript\" src=\"vendor/jquery.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"vendor/qunit.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"vendor/jslitmus.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../underscore.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"../../lib/underscore.string.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"collections.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"arrays.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"functions.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"objects.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"utility.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"chaining.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"speed.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <div class=\"underscore-test\">\n" +
    "    <h1 id=\"qunit-header\">Underscore Test Suite</h1>\n" +
    "    <h2 id=\"qunit-banner\"></h2>\n" +
    "    <h2 id=\"qunit-userAgent\"></h2>\n" +
    "    <ol id=\"qunit-tests\"></ol>\n" +
    "    <br />\n" +
    "    <h1 class=\"qunit-header\">Underscore Speed Suite</h1>\n" +
    "    <p>\n" +
    "      A representative sample of the functions are benchmarked here, to provide\n" +
    "      a sense of how fast they might run in different browsers.\n" +
    "      Each iteration runs on an array of 1000 elements.<br /><br />\n" +
    "      For example, the 'intersect' test measures the number of times you can\n" +
    "      find the intersection of two thousand-element arrays in one second.\n" +
    "    </p>\n" +
    "    <br />\n" +
    "\n" +
    "    <script type=\"text/html\" id=\"template\">\n" +
    "      <%\n" +
    "      if (data) { data += 12345; }; %>\n" +
    "      <li><%= data %></li>\n" +
    "    </script>\n" +
    "  </div>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('src/bower_components/angular-ui-select/docs/index.html',
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\" ng-app=\"ui.select.pages\">\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <title>AngularJS ui-select</title>\n" +
    "\n" +
    "  <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js\"></script>\n" +
    "  <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-sanitize.js\"></script>\n" +
    "\n" +
    "  <script src=\"./assets/app.js\" type=\"text/javascript\"></script>\n" +
    "  <script src=\"./assets/plunkr.js\" type=\"text/javascript\"></script>\n" +
    "\n" +
    "  <!-- themes -->\n" +
    "  <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css\">\n" +
    "  <link rel=\"stylesheet\" href=\"./assets/docs.css\" />\n" +
    "\n" +
    "</head>\n" +
    "\n" +
    "<body>\n" +
    "  <header class=\"navbar navbar-default navbar-fixed-top navbar-inner\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-3\" ng-click=\"isCollapsed = !isCollapsed\">\n" +
    "          <span class=\"sr-only\">Toggle navigation</span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "          <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <a class=\"navbar-brand visible-xs\" href=\"#\">UI Select</a>\n" +
    "      </div>\n" +
    "      <nav class=\"hidden-xs\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <a href=\"#top\" role=\"button\" class=\"navbar-brand\">\n" +
    "            UI Select\n" +
    "          </a>\n" +
    "          <li><a href=\"#getting_started\">Getting started</a></li>\n" +
    "          <li><a href=\"#documenation\">Documentation</a></li>\n" +
    "          <li><a href=\"#examples\">Examples</a></li>\n" +
    "          <!--<li class=\"dropdown\" uib-dropdown>\n" +
    "              <a role=\"button\" class=\"dropdown-toggle\" uib-dropdown-toggle>\n" +
    "                  Previous docs <b class=\"caret\"></b>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                  <li ng-repeat=\"version in oldDocs\">\n" +
    "                      <a ng-href=\"{{version.url}}\">{{version.version}}</a>\n" +
    "                  </li>\n" +
    "              </ul>\n" +
    "          </li>-->\n" +
    "        </ul>\n" +
    "      </nav>\n" +
    "      <nav class=\"visible-xs\" uib-collapse=\"!isCollapsed\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "          <li><a href=\"#getting_started\" ng-click=\"isCollapsed = !isCollapsed\">Getting started</a></li>\n" +
    "          <li><a href=\"#directives_small\" ng-click=\"isCollapsed = !isCollapsed\">Directives</a></li>\n" +
    "        </ul>\n" +
    "      </nav>\n" +
    "    </div>\n" +
    "  </header>\n" +
    "  <div class=\"header-placeholder\"></div>\n" +
    "  <div role=\"main\">\n" +
    "    <header class=\"bs-header text-center\" id=\"overview\">\n" +
    "      <div class=\"container\">\n" +
    "\n" +
    "        <h1>UI Select</h1>\n" +
    "        <p>\n" +
    "          A native <a href=\"http://angularjs.org\">AngularJS</a> implementation of Select2/Selectize by the\n" +
    "          <a href=\"http://angular-ui.github.io\">AngularUI Team</a>\n" +
    "        </p>\n" +
    "\n" +
    "        <p>\n" +
    "          <a class=\"btn btn-outline-inverse btn-lg\" href=\"https://github.com/angular-ui/ui-select\"><i class=\"icon-github\"></i>Code on Github</a>\n" +
    "          <!--<button type=\"button\" class=\"btn btn-outline-inverse btn-lg\" ng-click=\"showDownloadModal()\">\n" +
    "              <i class=\"glyphicon glyphicon-download-alt\"></i> Download <small>(<%= pkg.version%>)</small>\n" +
    "          </button>-->\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div class=\"bs-social container\">\n" +
    "        <ul class=\"bs-social-buttons\">\n" +
    "            <li>\n" +
    "                <iframe src=\"//ghbtns.com/github-btn.html?user=angular-ui&repo=ui-select&type=watch&count=true\"\n" +
    "                        allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\"></iframe>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <iframe src=\"//ghbtns.com/github-btn.html?user=angular-ui&repo=ui-select&type=fork&count=true\"\n" +
    "                        allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\"></iframe>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"https://twitter.com/share\" class=\"twitter-share-button\"\n" +
    "                   data-hashtags=\"angularjs\">Tweet</a>\n" +
    "                <script>\n" +
    "                !function (d, s, id) {\n" +
    "                    var js, fjs = d.getElementsByTagName(s)[0];\n" +
    "                    if (!d.getElementById(id)) {\n" +
    "                        js = d.createElement(s);\n" +
    "                        js.id = id;\n" +
    "                        js.src = \"//platform.twitter.com/widgets.js\";\n" +
    "                        fjs.parentNode.insertBefore(js, fjs);\n" +
    "                    }\n" +
    "                }(document, \"script\", \"twitter-wjs\");</script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <!-- Place this tag where you want the +1 button to render. -->\n" +
    "                <div class=\"g-plusone\" data-size=\"medium\"></div>\n" +
    "\n" +
    "                <!-- Place this tag after the last +1 button tag. -->\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    (function () {\n" +
    "                        var po = document.createElement('script');\n" +
    "                        po.type = 'text/javascript';\n" +
    "                        po.async = true;\n" +
    "                        po.src = 'https://apis.google.com/js/plusone.js';\n" +
    "                        var s = document.getElementsByTagName('script')[0];\n" +
    "                        s.parentNode.insertBefore(po, s);\n" +
    "                    })();\n" +
    "                </script>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </header>\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <section id=\"getting_started\">\n" +
    "            <div class=\"page-header\">\n" +
    "              <h1>Getting started</h1>\n" +
    "            </div>\n" +
    "            <h3>Dependencies</h3>\n" +
    "            <p>\n" +
    "              This repository contains a <strong>native AngularJS</strong> select directive based on\n" +
    "              Bootstrap/Select2/Selectize's CSS. As a result no dependency on jQuery or 3rd-Party \n" +
    "              JavaScript is required. The only <strong>required</strong> dependencies are:\n" +
    "            </p>\n" +
    "            <ul>\n" +
    "              <li>\n" +
    "                <a href=\"http://angularjs.org\" target=\"_blank\">AngularJS</a> (requires AngularJS 1.2.x or higher, tested with 1.5.3).\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a href=\"http://angularjs.org\" target=\"_blank\">Angular-Sanitize</a> (the version should match your version of angular.js).\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                The matching CSS for your the theme you wish to use:\n" +
    "                <ul>\n" +
    "                  <li>Bootstrap</li>\n" +
    "                  <li>Select2</li>\n" +
    "                  <li>Selectize</li>\n" +
    "                </ul>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <h3>Installation</h3>\n" +
    "            <h4>Install via npm</h4>\n" +
    "            <pre>$ npm install ui-select</pre>\n" +
    "            <h4>Install via bower</h4>\n" +
    "            <pre>$ bower install angular-ui-select</pre>\n" +
    "            <p>\n" +
    "              As soon as you've got all the files downloaded and included in your page you just need to declare\n" +
    "              a dependency on the <code>ui.select</code> <a href=\"http://docs.angularjs.org/guide/module\">module</a>:<br>\n" +
    "              <pre><code>angular.module('myModule', ['ui.select', 'ngSanitize']);</code></pre>\n" +
    "            </p>\n" +
    "\n" +
    "          </section>\n" +
    "          <section id=\"documenation\">\n" +
    "            <div class=\"page-header\">\n" +
    "              <h1>Documentation</h1>\n" +
    "            </div>\n" +
    "            <h3>Wiki</h3>\n" +
    "            For up to date information please refer to the <a href=\"https://github.com/angular-ui/ui-select/wiki\" target=\"_blank\">Wiki</a>\n" +
    "            <h3>FAQ</h3>\n" +
    "            <p>Please check <a href=\"https://github.com/angular-ui/ui-select/wiki/FAQs\" target=\"_blank\">our FAQ section</a> for common problems / solutions.</p>\n" +
    "          </section>\n" +
    "          <section id=\"examples\">\n" +
    "            <div class=\"page-header\">\n" +
    "              <h1>Examples</h1>\n" +
    "            </div>\n" +
    "            <p>You can fork one of the plunkers from this page to see a working example of what is described here.</p>\n" +
    "            \n" +
    "            <!-- INSERT EXAMPLES HERE -->\n" +
    "          </section>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div><!-- /.container -->\n" +
    "  </div><!-- /.main -->\n" +
    "  <footer class=\"footer\">\n" +
    "    <div class=\"container\">\n" +
    "      <p>Designed and built by all ui-select <a href=\"https://github.com/angular-ui/ui-select/graphs/contributors\" target=\"_blank\">contributors</a>.</p>\n" +
    "      <p>Code licensed under <a href=\"https://github.com/angular-ui/ui-select/blob/master/LICENSE\">MIT License</a>.</p>\n" +
    "      <p><a href=\"https://github.com/angular-ui/ui-select/issues?state=open\">Issues</a></p>\n" +
    "    </div>\n" +
    "  </footer>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('src/bower_components/angular-ui-select/docs/partials/_footer.html',
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('src/bower_components/angular-ui-select/docs/partials/_header.html',
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\" ng-app=\"demo\">\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <title>AngularJS ui-select</title>\n" +
    "\n" +
    "    <!--\n" +
    "      IE8 support, see AngularJS Internet Explorer Compatibility https://docs.angularjs.org/guide/ie\n" +
    "      For Firefox 3.6, you will also need to include jQuery and ECMAScript 5 shim\n" +
    "    -->\n" +
    "    <!--[if lt IE 9]>\n" +
    "      <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js\"></script>\n" +
    "      <script src=\"https://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js\"></script>\n" +
    "      <script>\n" +
    "        document.createElement('ui-select');\n" +
    "        document.createElement('ui-select-match');\n" +
    "        document.createElement('ui-select-choices');\n" +
    "      </script>\n" +
    "    <![endif]-->\n" +
    "\n" +
    "    <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js\"></script>\n" +
    "    <script src=\"https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-sanitize.js\"></script>\n" +
    "\n" +
    "    <!-- ui-select files -->\n" +
    "    <script src=\"./dist/select.js\"></script>\n" +
    "    <link rel=\"stylesheet\" href=\"./dist/select.css\">\n" +
    "\n" +
    "    <script src=\"./assets/demo.js\"></script>\n" +
    "\n" +
    "    <!-- themes -->\n" +
    "    <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css\">    \n" +
    "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.default.css\">\n" +
    "    <!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.bootstrap2.css\"> -->\n" +
    "    <!--<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.bootstrap3.css\">--> \n" +
    "\n" +
    "    <style>\n" +
    "        body {\n" +
    "            padding: 15px;\n" +
    "        }\n" +
    "\n" +
    "        .select2 > .select2-choice.ui-select-match {\n" +
    "            /* Because of the inclusion of Bootstrap */\n" +
    "            height: 29px;\n" +
    "        }\n" +
    "\n" +
    "        .selectize-control > .selectize-dropdown {\n" +
    "            top: 36px;\n" +
    "        }\n" +
    "        /* Some additional styling to demonstrate that append-to-body helps achieve the proper z-index layering. */\n" +
    "        .select-box {\n" +
    "          background: #fff;\n" +
    "          position: relative;\n" +
    "          z-index: 1;\n" +
    "        }\n" +
    "        .alert-info.positioned {\n" +
    "          margin-top: 1em;\n" +
    "          position: relative;\n" +
    "          z-index: 10000; /* The select2 dropdown has a z-index of 9999 */\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body class=\"ng-cloak\" ng-controller=\"DemoCtrl as ctrl\">\n"
  );


  $templateCache.put('src/scripts/feasibility-search/views/feasibility-search.html',
    "<div class=\"form-horizontal-ttui panel panel-ttui\" spinner-inside>\n" +
    "    <div class=\"panel-body forms-ttui row\">\n" +
    "        <p class=\"col-sm-12\">\n" +
    "            <strong translate=\"Enter exact address of installation to check feasibility\">Enter exact address of installation to check feasibility</strong>\n" +
    "        </p>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\">\n" +
    "                <label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Locality\">Locality</label>\n" +
    "                <div class=\"control-content col-sm-8\">\n" +
    "                    <ui-select id=\"city\" ng-model=\"model.locality\" theme=\"bootstrap\" append-to-body=\"true\" on-select=\"onSelectLocality($event, $item)\">+\n" +
    "                        <ui-select-match placeholder=\"Select / Search Localities\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"locality in localities | filter: $select.search\">\n" +
    "                            <span ng-bind-html=\"locality.name | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "                    <span class=\"help-block ng-hide\"> This field is required </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\">\n" +
    "                <label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Sub Locality\">Sub Locality</label>\n" +
    "                <div class=\"control-content col-sm-8\">\n" +
    "                    <ui-select id=\"city\" ng-model=\"model.subLocality\" theme=\"bootstrap\" append-to-body=\"true\" on-select=\"onSelectSubLocality($event, $item)\">\n" +
    "                        <ui-select-match placeholder=\"Select / Search Sub Localities\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"sl in subLocalities | filter: $select.search\">\n" +
    "                            <span ng-bind-html=\"sl.name | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "                    <span class=\"help-block ng-hide\"> This field is required </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\">\n" +
    "                <label for=\"street\" class=\"col-sm-4 control-label\" translate=\"Street\">Street</label>\n" +
    "                <div class=\"control-content col-sm-8\">\n" +
    "                    <ui-select id=\"city\" ng-model=\"model.street\" theme=\"bootstrap\" placeholder=\"Choose a street\" append-to-body=\"true\" on-select=\"onSelectStreet($event, $item)\">\n" +
    "                        <ui-select-match placeholder=\"Select / Search Street\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"st in streets | filter: $select.search\">\n" +
    "                            <span ng-bind-html=\"st.name | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "                    <span class=\"help-block ng-hide\"> This field is required </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"street\" class=\"col-sm-4 control-label\"></label>\n" +
    "                <div class=\"control-content col-sm-8\">\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchAddressFeasibility()\">Check Feasibility</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\" ng-if=\"searchResult\">\n" +
    "            <div class=\"feasibility-search-result\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-2\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok-sign\" style=\"font-size: 24px\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-10\">\n" +
    "                        <div>The address &lt; <em>{{searchResult.locality}}, {{searchResult.subLocality}}, {{searchResult.street}} &gt;</em></div>\n" +
    "                        <p><strong>{{searchResult.feasibility || \"--unknown--\"}}</strong></p>\n" +
    "                        <div>MDF: {{searchResult.mdf || \"--unknown--\"}}</div>\n" +
    "                        <div>Cabinet: {{searchResult.cabinet || \"--unknown--\"}}</div>\n" +
    "                        <div>FDP: {{searchResult.fdp || \"--unknown--\"}}</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel panel-ttui\">\n" +
    "    <div class=\"panel-body forms-ttui row\">\n" +
    "        <div class=\"col-sm-6 clearfix\">\n" +
    "            <p class=\"text-center\"><strong>------ Or ------</strong></p>\n" +
    "        </div>\n" +
    "        <p class=\"col-sm-12\">\n" +
    "            <strong translate=\"Enter exact address of installation to check feasibility\">Enter exact address of installation to check feasibility</strong>\n" +
    "        </p>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\">\n" +
    "                <label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Fixed Line Number\">Fixed Line Number</label>\n" +
    "                <div class=\"control-content col-sm-8\">\n" +
    "                    <input type=\"text\" placeholder=\"\" ng-model=\"model.fixedLineNumber\" />\n" +
    "                    <span class=\"help-block ng-hide\">This field is required</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"street\" class=\"col-sm-4 control-label\"></label>\n" +
    "                <div class=\"control-content col-sm-8\">\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"onCheckClick()\">Check Feasibility</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\" ng-if=\"searchResult\">\n" +
    "            <div class=\"feasibility-search-result\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-2\">\n" +
    "                        <span class=\"glyphicon glyphicon-ok-sign\" style=\"font-size: 24px\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-10\">\n" +
    "                        <div>The address &lt; <em>{{searchResult.locality}}, {{searchResult.subLocality}}, {{searchResult.street}} &gt;</em></div>\n" +
    "                        <p><strong>{{searchResult.feasibility || \"--unknown--\"}}</strong></p>\n" +
    "                        <div>MDF: {{searchResult.mdf || \"--unknown--\"}}</div>\n" +
    "                        <div>Cabinet: {{searchResult.cabinet || \"--unknown--\"}}</div>\n" +
    "                        <div>FDP: {{searchResult.fdp || \"--unknown--\"}}</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('src/test.html',
    "<html>\r" +
    "\n" +
    "    <head>\r" +
    "\n" +
    "        <title>Test Dist JS Files</title>\r" +
    "\n" +
    "    </head>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <body ng-app=\"testApp\" ng-controller=\"testCtrl\">\r" +
    "\n" +
    "        <feasibility-search master-data=\"masterData\" config=\"testMsg\" permissions=\"testMsg\" model=\"model\" on-search=\"myFunc($result)\"></feasibility-search>\r" +
    "\n" +
    "    </body>\r" +
    "\n" +
    "    <script type=\"text/javaScript\" src=\"./bower_components/angular/angular.min.js\"></script>\r" +
    "\n" +
    "    <script type=\"text/javaScript\" src=\"./bower_components/angular-sanitize/angular-sanitize.min.js\"></script>\r" +
    "\n" +
    "    <script type=\"text/javaScript\" src=\"./bower_components/angular-ui-select/dist/select.min.js\"></script>\r" +
    "\n" +
    "    <script type=\"text/javaScript\" src=\"../dist/scripts/feasibility-search/ttui-clm-feasibility-search.js\"></script>\r" +
    "\n" +
    "    <script type=\"text/javaScript\">\r" +
    "\n" +
    "        angular.module('testApp', ['TT-UI-CLM.FeasibilitySearch']).controller('testCtrl', function($scope) {\r" +
    "\n" +
    "            $scope.testMsg = 'Test App Working';\r" +
    "\n" +
    "            $scope.model={};\r" +
    "\n" +
    "            $scope.masterData = {\"language\":\"en\",\"lgas\":{\"lga\":[{\"code\":\"TOR\",\"name\":\"TORONTO1\",\"stateCode\":\"DELHI\",\"stateName\":\"DELHI\",\"countryCode\":\"GHANA\",\"countryName\":\"GHANA\"},{\"code\":\"ABC\",\"name\":\"ABCD\",\"stateCode\":\"ABCDE\",\"stateName\":\"ABCDEF\",\"countryCode\":\"XYZ\",\"countryName\":\"GHANA\"}]},\"paymentMethods\":{\"paymentMethod\":[{\"code\":\"CASH\",\"name\":\"Cash\"},{\"code\":\"DEDUCTIN\",\"name\":\"Deduct from Charging System\"},{\"code\":\"CHEQUE\",\"name\":\"Cheque\"},{\"code\":\"CREDITCARD\",\"name\":\"Credit Card\"},{\"code\":\"DEBITCARD\",\"name\":\"Debit Card\"},{\"code\":\"PAIDINBANK\",\"name\":\"Paid in Bank\"},{\"code\":\"autoDebit\",\"name\":\"Auto Debit\"},{\"code\":\"VP\",\"name\":\"Voucher Payment\"},{\"code\":\"IP\",\"name\":\"Internet Payment\"},{\"code\":\"CHRGBILL\",\"name\":\"Charge In-Voice\"}]},\"poBoxAddresses\":{\"poBoxAddress\":[{\"code\":1234,\"name\":1234,\"postalCode\":{\"code\":\"5000001\",\"name\":\"5000001\",\"cities\":{\"city\":[{\"code\":\"CO\",\"name\":\"COTONOU\"}]}},\"PostalAreaNumber\":\"100\"},{\"code\":3456,\"name\":3456,\"postalCode\":{\"code\":\"5000002\",\"name\":\"5000002\",\"cities\":{\"city\":[{\"code\":\"PN\",\"name\":\"PORTO NOVO\"}]}},\"PostalAreaNumber\":\"101\"}]},\"dunningSchedules\":{\"dunningSchedule\":[{\"code\":\"MTNDUN\",\"name\":\"MTNB DUNNING SCHEDULE\"},{\"code\":\"LRDUN\",\"name\":\"LR DUNNING SCHEDULE\"},{\"code\":\"GSM\",\"name\":\"MT GSM SCHEDULE\"},{\"code\":\"BRIJ\",\"name\":\"BRIJ DUNNING SCHEDULE\"},{\"code\":\"TESTDU\",\"name\":\"DUNNING TESTING\"}]},\"billPeriodicities\":{\"billPeriodicity\":[{\"code\":\"MONTHLY\",\"name\":\"Monthly\",\"default\":\"Y\",\"billCycles\":{\"billCycle\":[{\"code\":\"101000001\",\"name\":\"1ST TO 31ST MONTHLY BILL CYCLE\"},{\"code\":\"107000001\",\"name\":\"7TH TO 6TH MONTHLY BILL CYCLE\"},{\"code\":\"114000001\",\"name\":\"14TH TO 13TH MONTHLY BILL CYCLE\"},{\"code\":\"121000001\",\"name\":\"21ST TO 20TH MONTHLY BILL CYCLE\"}]}}]},\"countries\":{\"country\":[{\"code\":\"BW\",\"name\":\"BOTSWANA\"},{\"code\":\"BR\",\"name\":\"BRAZIL\"},{\"code\":\"MU\",\"name\":\"MAURITIUS\",\"default\":\"Y\",\"provinces\":{\"province\":[{\"code\":\"S11\",\"name\":\"OUTER ISLAND 1\",\"cities\":{\"city\":[{\"code\":\"PV\",\"name\":\"AGALEGA\",\"default\":\"Y\",\"postOffices\":{\"postOffice\":[{\"code\":\"223\",\"name\":\"Post Office 1\",\"default\":\"Y\"}]}}]}},{\"code\":\"S1\",\"name\":\"PORT LOUIS\",\"cities\":{\"city\":[{\"code\":\"L1\",\"name\":\"PORT LOUIS\"},{\"code\":\"L3\",\"name\":\"ABERCROMBIE\"},{\"code\":\"L8\",\"name\":\"ARSENAL\"},{\"code\":\"L35\",\"name\":\"CASSIS\"},{\"code\":\"L44\",\"name\":\"COINBOX MTS LTD\"},{\"code\":\"L94\",\"name\":\"LA TOUR KOENIG\"},{\"code\":\"L105\",\"name\":\"M.C.B.  PORT LOUIS\"},{\"code\":\"L113\",\"name\":\"MAURITIUS TELECOM\"},{\"code\":\"L118\",\"name\":\"MLA\"},{\"code\":\"L120\",\"name\":\"MON LOISIR DESJARD\"},{\"code\":\"L134\",\"name\":\"PAILLES\"},{\"code\":\"L145\",\"name\":\"PLAINE LAUZUN\"},{\"code\":\"L147\",\"name\":\"POINTE AUX SABLES\"},{\"code\":\"L150\",\"name\":\"POLICE PAY OFFICE\"},{\"code\":\"L163\",\"name\":\"RICHE TERRE\"},{\"code\":\"L170\",\"name\":\"ROCHE BOIS\"},{\"code\":\"L183\",\"name\":\"STE CROIX\"},{\"code\":\"L187\",\"name\":\"TERRE ROUGE\"},{\"code\":\"L198\",\"name\":\"VALLEE DES PRETRES\"}]}},{\"code\":\"S2\",\"name\":\"BLACK RIVER\",\"default\":\"Y\",\"cities\":{\"city\":[{\"code\":\"L5\",\"name\":\"ALBION\"},{\"code\":\"L10\",\"name\":\"BAIE DU CAP\"},{\"code\":\"L11\",\"name\":\"BAMBOUS\"},{\"code\":\"L16\",\"name\":\"BEL OMBRE\"},{\"code\":\"L19\",\"name\":\"BLACK RIVER\",\"default\":\"Y\"},{\"code\":\"L33\",\"name\":\"CASCAVELLE\"},{\"code\":\"L34\",\"name\":\"CASE NOYALE\"},{\"code\":\"L38\",\"name\":\"CHAMAREL\"},{\"code\":\"L62\",\"name\":\"FLIC EN FLAC\"},{\"code\":\"L79\",\"name\":\"GRANDE RIVIERE NOIRE\"},{\"code\":\"L83\",\"name\":\"ILE AUX BENITIERS\"},{\"code\":\"L87\",\"name\":\"LA FERME \"},{\"code\":\"L90\",\"name\":\"LA GAULETTE\"},{\"code\":\"L91\",\"name\":\"LA PRENEUSE\"},{\"code\":\"L98\",\"name\":\"LE MORNE\"},{\"code\":\"L106\",\"name\":\"MACABE\"},{\"code\":\"L114\",\"name\":\"MEDINE\"},{\"code\":\"L141\",\"name\":\"PETITE RIVIERE\"},{\"code\":\"L149\",\"name\":\"POINTE SABLES\"},{\"code\":\"L168\",\"name\":\"RIVIERE NOIRE\"},{\"code\":\"L186\",\"name\":\"TAMARIN\"},{\"code\":\"L201\",\"name\":\"MAURITIUS - BAMBOUS\"}]}},{\"code\":\"S3\",\"name\":\"SAVANNE\",\"cities\":{\"city\":[{\"code\":\"L26\",\"name\":\"BRITANNIA\"},{\"code\":\"L29\",\"name\":\"CAMP DIABLE\"},{\"code\":\"L39\",\"name\":\"CHEMIN GRENIER\"},{\"code\":\"L40\",\"name\":\"CITE CAMP DIABLE\"},{\"code\":\"L73\",\"name\":\"GRAND BOIS\"},{\"code\":\"L88\",\"name\":\"LA FLORA\"},{\"code\":\"L89\",\"name\":\"LA FORET L'ESCALIER\"},{\"code\":\"L100\",\"name\":\"L'ESCALIER\"},{\"code\":\"L109\",\"name\":\"MARE ANGUILLES\"},{\"code\":\"L165\",\"name\":\"RIVIERE DES ANGUILLES\"},{\"code\":\"L166\",\"name\":\"RIVIERE DU POSTE\"},{\"code\":\"L178\",\"name\":\"SAVANNE\"},{\"code\":\"L180\",\"name\":\"SOUILLAC\"},{\"code\":\"L185\",\"name\":\"SURINAM\"}]}},{\"code\":\"S4\",\"name\":\"GRAND PORT\",\"cities\":{\"city\":[{\"code\":\"L2\",\"name\":\"PLAISANCE\"},{\"code\":\"L20\",\"name\":\"BLUE BAY\"},{\"code\":\"L43\",\"name\":\"CLUNY\"},{\"code\":\"L75\",\"name\":\"GRAND PORT\"},{\"code\":\"L80\",\"name\":\"GROS BILLOT\"},{\"code\":\"L82\",\"name\":\"ILE AUX AIGRETTES\"},{\"code\":\"L92\",\"name\":\"LA ROSA\"},{\"code\":\"L107\",\"name\":\"MAHEBOURG\"},{\"code\":\"L110\",\"name\":\"MARE D'ALBERT\"},{\"code\":\"L111\",\"name\":\"MARE LA CHAUX\"},{\"code\":\"L112\",\"name\":\"MARE TABAC\"},{\"code\":\"L124\",\"name\":\"MONT FERTILE\"},{\"code\":\"L125\",\"name\":\"MONT FLEURI\"},{\"code\":\"L130\",\"name\":\"NEW GROVE\"},{\"code\":\"L131\",\"name\":\"NOUVELLE FRANCE\"},{\"code\":\"L132\",\"name\":\"OLD GRAND PORT\"},{\"code\":\"L136\",\"name\":\"PAVILION DU GRAND PORT\"},{\"code\":\"L146\",\"name\":\"PLAINE MAGNIEN\"},{\"code\":\"L148\",\"name\":\"POINTE D'ESNY\"},{\"code\":\"L160\",\"name\":\"QUATRE SOEURS\"},{\"code\":\"L162\",\"name\":\"RICHE EN EAU\"},{\"code\":\"L173\",\"name\":\"ROSE BELLE\"},{\"code\":\"L190\",\"name\":\"TROIS BOUTIQUES\"},{\"code\":\"L194\",\"name\":\"UNION PARK\"},{\"code\":\"L195\",\"name\":\"UNION VALE\"},{\"code\":\"L200\",\"name\":\"VIEUX GRAND PORT\"}]}},{\"code\":\"S5\",\"name\":\"FLACQ\",\"cities\":{\"city\":[{\"code\":\"L175\",\"name\":\"SAINT JULIEN D'HOTMAN\"},{\"code\":\"L6\",\"name\":\"ALMA\"},{\"code\":\"L14\",\"name\":\"BEL AIR\"},{\"code\":\"L15\",\"name\":\"BEL AIR RIVIERE SECHE\"},{\"code\":\"L17\",\"name\":\"BELLE MARE \"},{\"code\":\"L21\",\"name\":\"BOIS D'OISEAU BEL AIR\"},{\"code\":\"L22\",\"name\":\"BOIS D'OISEAU LAVENTURE\"},{\"code\":\"L23\",\"name\":\"BON ACCEUIL\"},{\"code\":\"L24\",\"name\":\"BRAS D'EAU FLACQ\"},{\"code\":\"L25\",\"name\":\"BRISEE  VERDIERE\"},{\"code\":\"L27\",\"name\":\"CAMP DE MASQUE\"},{\"code\":\"L28\",\"name\":\"CAMP DE MASQUE PAVE\"},{\"code\":\"L37\",\"name\":\"CENTRAL FLACQ\"},{\"code\":\"L42\",\"name\":\"CLEMENCIA\"},{\"code\":\"L54\",\"name\":\"DEUX FRERES\"},{\"code\":\"L55\",\"name\":\"DOCK - G.R.S.E.\"},{\"code\":\"L59\",\"name\":\"ECROIGNARD\"},{\"code\":\"L60\",\"name\":\"ERNEST FLORENT\"},{\"code\":\"L61\",\"name\":\"FLACQ\"},{\"code\":\"L72\",\"name\":\"GRAND BEL AIR\"},{\"code\":\"L77\",\"name\":\"GRAND SABLE\"},{\"code\":\"L85\",\"name\":\"KEWAL NAGAR\"},{\"code\":\"L96\",\"name\":\"LALLMATIE\"},{\"code\":\"L97\",\"name\":\"LAVENTURE\"},{\"code\":\"L126\",\"name\":\"MONT IDA\"},{\"code\":\"L133\",\"name\":\"OLIVIA\"},{\"code\":\"L152\",\"name\":\"POSTE DE FLACQ\"},{\"code\":\"L159\",\"name\":\"QUATRE COCOS\"},{\"code\":\"L169\",\"name\":\"RIVIERE SECHE\"},{\"code\":\"L176\",\"name\":\"SAINT JULIEN VILLAGE\"},{\"code\":\"L179\",\"name\":\"SEBASTOPOL\"},{\"code\":\"L181\",\"name\":\"ST JULIEN FLACQ\"},{\"code\":\"L192\",\"name\":\"TROU D'EAU DOUCE\"},{\"code\":\"L193\",\"name\":\"UNION FLACQ\"},{\"code\":\"L196\",\"name\":\"UPPER DAGOTIERE\"}]}},{\"code\":\"S6\",\"name\":\"PLAINES WILHEMS\",\"cities\":{\"city\":[{\"code\":\"L12\",\"name\":\"BEAU BASSIN\"},{\"code\":\"L13\",\"name\":\"BEAU SONGES\"},{\"code\":\"L36\",\"name\":\"CASTEL\"},{\"code\":\"L46\",\"name\":\"COROMANDEL\"},{\"code\":\"L49\",\"name\":\"CT BRASSERIE\"},{\"code\":\"L50\",\"name\":\"CUREPIPE\"},{\"code\":\"L51\",\"name\":\"CUREPIPE ROAD\"},{\"code\":\"L57\",\"name\":\"EAU COULEE\"},{\"code\":\"L58\",\"name\":\"EBENE\"},{\"code\":\"L63\",\"name\":\"FLOREAL\"},{\"code\":\"L65\",\"name\":\"FOREST SIDE\"},{\"code\":\"L68\",\"name\":\"GLEN PARK\"},{\"code\":\"L81\",\"name\":\"HIGHLANDS\"},{\"code\":\"L99\",\"name\":\"LE PETRIN\"},{\"code\":\"L116\",\"name\":\"MESNIL\"},{\"code\":\"L117\",\"name\":\"MIDLANDS\"},{\"code\":\"L142\",\"name\":\"PHOENIX\"},{\"code\":\"L157\",\"name\":\"QUARTIER MILITAIRE\"},{\"code\":\"L158\",\"name\":\"QUATRE BORNES\"},{\"code\":\"L164\",\"name\":\"RICHELIEU\"},{\"code\":\"L174\",\"name\":\"ROSE HILL\"},{\"code\":\"L197\",\"name\":\"VACOAS\"}]}},{\"code\":\"S7\",\"name\":\"MOKA\",\"cities\":{\"city\":[{\"code\":\"L7\",\"name\":\"ALMA VERDUN\"},{\"code\":\"L9\",\"name\":\"ASSURANCE VERDUN\"},{\"code\":\"L30\",\"name\":\"CAMP SAMY\"},{\"code\":\"L31\",\"name\":\"CAMP THOREL\"},{\"code\":\"L52\",\"name\":\"DAGOTIERE\"},{\"code\":\"L56\",\"name\":\"DUBREUIL\"},{\"code\":\"L95\",\"name\":\"L'AGREMENT\"},{\"code\":\"L115\",\"name\":\"MELROSE\"},{\"code\":\"L119\",\"name\":\"MOKA\"},{\"code\":\"L121\",\"name\":\"MON TRESOR MON DESERT\"},{\"code\":\"L127\",\"name\":\"MONTAGNE BLANCHE\"},{\"code\":\"L137\",\"name\":\"PETIT PAQUET\"},{\"code\":\"L161\",\"name\":\"REDUIT\"},{\"code\":\"L182\",\"name\":\"ST PIERRE\"},{\"code\":\"L199\",\"name\":\"VERDUN\"}]}},{\"code\":\"S8\",\"name\":\"RIVIERE DU REMPART\",\"cities\":{\"city\":[{\"code\":\"L18\",\"name\":\"BELLE VUE MAUREL\"},{\"code\":\"L32\",\"name\":\"CAP MALHEUREUX\"},{\"code\":\"L69\",\"name\":\"GOODLANDS\"},{\"code\":\"L70\",\"name\":\"GOWER\"},{\"code\":\"L71\",\"name\":\"GRAND BAIE\"},{\"code\":\"L74\",\"name\":\"GRAND GAUBE\"},{\"code\":\"L84\",\"name\":\"ILE D'AMBRE\"},{\"code\":\"L108\",\"name\":\"MAPOU\"},{\"code\":\"L138\",\"name\":\"PETIT RAFFRAY\"},{\"code\":\"L143\",\"name\":\"PITON\"},{\"code\":\"L153\",\"name\":\"POUDRE D'OR\"},{\"code\":\"L154\",\"name\":\"POUDRE D'OR HAMLET\"},{\"code\":\"L156\",\"name\":\"POUDRE D'OR VILLAGE\"},{\"code\":\"L167\",\"name\":\"RIVIERE DU REMPART\"},{\"code\":\"L171\",\"name\":\"ROCHES NOIRES\"},{\"code\":\"L177\",\"name\":\"PEREYBERE\"}]}},{\"code\":\"S9\",\"name\":\"PAMPLEMOUSSES\",\"cities\":{\"city\":[{\"code\":\"L45\",\"name\":\"CONGOMA\"},{\"code\":\"L47\",\"name\":\"COTTAGE \"},{\"code\":\"L48\",\"name\":\"CREVE COEUR\"},{\"code\":\"L53\",\"name\":\"D'EPINAY PAMPLEMOUSSES\"},{\"code\":\"L64\",\"name\":\"FOND DU SAC\"},{\"code\":\"L66\",\"name\":\"GRAND RIVER SOUTH EAST\"},{\"code\":\"L78\",\"name\":\"GRANDE PTE AUX PIMENTS\"},{\"code\":\"L86\",\"name\":\"L. MOUNT\"},{\"code\":\"L102\",\"name\":\"LONG MOUNTAIN\"},{\"code\":\"L103\",\"name\":\"LOWER VALE\"},{\"code\":\"L104\",\"name\":\"M. BLANCHE\"},{\"code\":\"L122\",\"name\":\"MONT BLANCHE\"},{\"code\":\"L123\",\"name\":\"MONT CHOISY\"},{\"code\":\"L128\",\"name\":\"MONTAGNE LONGUE\"},{\"code\":\"L135\",\"name\":\"PAMPLEMOUSSES\"},{\"code\":\"L139\",\"name\":\"PETITE JULIE\"},{\"code\":\"L140\",\"name\":\"PETITE POINTE AUX PIMENTS\"},{\"code\":\"L144\",\"name\":\"PLAINE DES PAPAYES\"},{\"code\":\"L188\",\"name\":\"TOMBEAU BAY\"},{\"code\":\"L189\",\"name\":\"TRIOLET\"},{\"code\":\"L191\",\"name\":\"TROU AUX BICHES\"}]}},{\"code\":\"S10\",\"name\":\"RODRIGUES\",\"cities\":{\"city\":[{\"code\":\"L41\",\"name\":\"CITRONELLE \"},{\"code\":\"L172\",\"name\":\"RODRIGUES\"}]}}]}},{\"code\":\"BT\",\"name\":\"BHUTAN\"},{\"code\":\"BA\",\"name\":\"BOSNIA AND HERZEGOWINA\"},{\"code\":\"BV\",\"name\":\"BOUVET ISLAND\"},{\"code\":\"IO\",\"name\":\"BRITISH INDIAN OCEAN TERRITORY\"},{\"code\":\"BG\",\"name\":\"BULGARIA\"},{\"code\":\"BI\",\"name\":\"BURUNDI\"},{\"code\":\"KH\",\"name\":\"CAMBODIA\"},{\"code\":\"CA\",\"name\":\"CANADA\"},{\"code\":\"KY\",\"name\":\"CAYMAN ISLANDS\"},{\"code\":\"CF\",\"name\":\"CENTRAL AFRICAN REPUBLIC\"},{\"code\":\"CX\",\"name\":\"CHRISTMAS ISLAND\"},{\"code\":\"CC\",\"name\":\"COCOS (KEELING) ISLANDS\"},{\"code\":\"CD\",\"name\":\"CONGO,Democratic republic of \"},{\"code\":\"CK\",\"name\":\"COOK ISLANDS\"},{\"code\":\"CI\",\"name\":\"COTE D'IVOIRE\"},{\"code\":\"HR\",\"name\":\"CROATIA (local name:Hrvatska)\"},{\"code\":\"DK\",\"name\":\"DENMARK\"},{\"code\":\"DJ\",\"name\":\"DJIBOUTI\"},{\"code\":\"DO\",\"name\":\"DOMINICAN REPUBLIC\"},{\"code\":\"EG\",\"name\":\"EGYPT\"},{\"code\":\"GQ\",\"name\":\"EQUATORIAL GUINEA\"},{\"code\":\"EE\",\"name\":\"ESTONIA\"},{\"code\":\"FK\",\"name\":\"FALKLAND ISLANDS (MALVINAS)\"},{\"code\":\"FJ\",\"name\":\"FIJI\"},{\"code\":\"FI\",\"name\":\"FINLAND\"},{\"code\":\"GF\",\"name\":\"FRENCH GUIANA\"},{\"code\":\"TF\",\"name\":\"FRENCH SOUTHERN TERRITORIES\"},{\"code\":\"GM\",\"name\":\"GAMBIA\"},{\"code\":\"DE\",\"name\":\"GERMANY\"},{\"code\":\"GI\",\"name\":\"GIBRALTAR\"},{\"code\":\"GL\",\"name\":\"GREENLAND\"},{\"code\":\"GP\",\"name\":\"GUADELOUPE\"},{\"code\":\"GT\",\"name\":\"GUATEMALA\"},{\"code\":\"GN\",\"name\":\"GUINEA\"},{\"code\":\"GY\",\"name\":\"GUYANA\"},{\"code\":\"HM\",\"name\":\"HEARD AND MC DONALD ISLANDS\"},{\"code\":\"HK\",\"name\":\"HONG KONG\"},{\"code\":\"IS\",\"name\":\"ICELAND\"},{\"code\":\"ID\",\"name\":\"INDONESIA\"},{\"code\":\"IR\",\"name\":\"IRAN (ISLAMIC REPUBLIC OF)\"},{\"code\":\"IL\",\"name\":\"ISRAEL\"},{\"code\":\"JM\",\"name\":\"JAMAICA\"},{\"code\":\"JO\",\"name\":\"JORDAN\"},{\"code\":\"KE\",\"name\":\"KENYA\"},{\"code\":\"KI\",\"name\":\"KIRIBATI\"},{\"code\":\"KP\",\"name\":\"KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF\"},{\"code\":\"LA\",\"name\":\"LAO PEOPLE'S DEMOCRATIC REPUBLIC\"},{\"code\":\"LB\",\"name\":\"LEBANON\"},{\"code\":\"LR\",\"name\":\"LIBERIA\"},{\"code\":\"LY\",\"name\":\"LIBYAN ARAB JAMAHIRIYA\"},{\"code\":\"LU\",\"name\":\"LUXEMBOURG\"},{\"code\":\"MO\",\"name\":\"MACAU\"},{\"code\":\"MK\",\"name\":\"MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF\"},{\"code\":\"MV\",\"name\":\"MALDIVES\"},{\"code\":\"MT\",\"name\":\"MALTA\"},{\"code\":\"MH\",\"name\":\"MARSHALL ISLANDS\"},{\"code\":\"YT\",\"name\":\"MAYOTTE\"},{\"code\":\"FM\",\"name\":\"MICRONESIA, FEDERATED STATES OF\"},{\"code\":\"MC\",\"name\":\"MONACO\"},{\"code\":\"MN\",\"name\":\"MONGOLIA\"},{\"code\":\"MA\",\"name\":\"MOROCCO\"},{\"code\":\"MM\",\"name\":\"MYANMAR\"},{\"code\":\"NR\",\"name\":\"NAURU\"},{\"code\":\"NP\",\"name\":\"NEPAL\"},{\"code\":\"AN\",\"name\":\"NETHERLANDS ANTILLES\"},{\"code\":\"NZ\",\"name\":\"NEW ZEALAND\"},{\"code\":\"NI\",\"name\":\"NICARAGUA\"},{\"code\":\"NU\",\"name\":\"NIUE\"},{\"code\":\"AX\",\"name\":\"ALAND ISLANDS\"},{\"code\":\"AF\",\"name\":\"AFGHANISTAN\"},{\"code\":\"AL\",\"name\":\"ALBANIA\"},{\"code\":\"DZ\",\"name\":\"ALGERIA\"},{\"code\":\"AS\",\"name\":\"AMERICAN SAMOA\"},{\"code\":\"AD\",\"name\":\"ANDORRA\"},{\"code\":\"AO\",\"name\":\"ANGOLA\"},{\"code\":\"AI\",\"name\":\"ANGUILLA\"},{\"code\":\"AQ\",\"name\":\"ANTARCTICA\"},{\"code\":\"AG\",\"name\":\"ANTIGUA AND BARBUDA\"},{\"code\":\"AR\",\"name\":\"ARGENTINA\"},{\"code\":\"AM\",\"name\":\"ARMENIA\"},{\"code\":\"AW\",\"name\":\"ARUBA\"},{\"code\":\"AU\",\"name\":\"AUSTRALIA\"},{\"code\":\"AT\",\"name\":\"AUSTRIA\"},{\"code\":\"AZ\",\"name\":\"AZERBAIJAN\"},{\"code\":\"BS\",\"name\":\"BAHAMAS\"},{\"code\":\"BH\",\"name\":\"BAHRAIN\"},{\"code\":\"BD\",\"name\":\"BANGLADESH\"},{\"code\":\"BB\",\"name\":\"BARBADOS\"},{\"code\":\"BY\",\"name\":\"BELARUS\"},{\"code\":\"BE\",\"name\":\"BELGIUM\"},{\"code\":\"BZ\",\"name\":\"BELIZE\"},{\"code\":\"BJ\",\"name\":\"BENIN\"},{\"code\":\"BM\",\"name\":\"BERMUDA\"},{\"code\":\"BO\",\"name\":\"BOLIVIA\"},{\"code\":\"TC\",\"name\":\"TURKS AND CAICOS ISLANDS\"},{\"code\":\"TV\",\"name\":\"TUVALU\"},{\"code\":\"UG\",\"name\":\"UGANDA\"},{\"code\":\"UA\",\"name\":\"UKRAINE\"},{\"code\":\"AE\",\"name\":\"UNITED ARAB EMIRATES\"},{\"code\":\"GB\",\"name\":\"UNITED KINGDOM\"},{\"code\":\"US\",\"name\":\"UNITED STATES\"},{\"code\":\"UM\",\"name\":\"UNITED STATES MINOR OUTLYING ISLANDS\"},{\"code\":\"UY\",\"name\":\"URUGUAY\"},{\"code\":\"UZ\",\"name\":\"UZBEKISTAN\"},{\"code\":\"VU\",\"name\":\"VANUATU\"},{\"code\":\"VA\",\"name\":\"VATICAN CITY STATE (HOLY SEE)\"},{\"code\":\"VE\",\"name\":\"VENEZUELA\"},{\"code\":\"VN\",\"name\":\"VIET NAM\"},{\"code\":\"VG\",\"name\":\"VIRGIN ISLANDS (BRITISH)\"},{\"code\":\"VI\",\"name\":\"VIRGIN ISLANDS (U.S.)\"},{\"code\":\"WF\",\"name\":\"WALLIS AND FUTUNA ISLANDS\"},{\"code\":\"EH\",\"name\":\"WESTERN SAHARA\"},{\"code\":\"YE\",\"name\":\"YEMEN\"},{\"code\":\"ZM\",\"name\":\"ZAMBIA\"},{\"code\":\"ZW\",\"name\":\"ZIMBABWE\"},{\"code\":\"NF\",\"name\":\"NORFOLK ISLAND\"},{\"code\":\"NO\",\"name\":\"NORWAY\"},{\"code\":\"PK\",\"name\":\"PAKISTAN\"},{\"code\":\"PW\",\"name\":\"PALAU\"},{\"code\":\"PA\",\"name\":\"PANAMA\"},{\"code\":\"PG\",\"name\":\"PAPUA NEW GUINEA\"},{\"code\":\"PE\",\"name\":\"PERU\"},{\"code\":\"PN\",\"name\":\"PITCAIRN\"},{\"code\":\"PT\",\"name\":\"PORTUGAL\"},{\"code\":\"QA\",\"name\":\"QATAR\"},{\"code\":\"RE\",\"name\":\"REUNION\"},{\"code\":\"RU\",\"name\":\"RUSSIAN FEDERATION\"},{\"code\":\"SH\",\"name\":\"SAINT HELENA\"},{\"code\":\"LC\",\"name\":\"SAINT LUCIA\"},{\"code\":\"PM\",\"name\":\"SAINT PIERRE AND MIQUELON\"},{\"code\":\"WS\",\"name\":\"SAMOA\"},{\"code\":\"SM\",\"name\":\"SAN MARINO\"},{\"code\":\"SA\",\"name\":\"SAUDI ARABIA\"},{\"code\":\"CS\",\"name\":\"SERBIA AND MONTENEGRO\"},{\"code\":\"SL\",\"name\":\"SIERRA LEONE\"},{\"code\":\"BN\",\"name\":\"BRUNEI DARUSSALAM\"},{\"code\":\"BF\",\"name\":\"BURKINA FASO\"},{\"code\":\"CM\",\"name\":\"CAMEROON\"},{\"code\":\"CV\",\"name\":\"CAPE VERDE\"},{\"code\":\"TD\",\"name\":\"CHAD\"},{\"code\":\"CL\",\"name\":\"CHILE\"},{\"code\":\"CN\",\"name\":\"CHINA\"},{\"code\":\"CO\",\"name\":\"COLOMBIA\"},{\"code\":\"KM\",\"name\":\"COMOROS\"},{\"code\":\"CG\",\"name\":\"CONGO,Republic of \"},{\"code\":\"CR\",\"name\":\"COSTA RICA\"},{\"code\":\"CU\",\"name\":\"CUBA\"},{\"code\":\"CY\",\"name\":\"CYPRUS\"},{\"code\":\"CZ\",\"name\":\"CZECH REPUBLIC\"},{\"code\":\"DM\",\"name\":\"DOMINICA\"},{\"code\":\"EC\",\"name\":\"ECUADOR\"},{\"code\":\"SV\",\"name\":\"ELSALVADOR\"},{\"code\":\"ER\",\"name\":\"ERITREA\"},{\"code\":\"ET\",\"name\":\"ETHIOPIA\"},{\"code\":\"FO\",\"name\":\"FAROE ISLANDS\"},{\"code\":\"FR\",\"name\":\"FRANCE\"},{\"code\":\"PF\",\"name\":\"FRENCH POLYNESIA\"},{\"code\":\"GA\",\"name\":\"GABON\"},{\"code\":\"GE\",\"name\":\"GEORGIA\"},{\"code\":\"GH\",\"name\":\"GHANA\"},{\"code\":\"GR\",\"name\":\"GREECE\"},{\"code\":\"GD\",\"name\":\"GRENADA\"},{\"code\":\"GU\",\"name\":\"GUAM\"},{\"code\":\"GW\",\"name\":\"GUINEA-BISSAU\"},{\"code\":\"HT\",\"name\":\"HAITI\"},{\"code\":\"HN\",\"name\":\"HONDURAS\"},{\"code\":\"HU\",\"name\":\"HUNGARY\"},{\"code\":\"IN\",\"name\":\"INDIA\"},{\"code\":\"IQ\",\"name\":\"IRAQ\"},{\"code\":\"IE\",\"name\":\"IRELAND\"},{\"code\":\"IT\",\"name\":\"ITALY\"},{\"code\":\"JP\",\"name\":\"JAPAN\"},{\"code\":\"KZ\",\"name\":\"KAZAKHSTAN\"},{\"code\":\"KR\",\"name\":\"KOREA, REPUBLIC OF\"},{\"code\":\"KW\",\"name\":\"KUWAIT\"},{\"code\":\"KG\",\"name\":\"KYRGYZSTAN\"},{\"code\":\"LV\",\"name\":\"LATVIA\"},{\"code\":\"LS\",\"name\":\"LESOTHO\"},{\"code\":\"LI\",\"name\":\"LIECHTENSTEIN\"},{\"code\":\"LT\",\"name\":\"LITHUANIA\"},{\"code\":\"MG\",\"name\":\"MADAGASCAR\"},{\"code\":\"MW\",\"name\":\"MALAWI\"},{\"code\":\"MY\",\"name\":\"MALAYSIA\"},{\"code\":\"ML\",\"name\":\"MALI\"},{\"code\":\"MQ\",\"name\":\"MARTINIQUE\"},{\"code\":\"MR\",\"name\":\"MAURITANIA\",\"provinces\":{\"province\":[{\"code\":\"MU1\",\"name\":\"MAURITIUS TELECOM 1\",\"cities\":{\"city\":[]}}]}},{\"code\":\"MX\",\"name\":\"MEXICO\"},{\"code\":\"MD\",\"name\":\"MOLDOVA, REPUBLIC OF\"},{\"code\":\"MS\",\"name\":\"MONTSERRAT\"},{\"code\":\"MZ\",\"name\":\"MOZAMBIQUE\"},{\"code\":\"NA\",\"name\":\"NAMIBIA\"},{\"code\":\"NL\",\"name\":\"NETHERLANDS\"},{\"code\":\"NC\",\"name\":\"NEW CALEDONIA\"},{\"code\":\"NE\",\"name\":\"NIGER\"},{\"code\":\"NG\",\"name\":\"NIGERIA\"},{\"code\":\"MP\",\"name\":\"NORTHERN MARIANA ISLANDS\"},{\"code\":\"OM\",\"name\":\"OMAN\"},{\"code\":\"PS\",\"name\":\"PALESTINIAN TERRITORY\"},{\"code\":\"PY\",\"name\":\"PARAGUAY\"},{\"code\":\"PH\",\"name\":\"PHILIPPINES\"},{\"code\":\"PL\",\"name\":\"POLAND\"},{\"code\":\"PR\",\"name\":\"PUERTO RICO\"},{\"code\":\"RO\",\"name\":\"ROMANIA\"},{\"code\":\"RW\",\"name\":\"RWANDA\"},{\"code\":\"KN\",\"name\":\"SAINT KITTS AND NEVIS\"},{\"code\":\"VC\",\"name\":\"SAINT VINCENT AND THE GRENADINES\"},{\"code\":\"ST\",\"name\":\"SAO TOME AND PRINCIPE\"},{\"code\":\"SN\",\"name\":\"SENEGAL\"},{\"code\":\"SC\",\"name\":\"SEYCHELLES\"},{\"code\":\"SG\",\"name\":\"SINGAPORE\"},{\"code\":\"SK\",\"name\":\"SLOVAKIA\"},{\"code\":\"SI\",\"name\":\"SLOVENIA\"},{\"code\":\"SB\",\"name\":\"SOLOMON ISLANDS\"},{\"code\":\"SO\",\"name\":\"SOMALIA\"},{\"code\":\"ZA\",\"name\":\"SOUTH AFRICA\"},{\"code\":\"GS\",\"name\":\"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS\"},{\"code\":\"ES\",\"name\":\"SPAIN\"},{\"code\":\"LK\",\"name\":\"SRI LANKA\"},{\"code\":\"SD\",\"name\":\"SUDAN\"},{\"code\":\"SR\",\"name\":\"SURINAME\"},{\"code\":\"SJ\",\"name\":\"SVALBARD AND JAN MAYEN ISLANDS\"},{\"code\":\"SZ\",\"name\":\"SWAZILAND\"},{\"code\":\"SE\",\"name\":\"SWEDEN\"},{\"code\":\"CH\",\"name\":\"SWITZERLAND\"},{\"code\":\"SY\",\"name\":\"SYRIAN ARAB REPUBLIC\"},{\"code\":\"TW\",\"name\":\"TAIWAN\"},{\"code\":\"TJ\",\"name\":\"TAJIKISTAN\"},{\"code\":\"TZ\",\"name\":\"TANZANIA,UNITED REPUBLI OF\"},{\"code\":\"TH\",\"name\":\"THAILAND\"},{\"code\":\"TL\",\"name\":\"TIMOR-LESTE\"},{\"code\":\"TG\",\"name\":\"TOGO\"},{\"code\":\"TK\",\"name\":\"TOKELAU\"},{\"code\":\"TO\",\"name\":\"TONGA\"},{\"code\":\"TT\",\"name\":\"TRINIDAD AND TOBAGO\"},{\"code\":\"TN\",\"name\":\"TUNISIA\"},{\"code\":\"TR\",\"name\":\"TURKEY\"},{\"code\":\"TM\",\"name\":\"TURKMENISTAN\"}]},\"localities\":{\"locality\":[{\"code\":\"L175\",\"postOffices\":{\"postOffice\":[{\"code\":\"1234\",\"name\":\"1234\",\"default\":\"Y\"}]}},{\"code\":\"PV\",\"subLocalities\":{\"subLocality\":[{\"code\":\"PV\",\"name\":\"PLAINE VERTE\",\"default\":\"Y\",\"streets\":{\"street\":[{\"code\":\"SS1\",\"default\":\"Y\",\"name\":\"AIL DORE\"},{\"code\":\"SS10\",\"default\":\"Y\",\"name\":\"MADAD UL ISLAM ST.\"},{\"code\":\"SS11\",\"default\":\"Y\",\"name\":\"GORAH ISSAC ST.\"},{\"code\":\"SS12\",\"default\":\"Y\",\"name\":\"DIEGO GARCIA ST.\"},{\"code\":\"SS13\",\"default\":\"Y\",\"name\":\"IMAM BACOSSE SOBDAR ST.\"},{\"code\":\"SS14\",\"default\":\"Y\",\"name\":\"BON ENFANT ST.\"},{\"code\":\"SS15\",\"default\":\"Y\",\"name\":\"BENARES ST.\"},{\"code\":\"SS16\",\"default\":\"Y\",\"name\":\"MADRAS ST.\"},{\"code\":\"SS17\",\"default\":\"Y\",\"name\":\"DR HASSEN SAKIR ST.\"},{\"code\":\"SS18\",\"default\":\"Y\",\"name\":\"RUCHPAUL ST.\"},{\"code\":\"SS19\",\"default\":\"Y\",\"name\":\"ALLEPPO ST.\"},{\"code\":\"SS2\",\"default\":\"Y\",\"name\":\"KHADAFI SQUARE\"},{\"code\":\"SS20\",\"default\":\"Y\",\"name\":\"SIR EDGAR LAURENT ST.\"},{\"code\":\"SS21\",\"default\":\"Y\",\"name\":\"AIL DORE ST.\"},{\"code\":\"SS23\",\"default\":\"Y\",\"name\":\"PERIMBE ST.\"},{\"code\":\"SS24\",\"default\":\"Y\",\"name\":\"MAULANA ABDOOL RASHID NAWAB ST\"},{\"code\":\"SS25\",\"default\":\"Y\",\"name\":\"PELLEGRIN ST.\"},{\"code\":\"SS26\",\"default\":\"Y\",\"name\":\"NYON ST.\"},{\"code\":\"SS27\",\"default\":\"Y\",\"name\":\"CALCUTTA ST\"},{\"code\":\"SS28\",\"default\":\"Y\",\"name\":\"TRICHNAPOLY ST\"},{\"code\":\"SS29\",\"default\":\"Y\",\"name\":\"MARIAMEN TEMPLE\"},{\"code\":\"SS3\",\"default\":\"Y\",\"name\":\"DR HASSEN SAKIR ST\"},{\"code\":\"SS30\",\"default\":\"Y\",\"name\":\"MAURITIUS TELECOM\"},{\"code\":\"SS31\",\"default\":\"Y\",\"name\":\"ROYAL ROAD\"},{\"code\":\"SS32\",\"default\":\"Y\",\"name\":\"MARATHA STREET\"},{\"code\":\"SS33\",\"default\":\"Y\",\"name\":\"ROUTE DES PAMPLEMOUSSES\"},{\"code\":\"SS34\",\"default\":\"Y\",\"name\":\"MARCELIN SAVRIMOOTOO\"},{\"code\":\"SS35\",\"default\":\"Y\",\"name\":\"NHDC HOUSING COMPLEX\"},{\"code\":\"SS4\",\"default\":\"Y\",\"name\":\"I BACOSS SOBDAR\"},{\"code\":\"SS5\",\"default\":\"Y\",\"name\":\"MAGON ST\"},{\"code\":\"SS9\",\"default\":\"Y\",\"name\":\"CANABADY ST\"}]},\"postalCodes\":{\"postalCode\":[{\"code\":\"560093\",\"name\":\"560093\",\"default\":\"Y\"}]}}]},\"postOffices\":{\"postOffice\":[{\"code\":\"234\",\"name\":\"234\",\"default\":\"Y\"}]}},{\"code\":\"L2\",\"subLocalities\":{\"subLocality\":[{\"code\":\"AAA\",\"name\":\"PLAISANCE\",\"streets\":{\"street\":[{\"code\":\"SS1\",\"default\":\"Y\",\"name\":\"ROYAL ROAD\"},{\"code\":\"SS2\",\"default\":\"Y\",\"name\":\"SSR AIRPORT\"}]},\"postalCodes\":{\"postalCode\":[{\"code\":\"45345363\",\"name\":\"45345363\",\"default\":\"Y\"}]}}]},\"postOffices\":{\"postOffice\":[{\"code\":\"342\",\"name\":\"342\",\"default\":\"Y\"}]}},{\"code\":\"L3\",\"postOffices\":{\"postOffice\":[{\"code\":\"54564\",\"name\":\"54564\",\"default\":\"Y\"}]}},{\"code\":\"L4\",\"postOffices\":{\"postOffice\":[{\"code\":\"345435\",\"name\":\"345435\",\"default\":\"Y\"}]}},{\"code\":\"L5\"},{\"code\":\"L6\"},{\"code\":\"L7\"},{\"code\":\"L8\"},{\"code\":\"L9\"},{\"code\":\"L10\"},{\"code\":\"L11\"},{\"code\":\"L12\"},{\"code\":\"L13\"},{\"code\":\"L14\"},{\"code\":\"L15\"},{\"code\":\"L16\"},{\"code\":\"L17\"},{\"code\":\"L18\"},{\"code\":\"L19\",\"subLocalities\":{\"subLocality\":[{\"code\":\"PV\",\"name\":\"PLAINE VERTE\",\"streets\":{\"street\":[{\"code\":\"SS1\",\"name\":\"AIL DORE\"},{\"code\":\"SS10\",\"name\":\"MADAD UL ISLAM ST.\"},{\"code\":\"SS11\",\"name\":\"GORAH ISSAC ST.\",\"default\":\"Y\"},{\"code\":\"SS12\",\"name\":\"DIEGO GARCIA ST.\"},{\"code\":\"SS13\",\"name\":\"IMAM BACOSSE SOBDAR ST.\"},{\"code\":\"SS14\",\"name\":\"BON ENFANT ST.\"},{\"code\":\"SS15\",\"name\":\"BENARES ST.\"}]}},{\"code\":\"PV1\",\"name\":\"PLAINE VERTE1\",\"default\":\"Y\",\"streets\":{\"street\":[{\"code\":\"SS17\",\"name\":\"DR HASSEN SAKIR ST.\"},{\"code\":\"SS18\",\"name\":\"RUCHPAUL ST.\"},{\"code\":\"SS19\",\"name\":\"ALLEPPO ST.\"},{\"code\":\"SS2\",\"default\":\"Y\",\"name\":\"KHADAFI SQUARE\"},{\"code\":\"SS20\",\"default\":\"Y\",\"name\":\"SIR EDGAR LAURENT ST.\"},{\"code\":\"SS21\",\"default\":\"Y\",\"name\":\"AIL DORE ST.\"},{\"code\":\"SS23\",\"default\":\"Y\",\"name\":\"PERIMBE ST.\"},{\"code\":\"SS24\",\"default\":\"Y\",\"name\":\"MAULANA ABDOOL RASHID NAWAB ST\"},{\"code\":\"SS25\",\"default\":\"Y\",\"name\":\"PELLEGRIN ST.\"},{\"code\":\"SS26\",\"default\":\"Y\",\"name\":\"NYON ST.\"},{\"code\":\"SS27\",\"default\":\"Y\",\"name\":\"CALCUTTA ST\"},{\"code\":\"SS28\",\"default\":\"Y\",\"name\":\"TRICHNAPOLY ST\"},{\"code\":\"SS29\",\"default\":\"Y\",\"name\":\"MARIAMEN TEMPLE\"},{\"code\":\"SS3\",\"default\":\"Y\",\"name\":\"DR HASSEN SAKIR ST\"},{\"code\":\"SS30\",\"default\":\"Y\",\"name\":\"MAURITIUS TELECOM\"},{\"code\":\"SS31\",\"default\":\"Y\",\"name\":\"ROYAL ROAD\"},{\"code\":\"SS32\",\"default\":\"Y\",\"name\":\"MARATHA STREET\"},{\"code\":\"SS33\",\"default\":\"Y\",\"name\":\"ROUTE DES PAMPLEMOUSSES\"},{\"code\":\"SS34\",\"default\":\"Y\",\"name\":\"MARCELIN SAVRIMOOTOO\"},{\"code\":\"SS35\",\"default\":\"Y\",\"name\":\"NHDC HOUSING COMPLEX\"},{\"code\":\"SS4\",\"default\":\"Y\",\"name\":\"I BACOSS SOBDAR\"},{\"code\":\"SS5\",\"default\":\"Y\",\"name\":\"MAGON ST\"},{\"code\":\"SS9\",\"default\":\"Y\",\"name\":\"CANABADY ST\"}]},\"postalCodes\":{\"postalCode\":[{\"code\":\"560093\",\"name\":\"560093\",\"default\":\"Y\"}]}}]},\"postOffices\":{\"postOffice\":[{\"code\":\"234\",\"name\":\"234\",\"default\":\"Y\"}]}},{\"code\":\"L20\"},{\"code\":\"L21\"},{\"code\":\"L22\"},{\"code\":\"L23\"},{\"code\":\"L24\"},{\"code\":\"L25\"},{\"code\":\"L26\"},{\"code\":\"L27\"},{\"code\":\"L28\"},{\"code\":\"L29\"},{\"code\":\"L30\"},{\"code\":\"L31\"},{\"code\":\"L32\"},{\"code\":\"L33\"},{\"code\":\"L34\"},{\"code\":\"L35\"},{\"code\":\"L36\"},{\"code\":\"L37\"},{\"code\":\"L38\"},{\"code\":\"L39\"},{\"code\":\"L40\"},{\"code\":\"L41\"},{\"code\":\"L42\"},{\"code\":\"L43\"},{\"code\":\"L44\"},{\"code\":\"L45\"},{\"code\":\"L46\"},{\"code\":\"L47\"},{\"code\":\"L48\"},{\"code\":\"L49\"},{\"code\":\"L50\"},{\"code\":\"L51\"},{\"code\":\"L52\"},{\"code\":\"L53\"},{\"code\":\"L54\"},{\"code\":\"L55\"},{\"code\":\"L56\"},{\"code\":\"L57\"},{\"code\":\"L58\"},{\"code\":\"L59\"},{\"code\":\"L60\"},{\"code\":\"L61\"},{\"code\":\"L62\"},{\"code\":\"L63\"},{\"code\":\"L64\"},{\"code\":\"L65\"},{\"code\":\"L66\"},{\"code\":\"L68\"},{\"code\":\"L69\"},{\"code\":\"L70\"},{\"code\":\"L71\"},{\"code\":\"L72\"},{\"code\":\"L73\"},{\"code\":\"L74\"},{\"code\":\"L75\"},{\"code\":\"L77\"},{\"code\":\"L78\"},{\"code\":\"L79\"},{\"code\":\"L80\"},{\"code\":\"L81\"},{\"code\":\"L82\"},{\"code\":\"L83\"},{\"code\":\"L84\"},{\"code\":\"L85\"},{\"code\":\"L86\"},{\"code\":\"L87\"},{\"code\":\"L88\"},{\"code\":\"L89\"},{\"code\":\"L90\"},{\"code\":\"L91\"},{\"code\":\"L92\"},{\"code\":\"L94\"},{\"code\":\"L95\"},{\"code\":\"L96\"},{\"code\":\"L97\"},{\"code\":\"L98\"},{\"code\":\"L99\"},{\"code\":\"L100\"},{\"code\":\"L102\"},{\"code\":\"L103\"},{\"code\":\"L104\"},{\"code\":\"L105\"},{\"code\":\"L106\"},{\"code\":\"L107\"},{\"code\":\"L108\"},{\"code\":\"L109\"},{\"code\":\"L110\"},{\"code\":\"L111\"},{\"code\":\"L112\"},{\"code\":\"L113\"},{\"code\":\"L114\"},{\"code\":\"L115\"},{\"code\":\"L116\"},{\"code\":\"L117\"},{\"code\":\"L118\"},{\"code\":\"L119\"},{\"code\":\"L120\"},{\"code\":\"L121\"},{\"code\":\"L122\"},{\"code\":\"L123\"},{\"code\":\"L124\"},{\"code\":\"L125\"},{\"code\":\"L126\"},{\"code\":\"L127\"},{\"code\":\"L128\"},{\"code\":\"L130\"},{\"code\":\"L131\"},{\"code\":\"L132\"},{\"code\":\"L133\"},{\"code\":\"L134\"},{\"code\":\"L135\"},{\"code\":\"L136\"},{\"code\":\"L137\"},{\"code\":\"L138\"},{\"code\":\"L139\"},{\"code\":\"L140\"},{\"code\":\"L141\"},{\"code\":\"L142\"},{\"code\":\"L143\"},{\"code\":\"L144\"},{\"code\":\"L145\"},{\"code\":\"L146\"},{\"code\":\"L147\"},{\"code\":\"L148\"},{\"code\":\"L149\"},{\"code\":\"L150\"},{\"code\":\"L152\"},{\"code\":\"L153\"},{\"code\":\"L154\"},{\"code\":\"L156\"},{\"code\":\"L157\"},{\"code\":\"L158\"},{\"code\":\"L159\"},{\"code\":\"L160\"},{\"code\":\"L161\"},{\"code\":\"L162\"},{\"code\":\"L163\"},{\"code\":\"L164\"},{\"code\":\"L165\"},{\"code\":\"L166\"},{\"code\":\"L167\"},{\"code\":\"L168\"},{\"code\":\"L169\"},{\"code\":\"L170\"},{\"code\":\"L171\"},{\"code\":\"L172\"},{\"code\":\"L173\"},{\"code\":\"L174\"},{\"code\":\"L176\"},{\"code\":\"L177\"},{\"code\":\"L178\"},{\"code\":\"L179\"},{\"code\":\"L180\"},{\"code\":\"L181\"},{\"code\":\"L182\"},{\"code\":\"L183\"},{\"code\":\"L185\"},{\"code\":\"L186\"},{\"code\":\"L187\"},{\"code\":\"L188\"},{\"code\":\"L189\"},{\"code\":\"L190\"},{\"code\":\"L191\"},{\"code\":\"L192\"},{\"code\":\"L193\"},{\"code\":\"L194\"},{\"code\":\"L195\"},{\"code\":\"L196\"},{\"code\":\"L197\"},{\"code\":\"L198\"},{\"code\":\"L199\"},{\"code\":\"L200\"},{\"code\":\"L201\"}]},\"masterData\":{\"mobileMoneyAccounts\":{\"mobileMoneyAccount\":[{\"code\":\"Y\",\"name\":\"Yes\"},{\"code\":\"N\",\"name\":\"No\",\"default\":\"Y\"}]},\"chargeType\":[{\"code\":\"CREDIT\",\"name\":\"credit\"},{\"code\":\"DEBIT\",\"name\":\"debit\"}],\"CustomerCategory\":{\"customerCategory\":[{\"code\":\"H\",\"name\":\"High\"},{\"code\":\"M\",\"name\":\"Medium\"},{\"code\":\"L\",\"name\":\"Low\"}]},\"actionLevels\":{\"actionLevel\":[{\"code\":\"5\",\"name\":\"Five\"},{\"code\":\"10\",\"name\":\"Ten\"},{\"code\":\"15\",\"name\":\"Fifteen\"}],\"actionLevelUnit\":[{\"code\":\"WW\",\"name\":\"Weeks\"},{\"code\":\"DD\",\"name\":\"Days\"},{\"code\":\"HH\",\"name\":\"Hours\"},{\"code\":\"MM\",\"name\":\"Minutes\"}]},\"activityTypes\":{\"activityType\":[{\"code\":\"REGSAVE\",\"name\":\"Registration SAVE\"},{\"code\":\"CNFRMREG\",\"name\":\"Confirm Registration\"},{\"code\":\"REGPYMNT\",\"name\":\"Make Registration Payment\"}]},\"actions\":{\"action\":[{\"code\":\"NTIFCN\",\"name\":\"Notification\"},{\"code\":\"REQCNCL\",\"name\":\"Request Cancel\"}]},\"roleTypes\":{\"roleType\":[{\"code\":\"Customer\",\"name\":\"Customer\"},{\"code\":\"Customer Contact\",\"name\":\"Customer Contact\"},{\"code\":\"Customer Account\",\"name\":\"Customer Account\"},{\"code\":\"Customer Referral\",\"name\":\"Customer Referral\"},{\"code\":\"Delivery Customer Role Type\",\"name\":\"Delivery Customer Role Type\"},{\"code\":\"SRVCUSR\",\"name\":\"Service User\"}]},\"partyTypes\":{\"partyType\":[{\"code\":\"I\",\"name\":\"Individual\",\"default\":\"Y\",\"categories\":{\"category\":[{\"code\":\"IND\",\"name\":\"INDIVIDUAL\",\"subCategories\":{\"subCategory\":[{\"code\":\"FRE\",\"name\":\"FOREIGN EXPARTRIATE\"},{\"code\":\"MST\",\"name\":\"MTN STAFF\"},{\"code\":\"OTH\",\"name\":\"OTHERS\"},{\"code\":\"SCS\",\"name\":\"SME CEO STARTUP\"},{\"code\":\"SEM\",\"name\":\"SELF EMPLOYED \"},{\"code\":\"VCC\",\"name\":\"VIP CORPORATE CEO\"},{\"code\":\"VDI\",\"name\":\"VIP DIPLOMAT\"},{\"code\":\"VFE\",\"name\":\"VIP FOREIGN EXPATRIATE\"},{\"code\":\"VGO\",\"name\":\"VIP GOVERNMENT OFFICIAL\"},{\"code\":\"VSC\",\"name\":\"VIP SME CEO \"}]}}]}},{\"code\":\"B\",\"name\":\"Corporate\",\"categories\":{\"category\":[{\"code\":\"CORP\",\"name\":\"CORPORATE\",\"subCategories\":{\"subCategory\":[{\"code\":\"CAS\",\"name\":\"CLUB OR ASSOCIATION\",\"isVatNonMandatory\":\"Y\"},{\"code\":\"GIM\",\"name\":\"GOVT INSTITUTION AND MINISTRY\"},{\"code\":\"HVS\",\"name\":\"HIGH VALUE SME\",\"isVatNonMandatory\":\"Y\"},{\"code\":\"KAC\",\"name\":\"KEY ACCOUNT\"},{\"code\":\"KGI\",\"name\":\"KEY GOVT INSTITUTION\"},{\"code\":\"LCO\",\"name\":\"LARGE CORPORATE\"},{\"code\":\"LCP\",\"name\":\"LARGE CO OPERATIVE\"},{\"code\":\"LEC\",\"name\":\"LARGE EMBASSY AND CONSULATE\"},{\"code\":\"LIN\",\"name\":\"LARGE INTERNATIONAL NGO\"},{\"code\":\"LLN\",\"name\":\"LARGE LOCAL NGO\"},{\"code\":\"MCO\",\"name\":\"MEDIUM CORPORATE\"},{\"code\":\"MCP\",\"name\":\"MEDIUM CO OPERATIVE\"},{\"code\":\"MEC\",\"name\":\"MEDIUM EMBASSY AND CONSULATE\"},{\"code\":\"MIN\",\"name\":\"MEDIUM INTERNATIONAL NGO\"},{\"code\":\"MLG\",\"name\":\"MAIRIE AND LOCAL GOVT\"},{\"code\":\"MLN\",\"name\":\"MEDIUM LOCAL NGO\"},{\"code\":\"MTS\",\"name\":\"MTN TEST SIM\"},{\"code\":\"PPSC\",\"name\":\"POLITICAL PARTY OR SMALL CO OP\"},{\"code\":\"ROM\",\"name\":\"ROAMING\"},{\"code\":\"SNG\",\"name\":\"SMALL NGO\"},{\"code\":\"STF\",\"name\":\"STAFF\"},{\"code\":\"STP\",\"name\":\"SME OR STARTUP\"}]}}]}}]},\"purposes\":{\"purpose\":[{\"code\":\"Corporate\",\"name\":\"Corporate ID\"},{\"code\":\"Proof Identity\",\"name\":\"Proof Identity\"},{\"code\":\"NIU\",\"name\":\"NIU\"}]},\"documentTypes\":{\"documentType\":[{\"code\":\"BRN\",\"name\":\"BUSINESS REGISTRATION NUMBER\"},{\"code\":\"NIC\",\"name\":\"NATIONAL ID CARD\"},{\"code\":\"OTHERS\",\"name\":\"OTHERS\"},{\"code\":\"PSP\",\"name\":\"PASSPORT\"}]},\"riskCategories\":{\"riskCategory\":[{\"code\":\"HIGH\",\"name\":\"HIGH RISK CATEGORY\"},{\"code\":\"LOW\",\"name\":\"LOW RISK CATEGORY\"},{\"code\":\"MED\",\"name\":\"MEDIUM RISK CATEGORY\"}]},\"departments\":{\"department\":[{\"code\":\"ATACORA\",\"name\":\"ATACORA\"},{\"code\":\"BORGOU\",\"name\":\"BORGOU\"}]},\"simUsages\":{\"simUsage\":[{\"code\":\"INTERNET\",\"name\":\"Internet\"},{\"code\":\"VOIX\",\"name\":\"VOIX\"},{\"code\":\"MOBILE MONEY\",\"name\":\"Mobile Money\"}]},\"towns\":{\"town\":[{\"code\":\"ABOMEY\",\"name\":\"ABOMEY\"},{\"code\":\"COBLY\",\"name\":\"COBLY\"}]},\"tutorIdTypes\":{\"tutorIdType\":[{\"code\":\"NATIONAL ID CARD\",\"name\":\"Natioanl Id Card\"},{\"code\":\"BIOMETRIC PASSPORT\",\"name\":\"Biometric Passport\"},{\"code\":\"PARENT AUTHORIZATION\",\"name\":\"Parental Authorization\"}]},\"sourceOfIncomes\":{\"sourceOfIncome\":[{\"code\":\"salary\",\"name\":\"salary\"},{\"code\":\"maintenance\",\"name\":\"maintenance\"},{\"code\":\"commission\",\"name\":\"commission\"}]},\"maritalStatuses\":{\"maritalStatus\":[{\"code\":\"S\",\"name\":\"Single\"},{\"code\":\"M\",\"name\":\"Married\"}]},\"languages\":{\"language\":[{\"code\":\"en-US\",\"name\":\"US English\"},{\"code\":\"ENG\",\"name\":\"ENGLISH\",\"default\":\"Y\"},{\"code\":\"HI\",\"name\":\"HINDI\"},{\"code\":\"FRN\",\"name\":\"FRENCH\"},{\"code\":\"CRE\",\"name\":\"CREOLE\"},{\"code\":\"CHI\",\"name\":\"CHINESE\"}]},\"hobbies\":{\"hobby\":[{\"code\":\"PG\",\"name\":\"Playing Games\"},{\"code\":\"RB\",\"name\":\"Reading Books\"}]},\"titles\":{\"title\":[{\"code\":\"DR\",\"name\":\"DR\"},{\"code\":\"MR\",\"name\":\"MR\"},{\"code\":\"MISS\",\"name\":\"MISS\"},{\"code\":\"MRS\",\"name\":\"MRS\"},{\"code\":\"MASTER\",\"name\":\"MASTER\"},{\"code\":\"HON\",\"name\":\"HON\"},{\"code\":\"OTHERS\",\"name\":\"OTHERS\"}]},\"suffixes\":{\"suffix\":[{\"code\":\"SR\",\"name\":\"SR\"},{\"code\":\"JR\",\"name\":\"JR\"}]},\"preferredTimes\":{\"preferredTime\":[{\"code\":\"11 AM\",\"name\":\"11 AM\"},{\"code\":\"8 PM\",\"name\":\"8 PM\"}]},\"preferredModeOfCommunications\":{\"preferredModeOfCommunication\":[{\"code\":\"Email\",\"name\":\"Email\"},{\"code\":\"SMS\",\"name\":\"SMS\"},{\"code\":\"Phone\",\"name\":\"Phone\",\"default\":\"Y\"},{\"code\":\"Post\",\"name\":\"Post\"}]},\"billDispatchModes\":{\"billDispatchMode\":[{\"code\":\"Post\",\"name\":\"Post\",\"default\":\"Y\"},{\"code\":\"Email\",\"name\":\"Email\"},{\"code\":\"Fax\",\"name\":\"Fax\"},{\"code\":\"InPerson\",\"name\":\"InPerson\"}]},\"addressTypes\":{\"addressType\":[{\"code\":\"Residence\",\"name\":\"Residence\",\"addressLevel\":\"Profile\",\"partyType\":{\"masterCode\":\"I\"},\"default\":\"Y\"},{\"code\":\"Permanent\",\"name\":\"Permanent\",\"addressLevel\":\"Profile\",\"partyType\":{\"masterCode\":\"I\"}},{\"code\":\"Office\",\"name\":\"Office\",\"addressLevel\":\"Profile\",\"partyType\":{\"masterCode\":\"B\"}},{\"code\":\"Billing\",\"name\":\"Billing\",\"addressLevel\":\"Account\"},{\"code\":\"4\",\"name\":\"Service / Installation Address\",\"addressLevel\":\"Service\"},{\"code\":\"6\",\"name\":\"Delivery\",\"addressLevel\":\"Request\"}],\"virtualIndividualAddressType\":[{\"code\":\"Residence\",\"name\":\"Residence\",\"addressLevel\":\"Profile\",\"partyType\":{\"masterCode\":\"I\"},\"default\":\"Y\"},{\"code\":\"Permanent\",\"name\":\"Permanent\",\"addressLevel\":\"Profile\",\"partyType\":{\"masterCode\":\"I\"}}]},\"premises\":{\"premise\":[{\"code\":\"OWNED\",\"name\":\"Owned\"},{\"code\":\"RENTED\",\"name\":\"Rented\"}]},\"highestQualifications\":{\"highestQualification\":[{\"code\":\"ASD\",\"name\":\"Associated Degree\"},{\"code\":\"BHE\",\"name\":\"Bachelor\"},{\"code\":\"DEG\",\"name\":\"Degree\"},{\"code\":\"DIP\",\"name\":\"Diploma\"},{\"code\":\"GD\",\"name\":\"Graduate\"},{\"code\":\"HSC\",\"name\":\"Some High School\"},{\"code\":\"MAS\",\"name\":\"Master\"},{\"code\":\"PHD\",\"name\":\"PhD\"},{\"code\":\"UED\",\"name\":\"Uneducated\"}]},\"contactTypes\":{\"contactType\":[{\"code\":\"Primary\",\"name\":\"Primary\"},{\"code\":\"Secondary\",\"name\":\"Secondary\"}]},\"nationalities\":{\"nationality\":[{\"code\":\"BOTSWANAN \",\"name\":\"BOTSWANAN \"},{\"code\":\"BRAZILIAN\",\"name\":\"BRAZILIAN\"},{\"code\":\"MAURITIAN\",\"name\":\"MAURITIAN\",\"default\":\"Y\"},{\"code\":\"BHUTANESE\",\"name\":\"BHUTANESE\"},{\"code\":\"BOSNIAN\",\"name\":\"BOSNIAN\"},{\"code\":\"BOUVET\",\"name\":\"BOUVET\"},{\"code\":\"BRITISH\",\"name\":\"BRITISH\"},{\"code\":\"BULGARIAN\",\"name\":\"BULGARIAN\"},{\"code\":\"BURUNDIAN\",\"name\":\"BURUNDIAN\"},{\"code\":\"CAMBODIAN\",\"name\":\"CAMBODIAN\"},{\"code\":\"CANADIAN\",\"name\":\"CANADIAN\"},{\"code\":\"CAYMANIAN \",\"name\":\"CAYMANIAN \"},{\"code\":\"CENTRAL AFRICAN\",\"name\":\"CENTRAL AFRICAN\"},{\"code\":\"AUSTRALIA\",\"name\":\"AUSTRALIA\"},{\"code\":\"COCOS ISLANDER\",\"name\":\"COCOS ISLANDER\"},{\"code\":\"CONGOLESE\",\"name\":\"CONGOLESE\"},{\"code\":\"NEW ZEALAND\",\"name\":\"NEW ZEALAND\"},{\"code\":\"IVOIRIAN\",\"name\":\"IVOIRIAN\"},{\"code\":\"CROATIAN\",\"name\":\"CROATIAN\"},{\"code\":\"DANISH\",\"name\":\"DANISH\"},{\"code\":\"DJIBOUTIAN\",\"name\":\"DJIBOUTIAN\"},{\"code\":\"DOMINICAN\",\"name\":\"DOMINICAN\"},{\"code\":\"EGYPTIAN\",\"name\":\"EGYPTIAN\"},{\"code\":\"SPANISH\",\"name\":\"SPANISH\"},{\"code\":\"ESTONIAN\",\"name\":\"ESTONIAN\"},{\"code\":\"BRITISH \",\"name\":\"BRITISH \"},{\"code\":\"FIJIAN\",\"name\":\"FIJIAN\"},{\"code\":\"FINNISH\",\"name\":\"FINNISH\"},{\"code\":\"FRENCH\",\"name\":\"FRENCH\"},{\"code\":\"GAMBIAN\",\"name\":\"GAMBIAN\"},{\"code\":\"GERMAN\",\"name\":\"GERMAN\"},{\"code\":\"GREENLANDER\",\"name\":\"GREENLANDER\"},{\"code\":\"FRENCH \",\"name\":\"FRENCH \"},{\"code\":\"GUATEMALAN\",\"name\":\"GUATEMALAN\"},{\"code\":\"GUINEAN\",\"name\":\"GUINEAN\"},{\"code\":\"GUYANESE\",\"name\":\"GUYANESE\"},{\"code\":\"HEARD\",\"name\":\"HEARD\"},{\"code\":\"CHINESE \",\"name\":\"CHINESE \"},{\"code\":\"ICELANDIC\",\"name\":\"ICELANDIC\"},{\"code\":\"INDONESIAN\",\"name\":\"INDONESIAN\"},{\"code\":\"IRANIAN\",\"name\":\"IRANIAN\"},{\"code\":\"ISRAELI \",\"name\":\"ISRAELI \"},{\"code\":\"JAMAICAN\",\"name\":\"JAMAICAN\"},{\"code\":\"JORDANIAN\",\"name\":\"JORDANIAN\"},{\"code\":\"KENYAN\",\"name\":\"KENYAN\"},{\"code\":\"KIRIBATI \",\"name\":\"KIRIBATI \"},{\"code\":\"KOREAN\",\"name\":\"KOREAN\"},{\"code\":\"LAOTIAN\",\"name\":\"LAOTIAN\"},{\"code\":\"LEBANESE\",\"name\":\"LEBANESE\"},{\"code\":\"LIBERIAN\",\"name\":\"LIBERIAN\"},{\"code\":\"LIBYAN\",\"name\":\"LIBYAN\"},{\"code\":\"EU CITIZENS\",\"name\":\"EU CITIZENS\"},{\"code\":\"PORTUGUESE\",\"name\":\"PORTUGUESE\"},{\"code\":\"MACEDONIAN\",\"name\":\"MACEDONIAN\"},{\"code\":\"MALDIVIAN\",\"name\":\"MALDIVIAN\"},{\"code\":\"MALTESE\",\"name\":\"MALTESE\"},{\"code\":\"MARSHALLESE \",\"name\":\"MARSHALLESE \"},{\"code\":\"MAHORAN\",\"name\":\"MAHORAN\"},{\"code\":\"MICRONESIAN\",\"name\":\"MICRONESIAN\"},{\"code\":\" MONACAN\",\"name\":\" MONACAN\"},{\"code\":\"MONGOLIAN\",\"name\":\"MONGOLIAN\"},{\"code\":\"MOROCCAN\",\"name\":\"MOROCCAN\"},{\"code\":\"BURMESE\",\"name\":\"BURMESE\"},{\"code\":\"NAURUAN\",\"name\":\"NAURUAN\"},{\"code\":\"NEPALESE\",\"name\":\"NEPALESE\"},{\"code\":\"DUTCH\",\"name\":\"DUTCH\"},{\"code\":\"NICARAGUAN\",\"name\":\"NICARAGUAN\"},{\"code\":\"NIUEAN\",\"name\":\"NIUEAN\"},{\"code\":\"SWEDISH\",\"name\":\"SWEDISH\"},{\"code\":\"AFGHAN\",\"name\":\"AFGHAN\"},{\"code\":\"ALBANIAN\",\"name\":\"ALBANIAN\"},{\"code\":\"ALGERIAN\",\"name\":\"ALGERIAN\"},{\"code\":\"AMERICAN \",\"name\":\"AMERICAN \"},{\"code\":\"ANDORRAN\",\"name\":\"ANDORRAN\"},{\"code\":\"ANGOLAN\",\"name\":\"ANGOLAN\"},{\"code\":\"ARGENTINE \",\"name\":\"ARGENTINE \"},{\"code\":\"ANTIGUAN\",\"name\":\"ANTIGUAN\"},{\"code\":\"ARGENTINIAN\",\"name\":\"ARGENTINIAN\"},{\"code\":\"ARMENIAN\",\"name\":\"ARMENIAN\"},{\"code\":\"AUSTRALIAN\",\"name\":\"AUSTRALIAN\"},{\"code\":\"AUSTRIAN\",\"name\":\"AUSTRIAN\"},{\"code\":\"AZERBAIJANI\",\"name\":\"AZERBAIJANI\"},{\"code\":\"BAHAMIAN\",\"name\":\"BAHAMIAN\"},{\"code\":\"BAHRAINI\",\"name\":\"BAHRAINI\"},{\"code\":\"BANGLADESHI\",\"name\":\"BANGLADESHI\"},{\"code\":\"BARBADIAN\",\"name\":\"BARBADIAN\"},{\"code\":\"BELARUSIAN\",\"name\":\"BELARUSIAN\"},{\"code\":\"BELGIAN\",\"name\":\"BELGIAN\"},{\"code\":\"BELIZEAN\",\"name\":\"BELIZEAN\"},{\"code\":\"BENINESE\",\"name\":\"BENINESE\"},{\"code\":\"BERMUDIAN\",\"name\":\"BERMUDIAN\"},{\"code\":\"BOLIVIAN\",\"name\":\"BOLIVIAN\"},{\"code\":\"TURKS\",\"name\":\"TURKS\"},{\"code\":\"TUVALUAN\",\"name\":\"TUVALUAN\"},{\"code\":\"UGANDAN\",\"name\":\"UGANDAN\"},{\"code\":\"UKRAINIAN\",\"name\":\"UKRAINIAN\"},{\"code\":\"EMIRATI\",\"name\":\"EMIRATI\"},{\"code\":\"US\",\"name\":\"US\"},{\"code\":\"AMERICAN \",\"name\":\"AMERICAN \"},{\"code\":\"URUGUAYAN\",\"name\":\"URUGUAYAN\"},{\"code\":\"UZBEK\",\"name\":\"UZBEK\"},{\"code\":\"VANUATUAN\",\"name\":\"VANUATUAN\"},{\"code\":\"ITALIAN\",\"name\":\"ITALIAN\"},{\"code\":\"VENEZUELAN\",\"name\":\"VENEZUELAN\"},{\"code\":\"VIETNAMESE\",\"name\":\"VIETNAMESE\"},{\"code\":\"AMERICAN\",\"name\":\"AMERICAN\"},{\"code\":\"POLYNESIANS\",\"name\":\"POLYNESIANS\"},{\"code\":\"SAHRAWI ARAB\",\"name\":\"SAHRAWI ARAB\"},{\"code\":\"YEMENI\",\"name\":\"YEMENI\"},{\"code\":\"ZAMBIAN\",\"name\":\"ZAMBIAN\"},{\"code\":\"ZIMBABWEAN\",\"name\":\"ZIMBABWEAN\"},{\"code\":\"NORWEGIAN\",\"name\":\"NORWEGIAN\"},{\"code\":\"PAKISTANI\",\"name\":\"PAKISTANI\"},{\"code\":\"PALAUANS \",\"name\":\"PALAUANS \"},{\"code\":\"PANAMANIAN\",\"name\":\"PANAMANIAN\"},{\"code\":\"PERUVIAN\",\"name\":\"PERUVIAN\"},{\"code\":\"PITCAIRN ISLANDER\",\"name\":\"PITCAIRN ISLANDER\"},{\"code\":\"QATARI\",\"name\":\"QATARI\"},{\"code\":\"RÉUNIONESE\",\"name\":\"RÉUNIONESE\"},{\"code\":\"RUSSIAN\",\"name\":\"RUSSIAN\"},{\"code\":\"ROMAN\",\"name\":\"ROMAN\"},{\"code\":\"SAMOAN\",\"name\":\"SAMOAN\"},{\"code\":\"SAMMARINESE\",\"name\":\"SAMMARINESE\"},{\"code\":\"SAUDI ARABIAN \",\"name\":\"SAUDI ARABIAN \"},{\"code\":\"SERB \",\"name\":\"SERB \"},{\"code\":\"SIERRA LEONIAN\",\"name\":\"SIERRA LEONIAN\"},{\"code\":\"BRUNEIAN\",\"name\":\"BRUNEIAN\"},{\"code\":\"BURKINESE\",\"name\":\"BURKINESE\"},{\"code\":\"CAMEROONIAN\",\"name\":\"CAMEROONIAN\"},{\"code\":\" CAPE VERDEAN\",\"name\":\" CAPE VERDEAN\"},{\"code\":\"CHADIAN\",\"name\":\"CHADIAN\"},{\"code\":\"CHILEAN\",\"name\":\"CHILEAN\"},{\"code\":\"CHINESE\",\"name\":\"CHINESE\"},{\"code\":\"COLOMBIAN\",\"name\":\"COLOMBIAN\"},{\"code\":\"COSTA RICAN\",\"name\":\"COSTA RICAN\"},{\"code\":\"CUBAN\",\"name\":\"CUBAN\"},{\"code\":\"CYPRIOT\",\"name\":\"CYPRIOT\"},{\"code\":\"CZECH\",\"name\":\"CZECH\"},{\"code\":\"ECUADOREAN\",\"name\":\"ECUADOREAN\"},{\"code\":\"SALVADOREAN\",\"name\":\"SALVADOREAN\"},{\"code\":\"ERITREAN\",\"name\":\"ERITREAN\"},{\"code\":\"ETHIOPIAN\",\"name\":\"ETHIOPIAN\"},{\"code\":\"FAROESE \",\"name\":\"FAROESE \"},{\"code\":\"GABONESE\",\"name\":\"GABONESE\"},{\"code\":\"GEORGIAN\",\"name\":\"GEORGIAN\"},{\"code\":\"GHANAIAN\",\"name\":\"GHANAIAN\"},{\"code\":\"GREEK\",\"name\":\"GREEK\"},{\"code\":\"GRENADIAN\",\"name\":\"GRENADIAN\"},{\"code\":\"GUAMANIANS\",\"name\":\"GUAMANIANS\"},{\"code\":\"HAITIAN\",\"name\":\"HAITIAN\"},{\"code\":\"HONDURAN\",\"name\":\"HONDURAN\"},{\"code\":\"HUNGARIAN\",\"name\":\"HUNGARIAN\"},{\"code\":\"INDIAN\",\"name\":\"INDIAN\"},{\"code\":\"IRAQI\",\"name\":\"IRAQI\"},{\"code\":\"IRISH\",\"name\":\"IRISH\"},{\"code\":\"JAPANESE\",\"name\":\"JAPANESE\"},{\"code\":\"KAZAKH\",\"name\":\"KAZAKH\"},{\"code\":\"KUWAITI\",\"name\":\"KUWAITI\"},{\"code\":\"KYRGYZSTANI\",\"name\":\"KYRGYZSTANI\"},{\"code\":\"LATVIAN\",\"name\":\"LATVIAN\"},{\"code\":\"MOSOTHO \",\"name\":\"MOSOTHO \"},{\"code\":\"LIECHTENSTEIN\",\"name\":\"LIECHTENSTEIN\"},{\"code\":\"LITHUANIAN\",\"name\":\"LITHUANIAN\"},{\"code\":\"MALAGASY\",\"name\":\"MALAGASY\"},{\"code\":\"MALAWIAN\",\"name\":\"MALAWIAN\"},{\"code\":\"MALAYSIAN\",\"name\":\"MALAYSIAN\"},{\"code\":\"MALIAN\",\"name\":\"MALIAN\"},{\"code\":\"MAURITANIAN\",\"name\":\"MAURITANIAN\"},{\"code\":\"MEXICAN\",\"name\":\"MEXICAN\"},{\"code\":\"MOLDOVAN\",\"name\":\"MOLDOVAN\"},{\"code\":\"MOZAMBICAN\",\"name\":\"MOZAMBICAN\"},{\"code\":\"NAMIBIAN\",\"name\":\"NAMIBIAN\"},{\"code\":\"NEW CALEDONIAN\",\"name\":\"NEW CALEDONIAN\"},{\"code\":\"NIGERIEN\",\"name\":\"NIGERIEN\"},{\"code\":\"NIGERIAN\",\"name\":\"NIGERIAN\"},{\"code\":\"OMANI\",\"name\":\"OMANI\"},{\"code\":\"PALESTINIAN\",\"name\":\"PALESTINIAN\"},{\"code\":\"PARAGUAYAN\",\"name\":\"PARAGUAYAN\"},{\"code\":\"PHILIPPINE\",\"name\":\"PHILIPPINE\"},{\"code\":\"POLISH\",\"name\":\"POLISH\"},{\"code\":\"PUERTO RICAN\",\"name\":\"PUERTO RICAN\"},{\"code\":\"ROMANIAN\",\"name\":\"ROMANIAN\"},{\"code\":\"RWANDAN\",\"name\":\"RWANDAN\"},{\"code\":\"KITTITIAN\",\"name\":\"KITTITIAN\"},{\"code\":\"VINCENTIAN\",\"name\":\"VINCENTIAN\"},{\"code\":\" SAO TOMEAN\",\"name\":\" SAO TOMEAN\"},{\"code\":\"SENEGALESE\",\"name\":\"SENEGALESE\"},{\"code\":\"SEYCHELLOIS\",\"name\":\"SEYCHELLOIS\"},{\"code\":\"SINGAPOREAN\",\"name\":\"SINGAPOREAN\"},{\"code\":\"SLOVAK\",\"name\":\"SLOVAK\"},{\"code\":\"SLOVENE \",\"name\":\"SLOVENE \"},{\"code\":\"SOLOMON ISLANDER\",\"name\":\"SOLOMON ISLANDER\"},{\"code\":\"SOMALI\",\"name\":\"SOMALI\"},{\"code\":\"SOUTH AFRICAN\",\"name\":\"SOUTH AFRICAN\"},{\"code\":\"SOUTH GEORGIA\",\"name\":\"SOUTH GEORGIA\"},{\"code\":\"SRI LANKAN\",\"name\":\"SRI LANKAN\"},{\"code\":\"SUDANESE\",\"name\":\"SUDANESE\"},{\"code\":\"SURINAMESE\",\"name\":\"SURINAMESE\"},{\"code\":\"SVALBARD\",\"name\":\"SVALBARD\"},{\"code\":\"SWAZI\",\"name\":\"SWAZI\"},{\"code\":\"SWISS\",\"name\":\"SWISS\"},{\"code\":\"SYRIAN\",\"name\":\"SYRIAN\"},{\"code\":\"TAIWANESE\",\"name\":\"TAIWANESE\"},{\"code\":\"TAJIK \",\"name\":\"TAJIK \"},{\"code\":\"TANZANIAN\",\"name\":\"TANZANIAN\"},{\"code\":\"THAI\",\"name\":\"THAI\"},{\"code\":\"TIMORESE\",\"name\":\"TIMORESE\"},{\"code\":\"TOGOLESE\",\"name\":\"TOGOLESE\"},{\"code\":\"TOKELAUANS\",\"name\":\"TOKELAUANS\"},{\"code\":\"TONGAN\",\"name\":\"TONGAN\"},{\"code\":\"TRINIDADIAN\",\"name\":\"TRINIDADIAN\"},{\"code\":\"TUNISIAN\",\"name\":\"TUNISIAN\"},{\"code\":\"TURKISH\",\"name\":\"TURKISH\"},{\"code\":\"TURKMEN \",\"name\":\"TURKMEN \"}]},\"genders\":{\"gender\":[{\"code\":\"M\",\"name\":\"Male\"},{\"code\":\"F\",\"name\":\"Female\"}]},\"currencies\":{\"currency\":[{\"code\":\"MUR\",\"name\":\"MAURITIAN RUPEE\",\"default\":\"Y\"},{\"code\":\"USD\",\"name\":\"USD DOllar\"},{\"code\":\"XOF\",\"name\":\"XOF\"}]},\"applicationModes\":{\"applicationMode\":[{\"code\":\"1\",\"name\":\"SHOPS\"},{\"code\":\"2\",\"name\":\"CALL CENTRE\"},{\"code\":\"3\",\"name\":\"ONLINE\"},{\"code\":\"4\",\"name\":\"EMAIL\"},{\"code\":\"5\",\"name\":\"SMS\"},{\"code\":\"6\",\"name\":\"MOBILE APP\"},{\"code\":\"7\",\"name\":\"SOCIAL MEDIA\"},{\"code\":\"8\",\"name\":\"INDIRECT\"}]},\"accountTypes\":{\"accountType\":[{\"code\":\"CB\",\"name\":\"Convergent\",\"default\":\"Y\"},{\"code\":\"GSM\",\"name\":\"GSM Service\"}]},\"debitAccountTypes\":{\"debitAccountType\":[{\"code\":\"S\",\"name\":\"Savings\",\"default\":\"Y\"},{\"code\":\"C\",\"name\":\"Current\"}]},\"banks\":{\"bank\":[{\"code\":\"BRS\",\"name\":\"Bank regionale de solidarite\"},{\"code\":\"BIB\",\"name\":\"Banque internationale du Benin\"},{\"code\":\"FBB\",\"name\":\"Financial bank\"},{\"code\":\"AIB\",\"name\":\"Investissement du Benin\"},{\"code\":\"SGB\",\"name\":\"Societe Generale de banques au\"},{\"code\":\"ECO\",\"name\":\"Eco bank\"},{\"code\":\"CBB\",\"name\":\"Continental bank\"},{\"code\":\"BOA\",\"name\":\"Bank of Africa\",\"default\":\"Y\",\"branches\":{\"branch\":[{\"code\":\"1001\",\"name\":\"MGROAD 1001\",\"accounts\":{\"account\":[{\"accountNumber\":\"619161916\",\"refCode\":\"98262612\",\"refDesc\":\"AXIS BANK ACCOUNT\"}]}},{\"code\":\"C0001\",\"name\":\"MG ROAD C0001\",\"default\":\"Y\",\"accounts\":{\"account\":[{\"accountNumber\":\"4564566\",\"refCode\":\"45634563\",\"refDesc\":\"CITI BANK ACCOUNT\"},{\"accountNumber\":\"521478596532\",\"refCode\":\"865924\",\"refDesc\":\"CITI BANK ACCOUNT\"},{\"accountNumber\":\"99562623161\",\"refCode\":\"4563754\",\"refDesc\":\"CITI BANK ACCOUNT\"},{\"accountNumber\":\"10010011\",\"refCode\":\"1001001\",\"refDesc\":\"savings\"},{\"accountNumber\":\"4564566\",\"refCode\":\"999\",\"refDesc\":\"CITI BANK ACCOUNT\"},{\"accountNumber\":\"521478596532\",\"refCode\":\"888\",\"refDesc\":\"CITI BANK ACCOUNT\"},{\"accountNumber\":\"99562623161\",\"refCode\":\"777\",\"refDesc\":\"CITI BANK ACCOUNT\"},{\"accountNumber\":\"10010011\",\"refCode\":\"666\",\"refDesc\":\"savings\"}]}},{\"code\":\"C0002\",\"name\":\"RAMAMURTHY NAGAR BRANCH\",\"accounts\":{\"account\":[{\"accountNumber\":\"123456\",\"refCode\":\"998646\",\"refDesc\":\"SAVING ACCOUNT\"},{\"accountNumber\":\"456789\",\"refCode\":\"987654\",\"refDesc\":\"CURRENT ACCOUNT\"}]}}]}},{\"code\":\"DDB\",\"name\":\"Diamond bank\"},{\"code\":\"BSI\",\"name\":\"Banque Sahélo-Saharienne pour l\"},{\"code\":\"ABB\",\"name\":\"Atlantique bank Benin\"},{\"code\":\"BAU\",\"name\":\"Autres Banques\"}]},\"cardTypes\":{\"cardType\":[{\"code\":\"VISA\",\"name\":\"VISA\"},{\"code\":\"MASTERO\",\"name\":\"Master Card\",\"default\":\"Y\",\"subCategories\":{\"subCategory\":{\"code\":\"icic0000169\",\"name\":\"icic0000169\"}}}]},\"iDVerificationStatuses\":{\"iDVerificationStatus\":{\"code\":\"Verified\",\"name\":\"Verified\"}},\"blackListStatuses\":{\"blackListStatus\":[{\"code\":\"Yes\",\"name\":\"Yes\"},{\"code\":\"No\",\"name\":\"No\"},{\"code\":\"Improper bill payment\",\"name\":\"Improper bill payment\"}]},\"serviceTypes\":{\"serviceType\":[{\"code\":\"GSM\",\"name\":\"GSM SERVICE\",\"default\":\"Y\",\"technologyTypes\":{\"technologyType\":[{\"code\":\"GSM\",\"name\":\"GSM\"}]},\"subServiceTypes\":{\"subServiceType\":[{\"code\":\"Voice\",\"name\":\"Voice\",\"default\":\"Y\"},{\"code\":\"Data\",\"name\":\"Data\"}]}},{\"code\":\"ISP\",\"name\":\"ISP\",\"default\":\"N\",\"technologyTypes\":{\"technologyType\":[{\"code\":\"ISP\",\"name\":\"ISP\"}]},\"subServiceTypes\":{\"subServiceType\":[{\"code\":\"LeasedLine\",\"name\":\"LeasedLine\",\"default\":\"Y\"},{\"code\":\"FTTX\",\"name\":\"FTTX\"}]}}]},\"serviceNumberCategories\":{\"serviceNumberCategory\":[{\"code\":\"Gold\",\"name\":\"Gold\"},{\"code\":\"Silver\",\"name\":\"Silver\"}]},\"activatedVias\":{\"activatedVia\":[{\"code\":\"SP\",\"name\":\"Starter Pack\"},{\"code\":\"D\",\"name\":\"Direct\",\"default\":\"Y\"}]},\"xDirLevels\":{\"xDirLevel\":[{\"code\":\"1\",\"name\":\"Level 1\"},{\"code\":\"2\",\"name\":\"Level 2\"},{\"code\":\"3\",\"name\":\"Level 3\"},{\"code\":\"4\",\"name\":\"Level 4\"},{\"code\":\"5\",\"name\":\"Level 5\"},{\"code\":\"6\",\"name\":\"Level 6\"},{\"code\":\"7\",\"name\":\"Level 7\"},{\"code\":\"8\",\"name\":\"Level 8\"},{\"code\":\"9\",\"name\":\"Level 9\"},{\"code\":\"10\",\"name\":\"Level 10\"}]},\"regTypes\":{\"regType\":[{\"code\":\"Plan\",\"name\":\"Plan\"},{\"code\":\"SP\",\"name\":\"Starter Pack\"}]},\"businessTypes\":{\"businessType\":[{\"code\":\"Prepaid\",\"name\":\"Prepaid\"},{\"code\":\"Postpaid\",\"name\":\"Postpaid\",\"default\":\"Y\"},{\"code\":\"Hybrid\",\"name\":\"Hybrid\"}]},\"offerTypes\":{\"offerType\":[{\"code\":\"Base Offer\",\"name\":\"Base Offer\"},{\"code\":\"VAS\",\"name\":\"VAS\"},{\"code\":\"Handset Offer\",\"name\":\"Handset Offer\"}]},\"SIMCategories\":{\"SIMCategory\":[{\"code\":\"SIMP\",\"name\":\"STANDARD\"},{\"code\":\"MCR\",\"name\":\"MICRO\"},{\"code\":\"NAN\",\"name\":\"NANO\"},{\"code\":\"HYB\",\"name\":\"HYBRID\"},{\"code\":\"080\",\"name\":\"BANGALORE\"},{\"code\":\"33\",\"name\":\"SIM CATEGORY 33\"}]},\"MSISDNCategories\":{\"MSISDNCategory\":[{\"code\":\"BPOST\",\"name\":\"BRONZE POSTPAID\"},{\"code\":\"GPOST\",\"name\":\"GOLD POSTPAID\"},{\"code\":\"NPOST\",\"name\":\"NORMAL POSTPAID\"},{\"code\":\"NORM1\",\"name\":\"NORMAL PREPAID\"},{\"code\":\"NWUSE\",\"name\":\"USED FOR NETWORKS\"},{\"code\":\"PPOST\",\"name\":\"PLATINUM POSTPAID\"},{\"code\":\"NORM3\",\"name\":\"POSTPAID NORMAL 3\"},{\"code\":\"SPOST\",\"name\":\"SILVER POSTPAID\"}]},\"MSISDNSelections\":{\"MSISDNSelection\":[{\"code\":\"Manual\",\"name\":\"Manual\"},{\"code\":\"Automatic\",\"name\":\"Automatic\"},{\"code\":\"Reserved\",\"name\":\"Reserved\"}]},\"srSubStatusTypes\":{\"subStatusType\":[{\"code\":\"WOFF\",\"name\":\"Waive Off\"},{\"code\":\"IPAPPR\",\"name\":\"Paymnet Approval\"},{\"code\":\"DNNAPPR\",\"name\":\"Dunning Approval\"}]},\"srStatusTypes\":{\"statusType\":[{\"code\":\"OPEN\",\"name\":\"OPEN\",\"default\":\"Y\"},{\"code\":\"INPROGRESS\",\"name\":\"INPROGRESS\"},{\"code\":\"ONHOLD\",\"name\":\"ONHOLD\"},{\"code\":\"COMPLETED\",\"name\":\"COMPLETED\"},{\"code\":\"REJECTED\",\"name\":\"REJECTED\"},{\"code\":\"FAILED\",\"name\":\"FAILED\"},{\"code\":\"CANCELLED\",\"name\":\"CANCELLED\"}]},\"productTypes\":{\"productType\":[{\"code\":\"VAS\",\"name\":\"VAS\"},{\"code\":\"Plan\",\"name\":\"Plan\"},{\"code\":\"Handset\",\"name\":\"Handset\"}]},\"channels\":{\"channel\":[{\"code\":\"CLM\",\"name\":\"CLM\"}]},\"subsidiaries\":{\"subsidiary\":{\"code\":\"MT\",\"name\":\"Mauritius Telecom\"}},\"serviceLimitTypes\":{\"serviceLimitType\":[{\"code\":\"MUL\",\"name\":\"Monthly Usage Limit\",\"default\":\"Y\"},{\"code\":\"CL\",\"name\":\"Credit Limit\"}]},\"statusTypes\":{\"statusType\":[{\"code\":\"ACT\",\"name\":\"Active\"},{\"code\":\"INACT\",\"name\":\"Inactive\"},{\"code\":\"SUSP\",\"name\":\"Suspended\"},{\"code\":\"CNCL\",\"name\":\"Terminated\"},{\"code\":\"CNCLINP\",\"name\":\"Cancellation InProgress\"},{\"code\":\"CNCLFAIL\",\"name\":\"Cancellation Failed\"},{\"code\":\"TRFD\",\"name\":\"Transferred\"},{\"code\":\"SOSU\",\"name\":\"Soft Suspension\"},{\"code\":\"INPROGRESS\",\"name\":\"INPROGRESS\"},{\"code\":\"PENREG\",\"name\":\"PENREG\"},{\"code\":\"WAITINGFORFIRSTCALLBACK\",\"name\":\"WAITINGFORFIRSTCALLBACK\"}]},\"orderCancellationReasons\":{\"orderCancellationReason\":[{\"code\":\"Model Change\",\"name\":\"Model Change\"},{\"code\":\"Handset Defect\",\"name\":\"Handset Defect\"},{\"code\":\"Network Issue\",\"name\":\"Network Issue\"}]},\"vatCategories\":{\"vatCategory\":{\"code\":\"Registered and Responsible\",\"name\":\"Registered and Responsible\"}},\"offerStatusTypeIds\":{\"offerStatusTypeId\":[{\"code\":\"Previous Inactive Service offer\",\"name\":\"Previous Inactive Service offer\"},{\"code\":\"Inactive Service offer\",\"name\":\"Inactive Service offer\"}]},\"offerIdentificationTypeIds\":{\"offerIdentificationTypeId\":[{\"code\":\"Convergent\",\"name\":\"Convergent\"},{\"code\":\"Non-Convergent\",\"name\":\"Non-Convergent\"},{\"code\":\"Hybrid\",\"name\":\"Hybrid\"}]},\"taxTypes\":{\"taxType\":{\"code\":\"Local\",\"name\":\"Local\"}},\"taxPolicyIds\":{\"taxPolicyId\":[{\"code\":\"VATG\",\"name\":\"VAT PLAN GROUP\"},{\"code\":\"NILT\",\"name\":\"NILT PLAN GROUP\"}]},\"resourceTypes\":{\"resourceType\":[{\"code\":\"1/SIM\",\"name\":\"1/SIM\"},{\"code\":\"1/MSISDN\",\"name\":\"1/MSISDN\"}]},\"resourceCategories\":{\"resourceCategory\":{\"code\":\"Normal\",\"name\":\"Normal\"}},\"GPSSigns\":{\"GPSSign\":[{\"code\":\"EAST\",\"name\":\"East\"},{\"code\":\"WEST\",\"name\":\"West\"},{\"code\":\"NORTH\",\"name\":\"North\"},{\"code\":\"SOUTH\",\"name\":\"South\"}]},\"productIdentificationTypes\":{\"productIdentificationType\":[{\"code\":\"Mandatory\",\"name\":\"Mandatory\"},{\"code\":\"Optional\",\"name\":\"Optional\"}]},\"validityTypes\":{\"validityType\":[{\"code\":\"Days\",\"name\":\"Days\"},{\"code\":\"Months\",\"name\":\"Months\"},{\"code\":\"Years\",\"name\":\"Years\"},{\"code\":\"Life Time\",\"name\":\"Life Time\"}]},\"requestModes\":{\"requestModes\":[{\"code\":\"Email\",\"name\":\"Email\"},{\"code\":\"Walk-in\",\"name\":\"Walk-in\"},{\"code\":\"Call\",\"name\":\"Call\"},{\"code\":\"Others\",\"name\":\"Others\"}]},\"paymentOptions\":{\"paymentOption\":[{\"code\":\"PIMM\",\"name\":\"Pay Immediate\"},{\"code\":\"PWGP\",\"name\":\"Pay with in Grace Period\"}]},\"prefferedDeliveryModes\":{\"prefferedDeliveryMode\":[{\"code\":\"EXPD\",\"name\":\"Express Delivery\"},{\"code\":\"NORMD\",\"name\":\"Normal Delivery\"}]},\"deliveryCompanies\":{\"deliveryCompany\":[{\"code\":\"BLUD\",\"name\":\"Blue Dart\"},{\"code\":\"FEDEX\",\"name\":\"FEDEX\"}]},\"documentOptions\":{\"documentOption\":[{\"code\":\"POSTA\",\"name\":\"Post Activation\"},{\"code\":\"PREA\",\"name\":\"Pre Activation\"}]},\"documentStatuses\":{\"documentStatus\":[{\"code\":\"Pending\",\"name\":\"Pending\"},{\"code\":\"Uploaded\",\"name\":\"Uploaded\"},{\"code\":\"Received\",\"name\":\"Received\"},{\"code\":\"Verified\",\"name\":\"Verified\"}]},\"addressFormats\":{\"addressFormat\":[{\"code\":\"MTPA\",\"name\":\"Postal Address\"},{\"code\":\"MTBA\",\"name\":\"PO Box Address\"},{\"code\":\"MTFA\",\"name\":\"Foreign Address\"},{\"code\":\"NLGA\",\"name\":\"NLGA Address\"}]},\"requestType\":[{\"code\":\"COS\",\"name\":\"ChangeofService\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"VMS\",\"name\":\"Voice Mail service\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"COW\",\"name\":\"Change Of Ownership\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"UMDB\",\"name\":\"Update Main and Dedicated balance\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"SCPC\",\"name\":\"Self Care Profile Change\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RPWD\",\"name\":\"Reset Password\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"RSRMB\",\"name\":\"Reserve MSISDN\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"SCPC\",\"name\":\"Self Care Profile Change\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"MAGIC\",\"name\":\"Magic Number\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"MOBC\",\"name\":\"MSISDN Swap\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Frequent prank calls\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"ADN\",\"name\":\"ADD DATA NUMBER\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Frequent prank calls\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"AFN\",\"name\":\"ADD FAX NUMBER\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Frequent prank calls\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RDN\",\"name\":\"REMOVE DATA NUMBER\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Frequent prank calls\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RFN\",\"name\":\"REMOVE FAX NUMBER\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Frequent prank calls\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"SIMC\",\"name\":\"SIM Swap\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Damaged SIM\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"VAS\",\"name\":\"Add VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"GVAS\",\"name\":\"Gift VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RVAS\",\"name\":\"Remove VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PACK\",\"name\":\"Change Plan\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PRPO\",\"name\":\"Prepaid To Postpaid\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"HRPO\",\"name\":\"Prepaid To Hybrid\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"HPRT\",\"name\":\"Hybrid to Prepaid\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"HTON\",\"name\":\"Hybrid To Postpaid\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PPRT\",\"name\":\"Postpaid To Prepaid\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"}]}]},{\"code\":\"NTOH\",\"name\":\"Postpaid To Hybrid\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"}]}]},{\"code\":\"AFNF\",\"name\":\"Add Friends & Family\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"MFNF\",\"name\":\"Modify Friends & Family VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RFNF\",\"name\":\"Remove Friends & Family VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"ACUG\",\"name\":\"Add CUG\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"MCUG\",\"name\":\"Modify CUG VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"DCUG\",\"name\":\"Remove CUG VAS\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"BARUBAR\",\"name\":\"Bar Unbar Technical services\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"CONTENT\",\"name\":\"Subscriber/Un-subscriber 3rd Party Content\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"TROW\",\"name\":\"Transfer Of Service\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"APNSR\",\"name\":\"Activate/De-activate APN Service\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"DKID\",\"name\":\"De-activate KID SIM\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"AKID\",\"name\":\"Activate KID SIM\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"KMN\",\"name\":\"Keep My Number\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}]}]}},{\"code\":\"LP\",\"name\":\"Manage Loyalty Points\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"RLP\",\"name\":\"Redeem Loyalty Points\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"TLP\",\"name\":\"Transfer Loyalty Points\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"LCS\",\"name\":\"Life Cycle Status Change\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"SUSP\",\"name\":\"Suspension of Service\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]},{\"serviceType\":{\"code\":\"IPTV\"},\"serviceSubTypes\":[{\"serviceSubType\":\"IPTV\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}],\"suspensionPeriod\":[{\"code\":\"30\",\"name\":\"30daysSuspension\"},{\"code\":\"60\",\"name\":\"60daysSuspension\"},{\"code\":\"NA\",\"name\":\"Not Applicable/Lifetime\"}]},{\"code\":\"RESP\",\"name\":\"Revoke Suspension of Service\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]},{\"serviceType\":{\"code\":\"IPTV\"},\"serviceSubTypes\":[{\"serviceSubType\":\"IPTV\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"ERAS\",\"name\":\"Service Termination\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]},{\"serviceType\":{\"code\":\"IPTV\"},\"serviceSubTypes\":[{\"serviceSubType\":\"IPTV\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}]}]}},{\"code\":\"SERINF\",\"name\":\"Service Information Request\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"PINPUKREQ\",\"name\":\"PIN/PUK Request\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"SERUPD\",\"name\":\"Update Service Information\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"360SDOC\",\"name\":\"Service Document upload from 360\",\"requestLevel\":\"service\",\"displayFlag\":\"N\"},{\"code\":\"SERGEN\",\"name\":\"Modify Service Details\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"MOMOQA\",\"name\":\"Modify MOMO Auth QA\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"BLKM\",\"name\":\"Block Mode\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RPWD\",\"name\":\"Reset Password\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"CHLG\",\"name\":\"Modify Preferred Language\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"ACCUPD\",\"name\":\"Update Account Information\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"360ADOC\",\"name\":\"Account Document upload from 360\",\"requestLevel\":\"account\",\"displayFlag\":\"N\"},{\"code\":\"UACCM\",\"name\":\"Modify Billing Account Manager\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"DUNHLD\",\"name\":\"Dunning Hold\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"WMX\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Broadband\"},{\"serviceSubType\":\"LeasedLine\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]},{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PTP\",\"name\":\"Promise to Pay\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"ACCGEN\",\"name\":\"Modify Basic Details\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"ACCBLPRE\",\"name\":\"Modify Billing Preferences\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"ACCAUTO\",\"name\":\"Modify Auto Debit Details\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"ACCADDR\",\"name\":\"Modify Account Address\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"ACCBCYL\",\"name\":\"Modify BillCycle Details\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"ACCTAX\",\"name\":\"Modify Tax Applicability\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"DPBILL\",\"name\":\"Duplicate Bill\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"INTBILL\",\"name\":\"Interim Bill\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"},{\"code\":\"02\",\"name\":\"Frequentprankcalls\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"DSTCL\",\"name\":\"Manage Deposits And Service Limit\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"ADST\",\"name\":\"Add Deposits\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"CCHLD\",\"name\":\"Credit Control Hold / UnHold\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"RDST\",\"name\":\"Refund Deposits\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"MSL\",\"name\":\"Modify Service Limit\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"PFLUPD\",\"name\":\"Modify Profile\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"360PDOC\",\"name\":\"Profile Document upload from 360\",\"requestLevel\":\"profile\",\"displayFlag\":\"N\"},{\"code\":\"AXONIRMUPD\",\"name\":\"Modify AXON Profile\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"B\"},{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"UPFM\",\"name\":\"Modify Profile Manager\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PFLGEN\",\"name\":\"Modify Basic Details\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PFLID\",\"name\":\"Modify Identification Details\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PFLADD\",\"name\":\"Modify Profile Address\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PFLNOT\",\"name\":\"Modify Contact and Notification\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PFLCUP\",\"name\":\"Modify Corporate Profile Details\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"MXDIR\",\"name\":\"Modify XDirectory Level\",\"requestLevel\":\"profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"Registration\",\"name\":\"Registration\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"RETPOSTREG\",\"name\":\"RetailPostpaidRegistration\"},{\"code\":\"WMXCORPOSTAS\",\"name\":\"Wimax Corporate Add Service\"},{\"code\":\"RETPREREG\",\"name\":\"RetailPrepaidRegistration\"},{\"code\":\"RETPOSTAA\",\"name\":\"Retail Postpaid AddAccount\",\"requestLevel\":\"Profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"CORPPREAS\",\"name\":\"Corporate Prepaid AddService\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"CORPPOSTAS\",\"name\":\"Corporate Postpaid AddService\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"CORPAA\",\"name\":\"Corporate Postpaid AddAccount\",\"requestLevel\":\"Profile\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"RETPOSTAS\",\"name\":\"Retail Postpaid AddService\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"CORPREG\",\"name\":\"Corporate Registration\"},{\"code\":\"RETPREAS\",\"name\":\"RetailPrepaidAddService\"}]}},{\"code\":\"MBILL\",\"name\":\"Manage Bills\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"HTBILL\",\"name\":\"HotBill\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"SPBILL\",\"name\":\"SplitBill\",\"requestLevel\":\"service\",\"displayFlag\":\"N\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"MobileTelephony\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"RECH\",\"name\":\"Manage Recharges\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"VOTOP\",\"name\":\"Voucher TopUp\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Prepaid\"},{\"businessType\":\"Hybrid\"}]}]}]}},{\"code\":\"PAYMENT\",\"name\":\"Payments\",\"displayFlag\":\"Y\",\"requestSubTypes\":{\"requestSubType\":[{\"code\":\"PAYINV\",\"name\":\"Payment against Invoice\",\"requestLevel\":\"account\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"},{\"businessType\":\"Prepaid\"}]}]},{\"code\":\"SERVINV\",\"name\":\"Service Invoice\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"WMX\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Broadband\"},{\"serviceSubType\":\"LeasedLine\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]},{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]},{\"code\":\"PREPAYMENT\",\"name\":\"Pre Payment\",\"requestLevel\":\"service\",\"displayFlag\":\"Y\",\"reasons\":[{\"code\":\"01\",\"name\":\"Customer Request\"}],\"serviceTypes\":[{\"partyTypes\":{\"partyType\":[{\"code\":\"I\"},{\"code\":\"B\"}]},\"serviceType\":{\"code\":\"GSM\"},\"serviceSubTypes\":[{\"serviceSubType\":\"Voice\"},{\"serviceSubType\":\"Data\"}],\"businessTypes\":[{\"businessType\":\"Postpaid\"},{\"businessType\":\"Hybrid\"}]}]}]}}],\"incomeRanges\":{\"incomeRange\":[{\"code\":\"1\",\"name\":\"Less than 5000\"},{\"code\":\"2\",\"name\":\"5000 to 15000\"},{\"code\":\"3\",\"name\":\"15001 to 20000\"},{\"code\":\"4\",\"name\":\"20001 to 30000\"},{\"code\":\"5\",\"name\":\"30001 to 40000\"},{\"code\":\"6\",\"name\":\"Above 40001\"}]},\"printFormats\":{\"printFormat\":[{\"code\":\"MMS\",\"name\":\"MMS\"},{\"code\":\"Normal\",\"name\":\"NORMAL\"}]},\"occupations\":{\"occupation\":[{\"code\":\"BE\",\"name\":\"BACHELOR OF ENGINEERING\"},{\"code\":\"GOV\",\"name\":\"GOVERNMENT\"},{\"code\":\"PVT\",\"name\":\"PRIVATE\"},{\"code\":\"SFT\",\"name\":\"SOFTWARE ENGINEER\"}]},\"industries\":{\"industry\":[{\"code\":\"BAN\",\"name\":\"BANKING\"},{\"code\":\"TEL\",\"name\":\"TELECOM\"}]},\"localities\":{\"locality\":[{\"code\":\"U\",\"name\":\"URBAN\"},{\"code\":\"R\",\"name\":\"RURAL\"}]},\"preferredMediums\":{\"preferredMedium\":[{\"code\":\"email\",\"name\":\"Email\",\"default\":\"Y\"},{\"code\":\"mobileNo\",\"name\":\"SMS\"},{\"code\":\"phoneNo\",\"name\":\"Phone\"}]},\"invoiceDispatchModes\":{\"invoiceDispatchMode\":[{\"code\":\"post\",\"name\":\"Post\",\"default\":\"Y\"},{\"code\":\"email\",\"name\":\"Email\"}]},\"faxDataSpeed\":{\"dataSpeed\":[{\"code\":\"01\",\"name\":\"1 MB\",\"default\":\"Y\"},{\"code\":\"02\",\"name\":\"2 MB\"},{\"code\":\"03\",\"name\":\"3 MB\"}],\"faxSpeed\":[{\"code\":\"01\",\"name\":\"1\",\"default\":\"Y\"},{\"code\":\"02\",\"name\":\"2\"},{\"code\":\"03\",\"name\":\"3\"}]},\"subAccountDetails\":{\"subAccountDetail\":[{\"code\":\"3000602\",\"name\":\"Sub Account 1\"},{\"code\":\"1051\",\"name\":\"Sub Account 2\"}]},\"resetTypes\":{\"resetType\":[{\"code\":\"CBAR\",\"name\":\"Call Barring\"},{\"code\":\"VMAIL\",\"name\":\"Voice Mail\"}]},\"taxExemptionCategories\":{\"taxExemptionCategory\":[{\"code\":\"TVA\",\"name\":\"TVA 18%\"},{\"code\":\"TS\",\"name\":\"TS 3%\"}]},\"paymentCurrencies\":{\"paymentCurrency\":[{\"code\":\"EUR\",\"name\":\"EURO\"},{\"code\":\"GBP\",\"name\":\"BRITISH POUND\"},{\"code\":\"MUR\",\"name\":\"MAURITIAN RUPEE\",\"default\":\"Y\"},{\"code\":\"USD\",\"name\":\"US DOLLAR\"}]},\"CSHomeRegions\":{\"CSHomeRegion\":[{\"code\":\"1\",\"name\":\"Region1\"},{\"code\":\"2\",\"name\":\"Region2\"}]},\"billingRegions\":{\"billingRegion\":[{\"code\":\"1\",\"name\":\"Region1\"},{\"code\":\"2\",\"name\":\"Region2\"}]},\"bloodGroups\":{\"bloodGroup\":[{\"code\":\"O+\",\"name\":\"O+\"},{\"code\":\"A+\",\"name\":\"A+\"},{\"code\":\"A-\",\"name\":\"A-\"}]}}};\r" +
    "\n" +
    "\r" +
    "\n" +
    "            $scope.myFunc = function(result) {\r" +
    "\n" +
    "                console.log(result)\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "        });\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "</html>"
  );
 }; });