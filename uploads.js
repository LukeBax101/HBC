const path = require('path');
const multer = require("multer");


var raceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./database/images/sessions/race"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.png`)
  }
});
var raceUpload = multer({ storage: raceStorage });

var slideStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./database/images/slides"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.png`)
  }
});
var slideUpload = multer({ storage: slideStorage });

var homeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./database/images/sessions/home"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.png`)
  }
});
var homeUpload = multer({ storage: homeStorage });

var teamStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./database/images/teams"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.gif`)
  }
});
var teamUpload = multer({ storage: teamStorage });


module.exports = {
    slideUpload,
    raceUpload,
    homeUpload,
    teamUpload,
};
