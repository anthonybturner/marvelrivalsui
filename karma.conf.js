module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'src/**/*.js',
            'test/**/*.spec.js'
        ],
        browsers: ['Chrome'],
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher'
        ],
        singleRun: true
    });
};