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



router.get('/schedules',function(req,res){
    sequelize.query(`
    SELECT * 
    FROM 
    schedule
    `).then(function ([schedules, metadata]) {
        res.send(schedules);
    });



})

router.post('/schedules', (req, res) => {
    const newsSchedule = req.body
    console.log(newsSchedule)

    try {
        console.log(" inserting ")
        sequelize.query(`
        INSERT INTO schedule
         VALUES(
            ${newsSchedule.id},
            ${newsSchedule.calenderId},
            '${newsSchedule.title}',
            '${newsSchedule.category}',
            '${newSchedule.duDateClass}',
            '${newSchedule.start}',
            '${newSchedule.end}',
            )
        `). then(function ([results, metadata]) {

            res.send("added ok ")
        })
        
    } catch (error) {

    }
}
)


module.exports = router