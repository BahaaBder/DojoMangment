
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:314671470kh@localhost/dojo");
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
router.get("/users", function (req, res) {
  let user = req.query;
  sequelize
    .query(
      `SELECT * FROM
       profile 
       WHERE profile.email='${user.email}'
        AND profile.password='${user.password}'`
    )
    .then(function ([results]) {
      if (results.length > 0) {
        console.log(results[0].id);
         res.send(results[0]);
      } else {
        res.send(undefined);
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
router.get("/coachs", function (req, res) {
  try {
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
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/coachs", function (req, res) {
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

//tawfiq

router.post("/userSchedule", function (req, res) {
  const user_schedule = req.body;
  try {
    sequelize
      .query(
        `
        INSERT INTO user_schedule
         VALUES(
             ${user_schedule.userId},
             ${user_schedule.scheduleId}
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

router.delete("/userSchedule", function (req, res) {
  const user_schedule = req.body;
  try {
    sequelize
      .query(
        `
         DELETE FROM user_schedule
         WHERE
             userId=${user_schedule.userId} AND
             schedule_id=${user_schedule.scheduleId}
        `
      )
      .then(function ([results, metadata]) {
        res.send("added ok ");
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.get("/userSchedule", function (req, res) {
  let user_schedule = req.query;
  let userId = parseInt(user_schedule.userId);
  let scheduleID = parseInt(user_schedule.scheduleId);
  // console.log(userId);
  // let userId = parseInt(req.params.userId);
  // let scheduleId = parseInt(req.params.scheduleId);
  try {
    sequelize
      .query(
        `
         SELECT *  FROM user_schedule
         WHERE
             userId=${userId} AND
             schedule_id=${scheduleID}
        `
      )
      .then(function ([results, metadata]) {
          if(results.length > 0){
            res.send(true);
          }
          else{
            res.send(false);
          }
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
})
// router.update("/userDepartment",function(req,res){
//   const data = req.body.data;
//   sequelize.query(`update schedule set calender = ${data.info.userId} WHERE ${data.info.id}=${data.userId} `)
//   .then(function ([results, metadata]) {
//     res.send(results);
//   })
// })
module.exports = router;