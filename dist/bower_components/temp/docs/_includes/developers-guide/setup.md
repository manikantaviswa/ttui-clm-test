<h1 class="page-header">Setup</h1>

Both development and deployment processes of **Tecnotree UI Library** are supported by several tools and can be went through at **Windows**, **Unix** or **OS X** based machine.

### Required tools

* Library development
	* [node.js](http://nodejs.org/) runtime environment
	* [Grunt](http://gruntjs.com/) JavaScript task runner
	* [Bower](http://bower.io/) package manager for the web
* Documentation
	* [Ruby](http://www.ruby-lang.org/) Ruby language interpretter
	* [RubyGems](https://rubygems.org/) Ruby package manager
	* [Rouge](https://github.com/jneen/rouge) syntax highlighter
	* [Jekyll](http://jekyllrb.com/) static site generator
	 
All other tools will be installed automatically according to project dependencies.

### Installation

1. Go to [http://nodejs.org/](http://nodejs.org/) and download installation file for your OS.
2. Install *node.js* runtime and *npm* package manager. There may be some system-specific issues, see details [https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).   
Note: on Linux system you should consider using Node Version Manager [NVM](https://github.com/creationix/nvm) to avoid problems with insufficient permissions while installing modules.
3. Run a terminal and check if *node.js* is accessible by typing:

        node --version
        npm --version
4. If **node.js** is installed properly you should see information about version numbers.
   For **node.js** it should be at least **0.10+**
5. Install **Grunt**. The `-g` flag makes the installation available globally.:

		npm install grunt -g
		npm install grunt-cli -g
6. Verify if **Grunt** was installed properly:

		grunt --version
7. Install **Ruby** and **RubyGems** (for details check [http://www.ruby-lang.org/](http://www.ruby-lang.org/) and [https://rubygems.org/](https://rubygems.org/) as the process may vary with your operating system)  
Note: on Linux system you should consider using Ruby Version Manager [RVM](https://rvm.io/) to avoid problems with insufficient permissions while installing gems.
8. Install **Rouge** and **Jekyll** (details: [https://github.com/jneen/rouge](https://github.com/jneen/rouge), [http://jekyllrb.com/docs/installation/](http://jekyllrb.com/docs/installation/)):

		gem install rouge
		gem install jekyll

### Initialization

1. Open a terminal and navigate to the project root
2. Enter a command:

		npm install

It will install all required modules and dependencies for building and serving the application.
A list of required node packages is located in **package.json** file. Bower components are listed in **bower.json**.

### Local development server

Open a terminal and type:

	grunt serve

Open your web browser and navigate to **http://localhost:8000/** to verify if building went well.

Grunt server watches source files for changes and reloads page as soon as any change is detected.

### Production build

In order to build **Tecnotree UI Library** bower component for production, open a terminal and type:

	grunt build

As soon as *Grunt* build task is finished and all test are passed, you can navigate to **/dist** directory. Ther will be files ready to be published by HTTP server (eg. *Nginx* or *Apache*).
