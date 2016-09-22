function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
    }

    return sources;
}

module.exports = function() {
    entry: {
        helloWorld: getEntrySources([
            './js/helloworld.js'
        ])
    },
    // ...
}

var cdn = (process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/');

swig.setDefaults({
    locals: { // Global variables
        cdn: cdn
    }
})

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // ...
    module: {
        loaders: [
            // ...
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('public/style.css', {
            allChunks: true
        })
    ]
}