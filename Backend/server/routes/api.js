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
            '${newSchedule.title}',
            '${newSchedule.category}',
            '${newSchedule.dueDateClass}',
            '${newSchedule.start}',
            '${newSchedule.end}',
            ${newSchedule.department_id}
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
         WHERE id=${schedule.schedule_id} 
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
});
router.get("/about", function (req, res) {
  sequelize
    .query(
      `SELECT * FROM about, departmentdetails WHERE about.dep_details_id = departmentdetails.id `
    )
    .then(function ([results, metadata]) {
      res.send(results);
    });
});
//tawfiq

router.get("/userDepartment", function (req, res) {
  try {
    sequelize
      .query(
        `
       SELECT * FROM 
       user_department 
        `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/userDepartment", function (req, res) {
  const user_schedule = req.body;
  console.log("==userDepartment post ==", user_schedule);
  try {
    sequelize
      .query(
        `
    select * from user_department 
    where user_id=${user_schedule.userId} and 
    department_id=${user_schedule.departmentId}

    `
      )
      .then(function ([results, metadata]) {
        console.log(" user  outside if department already exist ", results);

        if (results.length > 0) {
          console.log(" user department already exist ");
          res.send(" already there ");
        } else {
          sequelize
            .query(
              `
        INSERT INTO user_department
         VALUES(
             ${user_schedule.userId},
             ${user_schedule.departmentId})
        `
            )
            .then(function ([results, metadata]) {
              res.send("added ok ");
            });
        }
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/userSchedule", function (req, res) {
  const user_schedule = req.body;
  console.log("==userSchedule post ==", user_schedule);
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
});
router.delete("/userDepartment", function (req, res) {
  const user_department = req.body;
  try {
    sequelize
      .query(
        `
         DELETE FROM user_department
         WHERE
             user_id=${user_department.user_id} AND
             department_id=${user_department.department_id}
        `
      )
      .then(function ([results, metadata]) {
        res.send("added ok ");
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/userInSchedule", function (req, res) {
  try {
    sequelize
      .query(
        `
         SELECT * 
          FROM
           user_schedule
        `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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
         SELECT *  FROM user_department
         WHERE
             userId=${userId} AND
             schedule_id=${scheduleID}
        `
      )
      .then(function ([results, metadata]) {
        if (results.length > 0) {
          res.send(true);
        } else {
          res.send(false);
        }
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/userInSchedule", function (req, res) {
  try {
    sequelize
      .query(
        `
         SELECT *  FROM user_schedule
        `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// router.update("/userDepartment",function(req,res){
//   const data = req.body.data;
//   sequelize.query(`update schedule set calender = ${data.info.userId} WHERE ${data.info.id}=${data.userId} `)
//   .then(function ([results, metadata]) {
//     res.send(results);
//   })
// })
router.get("/departmentOfSchedule/:scheduleId", function (req, res) {
  const s_id = req.params.scheduleId;
  console.log(s_id);
  const dep = "department_id";
  try {
    sequelize
      .query(
        `
         SELECT ${dep}
          FROM
           schedule where id=${s_id}
        `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/permissions", function (req, res) {
  const type = req.query.type;
  const user_id = parseInt(req.query.user_id);
  console.log(user_id);
  console.log(type);
  try {
    sequelize
      .query(
        `
         SELECT ${type}
          FROM user as u,permission as p
            where
             u.id=${user_id}
             and u.id=p.id
        `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/updateSchedule", function (req, res) {
  let updatedSchedule = req.body;
  try {
    sequelize
      .query(
        `
    UPDATE schedule
    SET 
    title='${updatedSchedule.title}',
    category='${updatedSchedule.category}',
    duDateClass='${updatedSchedule.dueDateClass}',
    start='${updatedSchedule.start}',
    end='${updatedSchedule.end}',
    department_id=${updatedSchedule.department_id}
    WHERE
    id=${updatedSchedule.schedule_id}
    `
      )
      .then(function ([results, metadata]) {
        res.send(" Updated Success !! ");
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/departments", function (req, res) {
  try {
    sequelize
      .query(
        `
         SELECT *
          FROM 
          department
        `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
