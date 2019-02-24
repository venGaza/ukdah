-- Ukdah Data Definition Queries 

--
-- Table structure for userTypeID
--

DROP TABLE IF EXISTS userTypeID;
CREATE TABLE userTypeID (
	userTypeID INTEGER PRIMARY KEY,
	userType text NOT NULL
);

--
-- Data for table userTypeID
--

INSERT INTO userTypeID (userType)
VALUES
    ('Normal'),
    ('Admin');

--
-- Table structure for region
--

DROP TABLE IF EXISTS region;
CREATE TABLE region (
	regID INTEGER PRIMARY KEY,
	regName text NOT NULL
);

--
-- Example data for table region
--

INSERT INTO region (regName)
VALUES
    ('North America'),
    ('South America'),
    ('Europe'),
    ('Africa'),
    ('Asia'),
    ('Australia'),
    ('Antarctica'),
    ('Mars');

--
-- Table structure for table user
-- 

DROP TABLE IF EXISTS user;
CREATE TABLE user (
	userID integer PRIMARY KEY,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	userPass varchar(255) NOT NULL,
    userDate datetime DEFAULT current_timestamp NOT NULL,
    userSig blob,
    userTypeID integer NOT NULL,
    regID integer NOT NULL,
    FOREIGN KEY (userTypeID) REFERENCES userTypeID (userTypeID)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (regID) REFERENCES region (regID)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT unique_email UNIQUE (email)
);

--
-- Example data for table user
--

INSERT INTO user (fname, lname, email, userPass, userDate, userTypeID, regID) 
VALUES 
    ('Sean', 'Santoki', 'emailSean@gmail.com', 'password', current_timestamp, 1, 1),
    ('Emmet', 'Cooke', 'emailEmmet@gmail.com', 'password', current_timestamp, 1, 2),
    ('Dustin', 'Jones', 'emailDustin@gmail.com', 'password', current_timestamp, 1, 3),
    ('Ryan', 'Gambord', 'emailRyan@gmail.com', 'password', current_timestamp, 1, 4),
    ('Tom', 'Brady', 'emailTom@gmail.com', 'password', current_timestamp, 1, 5),
    ('Bill', 'Belichek', 'emailBill@gmail.com', 'password', current_timestamp, 1, 6),
    ('Jared', 'Goff', 'emailJared@gmail.com', 'password', current_timestamp, 1, 7),
    ('admin', 'account', 'admin', 'admin', current_timestamp, 2, 8),
    ('user', 'user', 'user', 'user', current_timestamp, 1, 8);

--
-- Table structure for table employee
-- 

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
	empID integer PRIMARY KEY,
    userID integer NOT NULL,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES user (userID)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT unique_email UNIQUE (email)
);

--
-- Example data for table employee
-- 

INSERT INTO employee (userID, fname, lname, email) 
VALUES 
    (1, 'Ben', 'Brewster', 'email1@email.com'),
    (1, 'Nathan', 'Woodfield', 'email2@email.com'),
    (1, 'Arthur', 'Vallejo', 'email3@email.com'),
    (2, 'Terry "The Terrorizer"', 'Rooker', 'email4@email.com'),
    (2, 'Kevin', 'McGrath', 'email5@email.com'),
    (2, 'Eleanor', 'Covett', 'email6@email.com'),
    (3, 'Barbara', 'Desmond', 'email7@email.com'),
    (3, 'Samina', 'Ehsan', 'email@8email.com'),
    (3, 'Macy', 'Sutcliffe', 'email9@email.com'),
    (4, 'Paul', 'Paulson', 'email10@email.com'),
    (4, 'Max', 'Corll', 'email11@email.com'),
    (4, 'Annie', 'Ishii', 'email12@email.com');

--
-- Table structure for table award
-- 

DROP TABLE IF EXISTS award;
CREATE TABLE award (
	awardID integer PRIMARY KEY,
    awardName varchar(255) NOT NULL,
    awardDesc varchar(255) NOT NULL,
    CONSTRAINT unique_name UNIQUE (awardName)
);

--
-- Example data for table award
--

INSERT INTO award (awardName, awardDesc)
VALUES
    ('Employee of the Year', "In recognition of outstanding performance this year."),
    ('Employee of the Month', "In recognition of outstanding performance this month."),
    ('Employee of the Week', "In recognition of outstanding performance this week."),
    ('MVP', "Most valuable player"),
    ('Top Coach', "Someone has to steer the ship"),
    ('Spirit Award', "Just because everyone deserves something, right?");

--
-- Table structure for table userAwards
-- 

DROP TABLE IF EXISTS userAwards;
CREATE TABLE userAwards (
    certID integer PRIMARY KEY,
    userID integer NOT NULL,
    empID integer NOT NULL,
    awardID integer NOT NULL,
    awardDate datetime NOT NULL,
    FOREIGN KEY (userID) REFERENCES user (userID)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (empID) REFERENCES employee (empID)
    ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (awardID) REFERENCES award (awardID)
    ON DELETE CASCADE ON UPDATE NO ACTION
);

--
-- Example data for userAwards
--

INSERT INTO userAwards (userID, empID, awardID, awardDate)
VALUES
    (1, 1, 1, current_timestamp),
    (2, 4, 2, current_timestamp),
    (3, 7, 3, current_timestamp),
    (4, 10, 4, current_timestamp),
    (1, 2, 5, current_timestamp),
    (2, 5, 6, current_timestamp);
    