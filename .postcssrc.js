'use strict';

module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 1,
            features: {
                'nesting-rules': true,
            },
        },
        'autoprefixer': {
            browsers: ['ie >= 10, last 4 versions'],
        },
    },
};
