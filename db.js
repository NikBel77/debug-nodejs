const Sequelize = require('sequelize');
require('dotenv').config();
                                //database username   password
const sequelize = new Sequelize(process.env.pgname, process.env.pgusername, process.env.pgpsw, {
    host: process.env.pghost,
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = sequelize