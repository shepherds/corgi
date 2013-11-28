/***@@@ BEGIN LICENSE @@@***/
/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2013 Teradata Corporation                                    │
│                                                                             │
│The MIT License (MIT)                                                        │
│                                                                             │
│                                                                             │
│Permission is hereby granted, free of charge, to any person obtaining a copy │
│of this software and associated documentation files (the "Software"), to deal│
│in the Software without restriction, including without limitation the rights │
│to use, copy, modify, merge, publish, distribute, sublicense, and/or sell    │
│copies of the Software, and to permit persons to whom the Software is        │
│furnished to do so, subject to the following conditions:                     │
│                                                                             │
│The above copyright notice and this permission notice shall be included in   │
│all copies or substantial portions of the Software.                          │
│                                                                             │
│THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR   │
│IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,     │
│FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  │
│AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER       │
│LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,│
│OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE│
│SOFTWARE.                                                                    │
\*───────────────────────────────────────────────────────────────────────────*/
/***@@@ END LICENSE @@@***/
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'lib/**/*.js', 'test/fixtures/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        mochaTest: {
            src: ['test/*.js'],
            options: {
                globals: ['chai'],
                timeout: 6000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        },
        clean: {
            'tmp': '/tmp/tdr*'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['jshint', 'mochaTest', 'clean:tmp']);

};