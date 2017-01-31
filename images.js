var fs = require('fs');

var IMAGES_ROOT = 'images';
var IMAGES_LOCAL = 'public/' + IMAGES_ROOT;

var gatherImages = function() {
    fs.readdir(IMAGES_LOCAL, function(err, files) {
        global.images = [];
        files.forEach(function(file) {
            var filePath = __dirname + '/' + IMAGES_LOCAL + '/' + file;
            fs.stat(filePath, function (e, stats) {
               if (stats.isFile() && file.indexOf('.') !== 0) {
                    console.log('Found image to add: ' + filePath);
                    global.images.push({
                        name: file,
                        path: '/' + IMAGES_ROOT + '/' + file
                    });
                } else {
                    console.log('Ignored: ' + filePath);
                }
            });
        });
    });
};

exports.gatherImages = gatherImages;