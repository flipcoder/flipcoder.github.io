module.exports = (grunt)->
    grunt.initConfig
        pug:
            src:
                expand: true
                src: ['*.pug']
                dest: '../'
                ext: '.html'
            options:
                pretty: true
        stylus:
            src:
                expand: true
                src: ['*.styl']
                dest: '../css/'
                ext: '.css'
        livescript:
            src:
                expand: true
                src: ['*.ls']
                dest: '../js/'
                ext: '.js'
            options:
                bare: true

    grunt.loadNpmTasks('grunt-contrib-pug')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-livescript')

    grunt.registerTask 'default', [
        'pug', 'stylus', 'livescript'
    ]

