const db = require('./../util/dbconn');

exports.getHome = (req, res) => {
    res.send('hello world');
}