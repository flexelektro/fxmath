const path = require('path');

module.exports = {
    mode:"development",
    entry: './visualtest/visualtests.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, "..",'visualtest'),
        libraryTarget: "umd"
    },
};
