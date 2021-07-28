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
  console.log(req.body);
  if (await emailIsExists(req.body.useremail)) {
    await addToContacts(req.body);
  } else {
    res.send("error");
  }
  //await addToContacts(req.body);
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
  console.log(newsSchedule);

  try {
    console.log(" inserting ");
    sequelize
      .query(
        `
        INSERT INTO schedule
         VALUES(
            ${newSchedule.id},
            ${newSchedule.calenderId},
            '${newSchedule.title}',
            '${newSchedule.category}',
            '${newSchedule.duDateClass}',
            '${newSchedule.start}',
            '${newSchedule.end}',
            )
        `
      )
      .then(function ([results, metadata]) {
        res.send("added ok ");
      });
  } catch (error) {}
});

router.get("/about", function(req, res){
  sequelize.query(`SELECT * FROM about, departmentdetails WHERE about.dep_details_id = departmentdetails.id `)
  .then(function ([results, metadata]) {
    res.send(results);
  })
})

module.exports = router;