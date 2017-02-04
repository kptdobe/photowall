var fs = require('fs');
var gm = require('gm');

var SOURCE_FOLDER = '/Users/alex/Downloads/Photowall';
var TARGET_FOLDER = __dirname +  '/public/images';

fs.readdir(SOURCE_FOLDER, function(err, files) {
    var images = [];
    files.forEach(function(file) {      
        var filePath = SOURCE_FOLDER + '/' + file;
        var stats = fs.statSync(filePath);
        if (stats.isFile() && file.indexOf('.') !== 0) {
            console.log('Found image to add: ' + filePath);
            images.push(filePath);
        } else {
            console.log('Ignored: ' + filePath);
        }
    });

    while (images.length > 0) {
        var i = images.length;
        var random  = Math.floor(Math.random() * i);

        var path = images[random];
        var root = path.substring(0, path.lastIndexOf('/') + 1);
        var extension = path.substring(path.lastIndexOf('.'), path.length);


        console.log('Renaming', path, 'to', newPath);

        var regex = /[ \(\)]/g;
        var filteredPath = path.replace(regex, '_');

        fs.renameSync(path, filteredPath);

        var newPath = TARGET_FOLDER + '/' + i + extension;
        try {
            gm(filteredPath)
                .autoOrient()
                .write(newPath, function (err) {
                    if (err) {
                        console.log('Error while writing image', err, this);
                    }
                });
        } catch (err) {
            console.log('Error while transforming image', err, path);
        }

        images.splice(random, 1);
    }
});