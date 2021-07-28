create database dojo;
USE dojo;

CREATE TABLE dojoTable(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);
​
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

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permission_id INT,
    dojo_id INT,
    FOREIGN KEY(id) REFERENCES profile(id),
    FOREIGN KEY(permission_id) REFERENCES permission(id),
    FOREIGN KEY(dojo_id) REFERENCES dojoTable(id)
);

-- ​
CREATE TABLE schedule(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    calenderId INT,
    title VARCHAR(40),
    category VARCHAR(40),
    duDateClass VARCHAR(40),
    start VARCHAR(40),
    end VARCHAR(40),
    isReadOnly BOOLEAN,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id)
);
CREATE TABLE user_department(
    user_id INT,
    depqrtment_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(depqrtment_id) REFERENCES department(id)
);
-- ​

USE dojo;
CREATE TABLE DepartmentDetails (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name TEXT,
    descreption TEXT
);

CREATE TABLE About (
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

USE dojo;
INSERT INTO DepartmentDetails VALUES(null, "Karate", "karate descreption");
INSERT INTO DepartmentDetails VALUES(null, "Tai Chi", "Tai Chi descreption");

INSERT INTO About VALUES(null, "motivation1", "overview1", null, 1);
INSERT INTO About VALUES(null, "motivation2", "overview2", null, 2);

--INSERT INTO contacts VALUES (null,"A","B","A","A","A","A")
-- INSERT INTO permission VALUES (null,true,true,true)
-- INSERT INTO permission VALUES (null,false,false,false)
-- INSERT INTO permission VALUES (null,false,true,false)


-- INSERT INTO dojoTable VALUES(null,"dojo1")