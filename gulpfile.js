  var gulp = require('gulp'),
      connect = require('gulp-connect'),
      uglify = require('gulp-uglify'),
      rimraf = require('rimraf'),
      concat = require('gulp-concat'),
      minifyCSS = require('gulp-minify-css'),
      sequence = require('run-sequence'),
      flatten = require('gulp-flatten'),
      useref = require('gulp-useref');

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
          'client/app/shared/menu/sidebarMenu.directive.js'
      ],

      styles: [
          './client/**/*.css',
          './bower_components/**/*.css',
      ],
      assets: [
          './client/**/*.*',
          '!./client/app/**/*.js*',
          '!./client/index.html',
          '!./client/assets/{css,js}/**/*.*'
      ]
  }

  gulp.task('clean', function(cb) {
      rimraf('./build', cb);
  });

  gulp.task('copy', function() {
      return gulp.src(paths.assets, {
              base: './client/'
          })
          .pipe(gulp.dest('./build'));
  });
  gulp.task('copy:fonts', function() {
     return gulp.src('./bower_components/font-awesome/fonts/*.{ttf,woff,eof,svg}', {
              base: './bower_components/'
          })
          .pipe(flatten())
          .pipe(gulp.dest('./build/assets/fonts/'));
  });

  gulp.task('html', function() {
      gulp.src('./client/app/*.html')
          .pipe(connect.reload());
  });

  gulp.task('concat:css', function() {
      console.log('concatenating styles');

        return  gulp.src(paths.styles)
          .pipe(minifyCSS({ keepBreaks: false }))
          .pipe(concat('styles.css'))
          .pipe(gulp.dest('./build/assets/css'));
  })

  gulp.task('concat:app', function() {
      console.log('concatenating app scripts');

      return gulp.src(paths.appJs)
          .pipe(uglify({
              mangle: false,
              beautiful: false
          }))
          .pipe(concat("app.js"))
          .pipe(gulp.dest('./build/assets/js'));
  });

  gulp.task('build', function() {
      sequence('clean', ['copy', 'concat:js', 'concat:css'], function() {
          console.log("Build efetuado com sucesso!.");
      })
  });

  gulp.task('server:production:index', function() {
    return gulp.src('./client/index.html')
        .pipe(useref())
        .pipe(gulp.dest('./build'));
  });

  gulp.task('server:production', function() {
      connect.server({
          root: './build',
          livereload: true,
          port: 8084
      });
  });

  gulp.task('server:dev', function() {
      connect.server({
          root: ['./client', './'],
          livereload: true,
      });
  });

  gulp.task('watch', function() {
      console.log('Watching all .html files')
      gulp.watch(['./client/app/*.html', 'client/*.html'], ['html']);
  });

  gulp.task('default', ['dev'], function() {
      console.log('Default task was activated!');
  });

  gulp.task('production', function() {
      console.log('Executing production server...');
      sequence('clean', ['concat:app', 'concat:css', 'server:production:index', 'server:production', 'copy:fonts'], 'copy',
      function(){ console.log('Server is ready! :)')});
  });

  gulp.task('dev', ['server:dev', 'watch'], function() {
      console.log('Executing development server...');
  });
