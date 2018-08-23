client_pkg =
    'jquery'
    'snapsvg'
    'semantic-ui'

client_js_list = []
client_css_list = []
for pkg in client_pkg
    client_js_list.push do
        expand: true
        cwd: 'node_modules/' + pkg + '/dist'
        src: '*.js'
        dest: '../js/' + pkg
    client_css_list.push do
        expand: true
        cwd: 'node_modules/' + pkg + '/dist'
        src: '*.css'
        dest: '../css/' + pkg
client_js = files: client_js_list
client_css = files: client_css_list

module.exports = (grunt)->
    grunt.initConfig do
        #clean:
        #    '../js/'
        copy:
            js:
                client_js
            css:
                client_css
                #* expand: true
                #  cwd: 'node_modules/semantic-ui/dist/'
                #  src: 'semantic.min.css'
                #  dest: '../css/'
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
                src:
                    '*.ls'
                    '!Gruntfile.ls'
                dest: '../js/'
                ext: '.js'
            options:
                bare: true

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-pug'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    #grunt.loadNpmTasks 'grunt-browserify'
    grunt.loadNpmTasks 'grunt-livescript'

    grunt.registerTask 'default', [
        'pug', 'stylus', 'livescript', 'copy'
    ]

