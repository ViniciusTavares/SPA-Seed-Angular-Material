        var gulp = require('gulp'),
        connect = require('gulp-connect'),
        uglify = require('gulp-uglify'),
        rimraf = require('rimraf'),
        concat = require('gulp-concat'),
        sequence = require('run-sequence'),
        modRewrite = require('connect-modrewrite');

        var paths = {
         appJs: [
             'bower_components/angular/angular.js',
             'bower_components/angular-animate/angular-animate.js',
             'bower_components/angular-aria/angular-aria.js',
             'bower_components/angular-material/angular-material.js',
             'bower_components/angular-ui-router/release/angular-ui-router.js',
             'bower_components/angular-indexed-db/angular-indexed-db.js',

             'client/app/app.js',
             'client/app/config/config.route.js',
             'client/app/config/config.exceptionHandler.js',
             'client/app/config/config.js',

               //components
             'client/app/shell/shellController.js',
             'client/app/components/home/homeController.js',
             'client/app/components/contacts/contactsController.js',
             'client/app/components/contacts/contactsService.js',

            //shared
             'client/app/shared/common.js',
             'client/app/shared/common/commonService.js',
             'client/app/shared/directives.js',
             'client/app/shared/menu/sidebarMenu.directive.js'],

         styles: [],
         assets:  [
                      './client/**/*.*',
                      '!./client/templates/**/*.*',
                      '!./client/assets/{scss,js}/**/*.*'
                  ]
        }

        gulp.task('clean', function (cb) {
            rimraf('./build', cb);
        });

        gulp.task('copy', function() {
          return gulp.src(paths.assets, {
            base: './client/'
          })
            .pipe(gulp.dest('./build'))
          ;
        });

        gulp.task('html', function () {
          gulp.src('./client/app/*.html')
            .pipe(connect.reload());
        });

        gulp.task('uglify', function() {
          console.log(paths.appJs);

             gulp.src(paths.appJs)
             .pipe(uglify({
               mangle: false,
               beautiful: true
             }))
                  .pipe(concat("app.js"))
           .pipe(gulp.dest('./build/assets/js'));
        }
      );

        // Compila tudo sem startar o server
        gulp.task('build', function () {
            sequence('clean', ['copy', 'uglify'], function () {
                console.log("Build efetuado com sucesso!.");
            })
        });

        gulp.task('server-production', function() {
          connect.server({
            root: './build',
            livereload: true,
            //port: 8080,
            // middleware: function () {
            //   return [
            //     modRewrite(['^[^\\.]*$ /index.html [L]'])
            //   ];
            // }
          });
        });

        gulp.task('server-dev', function() {
          connect.server({
            root: ['./client', './'],
            livereload: true,
            //port: 8080,
            // middleware: function () {
            //   return [
            //     modRewrite(['^[^\\.]*$ /index.htm  l [L]'])
            //   ];
            // }
          });
        });

        gulp.task('watch', function () {
          gulp.watch(['./client/app/*.html', 'client/*.html'], ['html']);
        });

          gulp.task('default', ['uglify', 'server-production'], function() {
            console.log('Default task was activated! Executing production server...');
          });

          gulp.task('dev', ['server-dev', 'watch'],  function() {
            console.log('Default task was activated! Executing development server...');
          });
