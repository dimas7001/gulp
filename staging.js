//before using this file do command  ->  git checkout staging
//it will switch the branch to the needed one
//after that you can switch it back

var gulp        = require('gulp');
var runSequence = require('run-sequence');
const git = require('gulp-git');


const branchName = 'staging';   //your branch
const filepath = ['build/*', '!build/index.html', '!build/js/report.html']; //path to the build that excluding unneeded files


gulp.task('add', function(){  //add files to repo
    return gulp.src(filepath)
      .pipe(git.add());
});

gulp.task('commit', function(){ //commit files
    return gulp.src(filepath)
      .pipe(git.commit('gulp commit'));
});

gulp.task('push', async function(){ //push changes
    return git.push('origin', branchName, function (err) {
      if (err) throw err;
    });
});


gulp.task('staging', function(cb) { //stagind task
    runSequence(
        'build:dev',    //build ploject
        'add',          //git add
        'commit',       //git commit -m"gulp commit"
        'push',         //git push
        cb
    );
});