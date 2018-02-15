# TT-UI.Table

# Under construction

# TODOs

- Actions

- Tests

# TODOs

An AngularJS module that provides common table design for your application. Styles provided by [bootstrap-sass](https://github.com/twbs/bootstrap-sass).

# Quick links
- [Demo](#demo)
- [Installation](#installation)
    - [Bower](#install-with-bower)
- [Usage](#usage)
    - [Include styles](#include-the-css-and-js-files)
    - [Add module dependency](#add-module-dependency)
    - [Include html](#include-html)
- [Support](#support)
    - [Found a bug?](#found-a-bug)

# Demo

Visit demo [page](http://ci.tecnotree.com/uilib/origin/develop/components/#tables).

# Installation

Module depends on [ngAnimate](https://docs.angularjs.org/api/ngAnimate), [ui.bootstrap](https://github.com/angular-ui/bootstrap), and [smart-table](https://github.com/lorenzofox3/Smart-Table). Versions >=0.0.12 require angular-bootstrap version 1.x.

### Install with Bower
```sh
$ bower install git@git.tecnotree.com:tec_common/ttui-table.git
```
or
```sh
$ bower install http://git.tecnotree.com/tec_common/ttui-table.git
```

# Usage

### Include the CSS and JS files:


```no-highlight

```

#### Sass files also provided to compile within your project:

```no-highlight
$ttui-table-img-path: "../bower_components/ttui-table/dist/images/";

@import "../bower_components/ttui-table/dist/sass/table-ext.scss";
```

### Add module dependency:

```no-highlight
var myapp = angular.module('myapp', ['TT-UI.Table', 'ttui-table.tpl']);
```

### Include HTML (TODO):


```no-highlight

```

#### More detailed example code can be found from [dist/scripts/ttui-table/example](http://git.tecnotree.com/tec_common/ttui-table/blob/master/dist/scripts/ttui-table/example/).

# Support

### Found a Bug?

Report an issue [here](http://jira.tecnotree.com/jira/secure/CreateIssue.jspa).