compilation errors:

1. Router is not defined
file - controllers/usercontroller.js line 1
problem - var router = Router();
fix - var router = require('express').Router();

2. Cannot find module 'bcrypt'
file - controllers/usercontroller.js line 2
problem - var bcrypt = require('bcrypt');
fix - var bcrypt = require('bcryptjs');

5. SyntaxError: Function statements require a function name
file models/game.js line 1
problem function(sequelize, DataTypes) not exported
fix module.exports = function(sequelize, DataTypes) {...

6. ReferenceError: routers is not defined
file controllers/gamecontroller.js line 116
problem module.exports = routers; routers not defined
fix module.exports = router;

7. TypeError: db.sync is not a function 
file app.js line 8
problem db is not exported from db.js
fix db.js: module.exports = sequelize

9. create User bcrypt hashSync function name
file usercontroller.js line 13
problem - password _ h _ ash: bcrypt.hashSync(req.body.user.password, 10),
fix - passwordHash: bcrypt.hashSync(req.body.user.password, 10),

logic errors:

1. app not listen any port
file app.js line 13
problem - 
app.listen(function() {
    console.log("App is listening on 4000");
})
fix - difine PORT variable
app.listen(PORT, function() {
    console.log(`App is started on localhost:${PORT}`);
})

2. bodyParser: usage incorrect
file app.js line 9
problem - app.use(require('body-parser'));
fix - app.use(require('body-parser').json());

3. require(...).import is not a function
file controllers/usercontroller.js line 5
problem - var User = require('../db').import('../models/user');
db is not exported in file /db.js

4. require(...).import is not a function
file controllers/gamecontroller.js line 2
problem - var Game = require('../db').import('../models/game');
db is not exported in file /db.js

5. TypeError: require(...).import
file validate-session.js line 2
problem - must provide db instance
var User = require('sequelize').import('../models/user');
fix var User = require(../db).import('../models/user');

6. rejection ReferenceError: games is not defined
file gamecontroller.js line 11
problem - 
    function findSuccess(data) {
        res.status(200).json({
            games: games,
            message: "Data fetched."
        })
    },
fix -
    function findSuccess(data) {
        res.status(200).json({
            games: data,
            message: "Data fetched."
        })
    },

7. router usercontroller update user
file gamecontroller.js line 75 
problem -
    where: {
        id: req.params.id,
        owner_id: req.user
    }
fix -
    where: {
        id: req.params.id,
        owner_id: req.user.id
    }

refactoring: 
1. all variable declaration to const
2. all callback f-ns to arrow functions
3. add catch block to Promises
4. use async f-ns in routers, remove then/catch blocks
5. use destructurization in routers