const router = require('express').Router();
const Game = require('../db')
    .import('../models/game');

router.get('/all', async (req, res) => {
    const games = await Game.findAll({ where: { owner_id: req.user.id } })
    if(!games) {
        res.status(500).json({ message: "Data not found" });
        return
    }

    res.status(200).json({ games, message: "Data fetched."});
})

router.get('/:id', async (req, res) => {
    const game = await Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
    if(!game) {
        res.status(500).json({ message: "Data not found." });
        return
    }

    res.status(200).json({ game });
})

router.post('/create', async (req, res) => {
    const { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
    const { id } = req.user;

    const game = await Game.create({ title, owner_id: id, studio, esrb_rating, user_rating, have_played })
        .catch(({ message }) => {
            res.status(500).json({ message });
            return
        })

    res.status(200).json({ game, message: "Game created." })
})

router.put('/update/:id', async (req, res) => {
    const { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
    Game.update(
        { title, studio, esrb_rating, user_rating, have_played },
        { where: { id: req.params.id, owner_id: req.user.id }}
    )
    .then((numbers) => {
        if(numbers[0] === 0) {
            res.status(400).json({ message: "Game not found" });
            return
        }
        res.status(200).json({ message: "Successfully updated." });
    })
    .catch(({ message }) => {
        res.status(500).json({ message });
        return
    })

})

router.delete('/remove/:id', async (req, res) => {
    Game.destroy({ where: { id: req.params.id, owner_id: req.user.id }})
    .then((number) => {
        if(number === 0) {
            res.status(400).json({ message: "Game not deleted" });
            return
        } 
        res.status(200).json({ message: "Successfully deleted" });
    })
    .catch(({ message }) => {
        res.status(500).json({ error: message })
    })
})

module.exports = router;