require('dotenv').config();

const express = require('express');
const jsonParser = require('body-parser').json();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const validate = require('./middleware/validate-session');

const PORT = process.env.APP_PORT || 4000;
const app = express();

db.sync();
app.use(jsonParser);
app.use('/api/auth', user);
app.use(validate);
app.use('/api/game', game);

app.listen(PORT, () => {
    console.log(`App is started on http://localhost:${PORT}`);
})