-- create database dojo;
-- USE dojo;

use dojo;
CREATE TABLE dojoTable(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);



INSERT INTO dojoTable VALUES(null,"dojo2")

​USE dojo;
CREATE TABLE permission(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin BOOLEAN,
    coach BOOLEAN,
    trainee BOOLEAN
);
-- ​


CREATE TABLE schedule(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    calendarId INT,
    title VARCHAR(40),
    category VARCHAR(40),
    duDateClass VARCHAR(40),
    start VARCHAR(40),
    end VARCHAR(40),
    departmentID INT,
    FOREIGN KEY(departmentID) REFERENCES department(id)
);
--========================== department =====================

INSERT INTO department VALUES (null,"MMA Mixed Martil art ");
INSERT INTO department VALUES (null,"classic boxing ");
INSERT INTO department VALUES (null,"brazlian jijutsu ");
use dojo;
INSERT INTO department VALUES (null,"general for testing");



CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) 
);
-- ​
drop table department;

-- =======================profile=================================\
use dojo;
CREATE TABLE profile(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(40),
     email VARCHAR(40),
     password VARCHAR(40),
     address VARCHAR(40),
     phoneNumber VARCHAR(40),
     age INT
);
-- ​
-- ​
​USE dojo;
--==============================user =======================================
​USE dojo;

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permission_id INT,
    dojo_id INT,
    FOREIGN KEY(id) REFERENCES profile(id),
    FOREIGN KEY(permission_id) REFERENCES permission(id),
    FOREIGN KEY(dojo_id) REFERENCES dojoTable(id)
);
​USE dojo;
INSERT INTO permission VALUES (null,1,1,1);
INSERT INTO permission VALUES (null,1,1,1);

INSERT INTO user VALUES (1,1,1);
INSERT INTO user VALUES (2,1,1);

--
use dojo;
DELETE FROM user_department WHERE user_id=1;

insert into user_department VALUES(1,1);
insert into user_department VALUES(1,2);
insert into user_department VALUES(1,3);





CREATE TABLE user_department(
    user_id INT,
    department_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);
​



Create TABLE coach(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40),
    type VARCHAR(40),
    year INT,
    img VARCHAR(1000),
    descrShort VARCHAR(1000),
    dojo_id INT,
    FOREIGN KEY(dojo_id) REFERENCES dojoTable(id)

);
-- ​


////
use dojo; 

SET FOREIGN_KEY_CHECKS=0;
drop TABLE schedule;

-- ==============================MMA =================================
INSERT INTO schedule VALUES (null,1,"MMA Mixed Martil art ","time","","2021-07-25T19:30:00+01:00","2021-07-25T19:30:00+01:00",1);
INSERT INTO schedule VALUES (null,1,"MMA Mixed Martil art ","time","","2021-07-27T19:30:00+01:00","2021-07-27T21:30:00+01:00",1);
INSERT INTO schedule VALUES (null,1,"MMA Mixed Martil art ","time","","2021-07-29T19:30:00+01:00","2021-07-29T21:30:00+01:00",1);
INSERT INTO schedule VALUES (null,2,"Classic boxing","time","","2021-07-25T19:30:00+01:00",'2021-07-25T19:30:00+01:00',2);
INSERT INTO schedule VALUES (null,2,"Classic Mma boxing","time","",'2021-07-28T21:30:00+01:00','2021-07-28T23:30:00+01:00',2);
INSERT INTO schedule VALUES (null,2,"Classic MMA boxing","time","","2021-07-26T16:30:00+01:00","2021-07-26T20:30:00+01:00",2);
use dojo;
INSERT INTO schedule VALUES (null,3,"bjj ","time","","2021-07-29T12:30:00+01:00","2021-07-29T20:30:00+01:00",3);
INSERT INTO schedule VALUES (null,3,"bjj","time","","2021-07-29T12:30:00+01:00","2021-07-29T20:30:00+01:00",3);

INSERT INTO schedule VALUES (null,4,"general for testing ","time","","2021-07-29T12:30:00+01:00","2021-07-29T20:30:00+01:00",4);

INSERT INTO schedule VALUES (null,3,"Classic boxing","time","",'2021-07-26T19:30:00+01:00','2021-07-26T19:30:00+01:00'3);
INSERT INTO schedule VALUES (null,3,"Classic boxing","time","",'2021-07-28T19:30:00+01:00','2021-07-28T19:30:00+01:00'3);
INSERT INTO schedule VALUES (null,3,"Classic boxing","time","",'2021-07-28T21:30:00+01:00','2021-07-28T23:30:00+01:00'3);
-- ==============================Boxing =================================
use dojo;
    -- {
    --     id: '5',
    --     calendarId: '2',
    --     title: boxing,
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-28T16:30:00+01:00',
    --     end: '2021-07-28T20:30:00+01:00',
    -- },
    -- /// bjj
    -- {
    --     id: '6',
    --     calendarId: '3',
    --     title: bjj,
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-30T16:30:00+01:00',
    --     end: '2021-07-30T20:30:00+01:00',
    --     ///// this determine  the color of event background 
    --     bgColor:'#BF0E13'
    -- },
    -- ///
    -- {
    --     id: '7',
    --     calendarId: '4',
    --     title: " takewondo ",
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-25T09:30:00+01:00',
    --     end: '2021-07-25T11:30:00+01:00'
    -- },
    -- {
    --     id: '8',
    --     calendarId: '4',
    --     title: " taekwondo  ",
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-26T09:30:00+01:00',
    --     end: '2021-07-26T11:30:00+01:00'
    -- },
    -- {
    --     id: '9',
    --     calendarId: '4',
    --     title: " taekwondo  ",
    --     category: 'time',
    --     dueDateClass: '',
    --     start: '2021-07-28T09:30:00+01:00',
    --     end: '2021-07-28T12:30:00+01:00'
    -- },
-- ==============================Brazlian=================================






-- USE dojo;
-- CREATE TABLE DepartmentDetails (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     department_name TEXT,
--     descreption TEXT
-- );
USE dojo;
CREATE TABLE About
 (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    motivations TEXT,
    overview TEXT,
    dojo_id int,
    dep_details_id int,
    FOREIGN KEY(dojo_id) REFERENCES dojoTable(id),
    FOREIGN KEY(dep_details_id) REFERENCES DepartmentDetails(id)
);

-- USE dojo;
-- drop table About, DepartmentDetails

-- USE dojo;
-- INSERT INTO DepartmentDetails VALUES(null, "Karate", "karate descreption");
-- INSERT INTO DepartmentDetails VALUES(null, "Tai Chi", "Tai Chi descreption");

-- INSERT INTO About VALUES(null, "motivation1", "overview1", null, 1);
-- INSERT INTO About VALUES(null, "motivation2", "overview2", null, 2);

-- ​USE dojo;
-- INSERT INTO dojoTable VALUES(null, "dojo1");

-- ​USE dojo;
-- INSERT INTO coach
--  VALUES (null,"Wolf","Boxing",1998,
--             "https://i.pinimg.com/originals/2f/52/22/2f5222ae1b29f92873e17c8753bda5fe.jpg", 
--             "Wolf is a proffessional Boxing fighter, he start traing befor 5 years, his first professional boxing fight was before 2 years",1);

-- INSERT INTO coach VALUES (null,"Tiger","Boxing",1994,
--             "https://st2.depositphotos.com/4265001/9912/v/950/depositphotos_99122894-stock-illustration-tiger-dressed-up-in-boxing.jpg",
--             "Tiger is a proffessional Boxing fighter, he start traing befor 5 years, his first professional boxing fight was before 2 years",1);
            
-- INSERT INTO coach VALUES (null,"Pitbull","MMA",1991,
--             "https://i.pinimg.com/originals/c7/8d/21/c78d210162d74909f1a9ed1460cf1c6d.jpg",
--             "Pitbull is a proffessional MMA fighter, he start traing befor 7 years, his first professional boxing fight was before 5 years",1);
            
-- INSERT INTO coach VALUES (null,"Monkey","MMA",1963,
--             "https://i.pinimg.com/236x/15/c8/25/15c825b1868d7a780c7122e600c94d48.jpg",
--             "Monkey is a proffessional MMA fighter, he start traing befor 13 years, his first professional boxing fight was before 6 years",1);
            
-- INSERT INTO coach VALUES (null,"Banda","Muay Thai",2016,
--             "https://cdn1.vectorstock.com/i/1000x1000/79/65/panda-muay-thai-vector-3527965.jpg",
--             "Banda is a proffessional Muay Thai fighter, he start traing befor 13 years, his first professional boxing fight was before 6 years",1);
            
-- INSERT INTO contacts VALUES (null,"A","B","A","A","A","A")
-- INSERT INTO permission VALUES (null,true,true,true)
-- INSERT INTO permission VALUES (null,false,false,false)
-- INSERT INTO permission VALUES (null,false,true,false)


-- INSERT INTO dojoTable VALUES(null,"dojo1")