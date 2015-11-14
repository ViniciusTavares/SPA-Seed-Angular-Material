
#SPA-Seed-Angular-Material

This project is an skeleton with CRUD operations for Single Page Applications.
In current version I used AngularJS as SPA framework and IndexedDB for storage data in memory.
            
##Check the demo [here](http://viniciusrtavares.com/spa-seed/#/)        
            
###Structure:
                
  * build
  * client
    * app
      * components
        * components (controlers, services and views)
      * config
        * application config files
      * shared
      * shell
        * directives 
        * common 
    * assets
      * css
      * icons
      * img
      * js

  <img src="https://github.com/ViniciusTavares/SPA-Seed-Angular-Material/blob/master/client/assets/img/project_structure.png?raw=true" alt="Project Structure" />
            
###Future
            
Development features for next version:
          
  * Unit Tests
  * Create package in NPM repository 
  * Integrate with a rest api using NodeJS + Express or Restify. 

###Let's go start!

Open your favorite terminal and hands on!

First clone this repository using git
```
git clone https://github.com/ViniciusTavares/SPA-Seed-Angular-Material
```

After install npm modules and bower packages
     
```
npm install 
bower install
```

You have two options to start application

Dev task will use original files, allowing use debbuger tools. To use it just run:
```
gulp dev
```

Production task will generate a minified version of application, with concatenated scripts and stylesheets. To use it just run: 
```
gulp production
```

###Feedbacks and report errors 
  I'd grateful if you collaborate with feedbacks and bug reports.
  Feel free to pull requests too! :)
 
   
