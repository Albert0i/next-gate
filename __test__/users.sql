
DROP TABLE users; 

CREATE TABLE users (
    id      int NOT NULL AUTO_INCREMENT,
    name    varchar(255) NOT NULL,    
    age     int,
    PRIMARY KEY (id)
);

INSERT INTO users (name, age) values('Kyle', 26);
INSERT INTO users (name, age) values('Sally', 26);

-- 
-- SQL AUTO INCREMENT Field
-- https://www.w3schools.com/sql/sql_autoincrement.asp
-- 
