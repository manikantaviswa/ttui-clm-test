var yaml = require('js-yaml');
var fs = require('fs');

var configFile = '_config.yml';
var config = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
var bower = yaml.safeLoad(fs.readFileSync('bower.json', 'utf8'));

var version = bower.version;
config.current_version = version;

fs.writeFile(configFile, yaml.dump(config));