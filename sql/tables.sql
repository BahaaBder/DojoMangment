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

--INSERT INTO contacts VALUES (null,"A","B","A","A","A","A")
-- INSERT INTO permission VALUES (null,true,true,true)
-- INSERT INTO permission VALUES (null,false,false,false)
-- INSERT INTO permission VALUES (null,false,true,false)


-- INSERT INTO dojoTable VALUES(null,"dojo1")