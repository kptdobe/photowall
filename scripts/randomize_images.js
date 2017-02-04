var fs = require('fs');
var gm = require('gm');
var myconf = require('../myconf').myconf;


var SOURCE_FOLDER = myconf.get('local:images:source');
var TARGET_FOLDER = __dirname +  '/../public/images';

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
        var extension = path.substring(path.lastIndexOf('.'), path.length);

        var regex = /[ \(\)]/g;
        var filteredPath = path.replace(regex, '_');

        if (path != filteredPath) {
            fs.renameSync(path, filteredPath);
        }

        var newPath = TARGET_FOLDER + '/' + (("000" + i).slice(-4)) + extension;
        console.log('Renaming', path, 'to', newPath);
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