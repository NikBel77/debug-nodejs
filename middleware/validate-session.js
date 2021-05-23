const jwt = require('jsonwebtoken');
const User = require('../db')
    .import('user', require('../models/user'));

module.exports = async function (req, res, next) {
    if (req.method == 'OPTIONS') next();   // allowing options as a method for request

    const sessionToken = req.headers.authorization;
    if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided." });


    try {
        const decoded = jwt.verify(sessionToken, 'lets_play_sum_games_man');
        if(!decoded) {
            res.status(400).send({ error: "not authorized" });
            return;
        }

        User.findOne({ where: { id: decoded.id } })
            .then(user => {
                req.user = user;
                next();
            })
            .catch(() => {
                res.status(401).send({ error: "not authorized" });
            })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}