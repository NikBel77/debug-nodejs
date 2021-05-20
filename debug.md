compilation errors:

1. Router is not defined
file - controllers/usercontroller.js line 1
problem - var router = Router();
fix - var router = require('express').Router();

2. Cannot find module 'bcrypt'
file - controllers/usercontroller.js line 2
problem - var bcrypt = require('bcrypt');
fix - var bcrypt = require('bcryptjs');

3. require(...).import is not a function
file controllers/usercontroller.js line 5
problem - var User = require('../db').import('../models/user');
fix var User = require('../models/user');

4. require(...).import is not a function
file controllers/gamecontroller.js line 2
problem - var Game = require('../db').import('../models/game');
fix - var Game = require('../models/game');

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
problem db is not imported from db.js file
fix db.js: module.exports = sequelize

8. TypeError: require(...).import is not a function
file validate-session.js line 2
problem - var User = require('sequelize').import('../models/user');
fix var User = require('../models/user');

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