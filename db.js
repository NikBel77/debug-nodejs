const Sequelize = require('sequelize');
                                //database username   password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(err => {
            console.log(`Error: ${err}`);
    })

module.exports = sequelize