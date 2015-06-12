var gulp = require('gulp');

gulp.task('scripts', require('./scripts'));
gulp.task('serve', require('./serve'));
gulp.task('server', require('./server'));
gulp.task('watch', require('./watch'));

gulp.task('default', ['scripts', 'serve', 'server', 'watch']);