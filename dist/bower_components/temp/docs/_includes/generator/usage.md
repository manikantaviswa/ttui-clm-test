For step-by-step instructions on using Yeoman and this generator to build a TODO AngularJS application from scratch see [this tutorial.](http://yeoman.io/codelab/)

1. Install Node.js using the manual on [https://nodejs.org/](https://nodejs.org/)
2. Run terminal to ensure if Node works properly. You should see version numbers in answer for following commands.

        node --version 
        npm --version
3. Install tools: Grunt `grunt-cli`, Bower `bower` and Yeoman `yo` globally

        npm install -g grunt-cli bower yo
4. Ensure whether everything works fine:

        grunt --version
        bower --version
        yo --version
5. Install Angular Generator with TT UI Lib

        npm cache clean
        npm install -g git+http://git.tecnotree.com/tec_common/generator-tecnotree-angular.git
6. Create directory for your new project and get into it

        mkdir my-new-project && cd my-new-project
7. Run `yo tecnotree-angular`, optionally passing an app name:
        
        yo tecnotree-angular [MyNewApp]
8. Choose whether you want to utilize Sass in your application, then select desired languages and default language. Or just hit enter to use default options (use Sass, language: en). 
9. Wait several minutes till the installation process ends.
10. Run project by typing 

        grunt serve
11. As soon as `Waiting...` info appears in terminal, open a web browser and navigate to [http://localhost:9000/](http://localhost:9000/)

## Available generators:

* tecnotree-angular (aka tecnotree-angular:app)
* tecnotree-angular:controller
* tecnotree-angular:directive
* tecnotree-angular:filter
* tecnotree-angular:route
* tecnotree-angular:service
* tecnotree-angular:provider
* tecnotree-angular:factory
* tecnotree-angular:value
* tecnotree-angular:constant
* tecnotree-angular:decorator
* tecnotree-angular:view

For more details and usage examples see readme.md file in generator-tecnotree-angular project.
