const gulp = require('gulp');
const git = require('gulp-git'); //before using install gulp-git || npm install gulp-git --save-dev

const repo = ' '; //your repository
const branchName = ' '; //the name of the branch on which will be pushed the changes
const path = ' '; //path to the files that will be changed

gulp.task('init', function(){ //init local repo
    return git.init(function (err) {
      if (err) throw err;
    });
});

gulp.task('add', function(){  //add files to repo
    return gulp.src(path)
      .pipe(git.add());
});

gulp.task('commit', function(){ //commit files
    return gulp.src(path)
      .pipe(git.commit('gulp commit'));
});

gulp.task('fetch', function(){ //fetch differences
  return git.fetch('origin', '', function (err) {
    if (err) throw err;
  });
});

gulp.task('addremote', function(){  //add remote directory
    return git.addRemote('origin', repo, function (err) {
      if (err) throw err;
    });
});

gulp.task('push', async function(){ //push changes
    return git.push('origin', branchName, function (err) {
      if (err) throw err;
    });
});

gulp.task('checkout', async function(){ //change branch and pull files from it
    git.checkout(branchName, function (err) {
      if (err) throw err;
    });
});

gulp.task('watchChanges', function() {  //checking for changes
    gulp.watch(path, gulp.series('add', 'commit', 'push')); //pushind procedure when files were changed
});



gulp.task('start', //when you open progect prom folder without your local repo
  gulp.series('init', 'addremote', 'fetch', 'checkout')); //initializing repo ang going to the branch needed

gulp.task('default', //when you open progect prom folder with your local repo
  gulp.series('add', 'commit', 'push', 'watchChanges')); //pushing changes that were before gulp is on ana checking for the further ones
