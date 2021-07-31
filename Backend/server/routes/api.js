const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/dojo");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });



  router.post("/registrations", async function (req, res) {
    await addToContacts(req.body);
    res.send("adding successfuly !");
  });
  

router.get("/test", function (req, res) {
  res.send("test ok ");
});

addToContacts = (userInfo) => {
  sequelize
    .query(
      `INSERT INTO profile
 VALUES (null
    ,'${userInfo.username}'
    ,'${userInfo.useremail}'
    ,'${userInfo.userpassword}'
    ,'${userInfo.useraddress}'
    ,'${userInfo.userphone}'
    ,${userInfo.userage}
    )`
    )
    .then(function ([id]) {
      sequelize.query(`INSERT INTO user VALUES(${id},2,1)`);
    });
};

emailIsExists = (email) => {
  sequelize
    .query(`SELECT * FROM profile WHERE email=${email}`)
    .then(function ([res]) {
      if (res.length > 0) {
        return false;
      } else {
        return true;
      }
    });
};

//TODO check if work after update register
router.get("/users",  function(req,res){
    let user = req.query;
    let isUserExist =  sequelize.query(
      `SELECT * FROM profile WHERE email=${user.email} AND password=${user.password}`)
      .then(function([res]){
        if (res.length > 0) {
          return false;
        } else {
          return true;
        }
      });
    
});

router.get("/schedules", function (req, res) {
  sequelize
    .query(
      `
    SELECT * 
    FROM 
    schedule
    `
    )
    .then(function ([schedules, metadata]) {
      res.send(schedules);
    });
});

router.post("/about", (req, res) => {
  console.log("////////body///////")
  console.log(req.body)
  console.log("/////////////////")

  sequelize.query(
  `UPDATE departmentdetails
  SET department_name = ${req.body.dep_name}
  WHERE id = ${parseInt(req.body.id)}`
  ).then(function ([results]) {
    res.send("added ok ")
  }).catch(err => {
    console.log("error")
  })
})

router.post("/schedules", (req, res) => {
  const newSchedule = req.body;
  console.log(newSchedule);

  try {
    console.log(" inserting ");
    sequelize
      .query(
        `
        INSERT INTO schedule
         VALUES(
            ${newSchedule.id},
            ${newSchedule.calendarId},
            '${newSchedule.title}',
            '${newSchedule.category}',
            '${newSchedule.dueDateClass}',
            '${newSchedule.start}',
            '${newSchedule.end}'
            )
        `
      )
      .then(function ([results, metadata]) {
        res.send("added ok ");
      });
  } catch (error) {}
});
router.delete("/schedules", function (req, res) {
  console.log("--->>>", req.body);
  let schedule = req.body;
  try {
    sequelize
      .query(
        `
         DELETE FROM schedule
         WHERE id=${schedule.id} 
         AND 
         calendarId=${schedule.calendarId}
        `
      )
      .then(function ([results, metadata]) {
        res.send("Deleting Schedule Success ");
      });
  } catch (error) {}
});

router.get('/coachs', function (req, res) {
  try{
    sequelize
    .query(
      `
      SELECT * 
      FROM 
      coach
    `
    )
    .then(function ([coachs, metadata]) {
      res.send(coachs);
    });
  }
  catch(error){
    res.status(400).send(error.message)
  }

})

router.post('/coachs', function (req, res){
  const coach = req.body.data;
  console.log(coach);
  try {
    sequelize
      .query(
        `
        INSERT INTO coach
         VALUES(
             ${null},
            '${coach.name}',
            '${coach.type}',
             ${coach.year},
            '${coach.img}',
            '${coach.descShort}',
             ${coach.dojo_id}
            )
        `
      )
      .then(function ([results, metadata]) {
        res.send("added ok ");
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.get("/about", function(req, res){
  sequelize.query(`SELECT * FROM about, departmentdetails WHERE about.dep_details_id = departmentdetails.id `)
  .then(function ([results, metadata]) {
    res.send(results);
  })
})

module.exports = router;