const mv = require("mv");

mv("out/static/fonts", "out/fonts", { mkdirp: true }, function(err) {});
mv("out/static/styles", "out/styles", { mkdirp: true }, function(err) {});
mv("out/static/scripts", "out/scripts", { mkdirp: true }, function(err) {});
mv("out/static/favicon.ico", "out/favicon.ico", { mkdirp: true }, function(err) {});