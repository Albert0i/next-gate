
DROP TABLE users; 

CREATE TABLE users (
    id      INT NOT NULL AUTO_INCREMENT,
    _id     CHAR(24) DEFAULT '', 
    name    VARCHAR(255) NOT NULL,
    age     INT,
    isAdmin BOOLEAN DEFAULT false, 
    updatedAt TIMESTAMP, 
    createdAt TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id)
);

INSERT INTO users (name, age) values('Kyle', 26);
INSERT INTO users (name, age) values('Sally', 27);
INSERT INTO users (name, age, isAdmin, createdAt) 
    values('Dave', 33, true, STR_TO_DATE('2022-10-06T07:16:37.000Z','%Y-%m-%dT%H:%i:%s.%fZ'));

-- 
-- SQL AUTO INCREMENT Field
-- https://www.w3schools.com/sql/sql_autoincrement.asp
-- 
-- MySQL Data Types
-- https://www.w3schools.com/mysql/mysql_datatypes.asp
--
-- MongoDB - Datatypes
-- https://www.tutorialspoint.com/mongodb/mongodb_datatype.htm
--
-- "Incorrect datetime value: '2023-10-06T07:16:37.000Z' for column 'createdAt' at row 
--
-- convert string to datetime in my sql [duplicate]
-- https://stackoverflow.com/questions/44802061/convert-string-to-datetime-in-my-sql
--