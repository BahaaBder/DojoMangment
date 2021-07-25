const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const sequelize = new Sequelize("mysql://root:@localhost:3306/dojo");

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })



router.get('/test', function (req, res) {
  res.send("test ok ")
})


module.exports = router