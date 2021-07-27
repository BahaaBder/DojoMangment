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

router.post("/schedules", (req, res) => {
  const coach = req.body;
  console.log(newsSchedule);

  try {
    console.log(" inserting ");
    sequelize
      .query(
        `
        INSERT INTO schedule
         VALUES(
            ${coach.id},
            ${coach.calenderId},
            '${coach.title}',
            '${coach.category}',
            '${coach.duDateClass}',
            '${coach.start}',
            '${coach.end}',
            )
        `
      )
      .then(function ([results, metadata]) {
        res.send("added ok ");
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

module.exports = router;
