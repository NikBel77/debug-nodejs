const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db')
    .import('user', require('../models/user'));

router.post('/signup', async (req, res) => {
    try {
        const { full_name, username, password, email} = req.body.user;
        const passwordHash = bcrypt.hashSync(password, 10);
        const user = await User.create({ full_name, username, passwordHash, email });
    
        const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
        res.status(200).json({ user, token });
        
    } catch (err) {
        
        res.status(500).send({ error: err.message });

    }
})

router.post('/signin', async (req, res) => {
    try {

        const { username, password } = req.body.user;
        const user = await User.findOne({ where: { username } });
        if(!user) {
            res.status(403).send({ error: "User not found." })
            return
        }
    
        const match = await bcrypt.compare(password, user.passwordHash);
        if(!match) {
            res.status(502).send({ error: "Passwords do not match." });
            return
        }
    
        const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
        res.json({ user, message: "Successfully authenticated.", token });

    } catch (err) {

        res.status(500).send({ error: err.message });

    }
})

module.exports = router;