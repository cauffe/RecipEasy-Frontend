module.exports = function (config) {
	config.set({

		basePath: './',

		files: [
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/angular-animate/angular-animate.min.js',
			'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
			'app/bower_components/ngToast/dist/ngToast.min.js',
			'app/bower_components/angular-sanitize/angular-sanitize.min.js',
			'app/app.js',
			'app/modules/auth/*.js',
			'app/modules/auth/models/*.js',
			'app/modules/auth/models/*.js',
			'app/modules/navigation/*.js',
			'app/modules/recipes/*.js',
			'app/modules/recipes/models/*.js',
			'app/modules/recipes/controllers/*.js',
			'tests/unit-tests/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};
