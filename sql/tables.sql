create database dojo;
USE dojo;

-- CREATE TABLE dojoTable(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20)
-- );
​USE dojo;
CREATE TABLE permission(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin BOOLEAN,
    coach BOOLEAN,
    trainee BOOLEAN
);
-- ​
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) 
);
-- ​

​USE dojo;
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
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permission_id INT,
    dojo_id INT,
    FOREIGN KEY(id) REFERENCES profile(id),
    FOREIGN KEY(permission_id) REFERENCES permission(id),
    FOREIGN KEY(dojo_id) REFERENCES dojoTable(id)
);

-- ​
-- CREATE TABLE schedule(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     calenderId INT,
--     title VARCHAR(40),
--     category VARCHAR(40),
--     duDateClass VARCHAR(40),
--     start VARCHAR(40),
--     end VARCHAR(40),
--     isReadOnly BOOLEAN,
--     user_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id)
-- );

​USE dojo;
drop table user_department;
​USE dojo;
CREATE TABLE user_department(
    user_id INT,
    department_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

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

USE dojo;
INSERT INTO dojoTable VALUES(null,"dojo1")


-- USE dojo;
-- CREATE TABLE DepartmentDetails (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     department_name TEXT,
--     descreption TEXT
-- );

-- CREATE TABLE About (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     motivations TEXT,
--     overview TEXT,
--     dojo_id int,
--     dep_details_id int,

--     FOREIGN KEY(dojo_id) REFERENCES dojoTable(id),
--     FOREIGN KEY(dep_details_id) REFERENCES DepartmentDetails(id)
-- );

-- USE dojo;
-- drop table About, DepartmentDetails

-- USE dojo;
-- INSERT INTO DepartmentDetails VALUES(null, "Karate", "karate descreption");
-- INSERT INTO DepartmentDetails VALUES(null, "Tai Chi", "Tai Chi descreption");

-- INSERT INTO About VALUES(null, "motivation1", "overview1", null, 1);
-- INSERT INTO About VALUES(null, "motivation2", "overview2", null, 2);

​USE dojo;
INSERT INTO dojoTable VALUES(null, "dojo1");

​USE dojo;
INSERT INTO coach
 VALUES (null,"Wolf","Boxing",1998,
            "https://i.pinimg.com/originals/2f/52/22/2f5222ae1b29f92873e17c8753bda5fe.jpg", 
            "Wolf is a proffessional Boxing fighter, he start traing befor 5 years, his first professional boxing fight was before 2 years",1);

INSERT INTO coach VALUES (null,"Tiger","Boxing",1994,
            "https://st2.depositphotos.com/4265001/9912/v/950/depositphotos_99122894-stock-illustration-tiger-dressed-up-in-boxing.jpg",
            "Tiger is a proffessional Boxing fighter, he start traing befor 5 years, his first professional boxing fight was before 2 years",1);
            
INSERT INTO coach VALUES (null,"Pitbull","MMA",1991,
            "https://i.pinimg.com/originals/c7/8d/21/c78d210162d74909f1a9ed1460cf1c6d.jpg",
            "Pitbull is a proffessional MMA fighter, he start traing befor 7 years, his first professional boxing fight was before 5 years",1);
            
INSERT INTO coach VALUES (null,"Monkey","MMA",1963,
            "https://i.pinimg.com/236x/15/c8/25/15c825b1868d7a780c7122e600c94d48.jpg",
            "Monkey is a proffessional MMA fighter, he start traing befor 13 years, his first professional boxing fight was before 6 years",1);
            
INSERT INTO coach VALUES (null,"Banda","Muay Thai",2016,
            "https://cdn1.vectorstock.com/i/1000x1000/79/65/panda-muay-thai-vector-3527965.jpg",
            "Banda is a proffessional Muay Thai fighter, he start traing befor 13 years, his first professional boxing fight was before 6 years",1);
            
INSERT INTO contacts VALUES (null,"A","B","A","A","A","A")
INSERT INTO permission VALUES (null,true,true,true)
INSERT INTO permission VALUES (null,false,false,false)
INSERT INTO permission VALUES (null,false,true,false)


INSERT INTO dojoTable VALUES(null,"dojo1")