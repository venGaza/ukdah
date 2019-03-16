![Alt text](public/images/readme/banner.jpg?raw=true "Ukdah | Employee Recognition Portal")

<p align="center"> 
<a href="https://travis-ci.com/venGaza/ukdah"><img src="https://img.shields.io/travis/com/venGaza/ukdah/master.svg?label=Build%20%28Master%29&style=for-the-badge" alt="npm version"></a>
<a href="https://travis-ci.com/venGaza/ukdah"><img src="https://img.shields.io/travis/com/venGaza/ukdah/dev.svg?label=Build%20%28Dev%29&style=for-the-badge" alt="npm version"></a>
<a href="https://github.com/venGaza/ukdah/tree/master"><img src="https://img.shields.io/github/repo-size/venGaza/ukdah.svg?style=for-the-badge" alt="npm version"></a>
<a href="https://github.com/venGaza/ukdah/tree/master"><img src="https://img.shields.io/github/issues/venGaza/ukdah.svg?style=for-the-badge" alt="npm version">
<a href="https://github.com/venGaza/ukdah/tree/master"><img src="https://img.shields.io/github/license/venGaza/ukdah.svg?style=for-the-badge" alt="npm version"></a>
</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Download the Project (Command Line)](#download-the-project-command-line)
  - [Install](#install)
  - [Run](#run)
  - [Run with Docker](#run-with-docker)
  - [Persistence (via PM2)](#persistence-via-pm2)
  - [Errors](#errors)
- [Dependencies & Middleware](#dependencies--middleware)
- [Application Structure](#application-structure)
- [Database](#database)
- [Authentication](#authentication)
- [Certificate Generation](#certificate-generation)
- [Business Intelligence Analytics](#business-intelligence-analytics)
- [Built With](#built-with)
- [Authors and Contributions](#authors-and-contributions)
- [Final Thoughts](#final-thoughts)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

Introduction: Awards play a critical role in recognizing employee accomplishments and boosting morale within an organization but most systems are out of date or too reliant upon an extensive human resources staff. The Ukdah team aims to solve this problem by working on a database-backed, responsive website which can be used to track and deliver employee recognition awards. The website will streamline the recognition process by giving users the ability to send recognition to those that they feel are deserving, and it will also provide critical business intelligence data to users overseeing the management of their awards program. Every employee deserves to be recognized for the value he/she brings to their respective organizations while organizations deserve a simple and effective solution to accomplish this. The Ukdah employee recognition website will lead the way!

User Perspective: The users of this website will be employees of larger enterprise organizations who are having trouble managing their awards recognition process. These users can be split into two groups which include basic users who are authorized to give out rewards and admin users who serve in a managerial role to oversee the awards program for their entire enterprise. Both users will first encounter an authentication process where they will have to sign into an account, or create one if they have not done so yet. Basic users will need to submit a signature image in order to complete their account sign up since the signature will need to be used for their certificates. The authentication system will also feature a forgotten password recovery process which will email users a forgotten password to the registered email address. Once logged in, a basic user will have the ability to create an award. This will require the user to enter some basic information about the employee being generated and then the system will generate the certificate and email it to the awardee in a PDF format. Basic users will be able to see all the certificates they have awarded and will be able to delete them if they change their mind. When an admin user log in, they will not have the ability to create any awards. Instead, they will be presented with various data statistics in regards to the awards such as amounts, regions, and awarders. The admin user will also have the ability to add/edit/delete both other admin users and basic users.

## Demo

<p align="center"><img src="public/images/readme/demo.gif?raw=true"></p>

A live demonstration of this web application can be accessed at the following link (OSU VPN REQUIRED):

[http://flip1.engr.oregonstate.edu:49876](http://flip1.engr.oregonstate.edu:49876)

If you do not have access to the OSU VPN, please download the project and view locally. A copy can be obtained at the following github repository: 

[https://github.com/venGaza/ukdah](https://github.com/venGaza/ukdah)

## Screenshots

<p float="left" align="center">
  <img src="public/images/readme/s1.jpg?raw=true" width="200" />
  <img src="public/images/readme/s2.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/s3.jpg?raw=true" width="200" />
</p>

<p float="left" align="center">
  <img src="public/images/readme/s4.jpg?raw=true" width="200" />
  <img src="public/images/readme/s5.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/s6.jpg?raw=true" width="200" />
</p>

<p float="left" align="center">
  <img src="public/images/readme/s7.jpg?raw=true" width="200" />
  <img src="public/images/readme/s8.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/s9.jpg?raw=true" width="200" />
</p>

<p float="left" align="center">
  <img src="public/images/readme/s10.jpg?raw=true" width="200" />
  <img src="public/images/readme/s11.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/s12.jpg?raw=true" width="200" />
</p>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

  - [Node](https://nodejs.org/en/download/)
  - [Git](https://git-scm.com/) 
  - [Docker(Optional)](https://www.docker.com/)

### Download the Project (Command Line)

Navigate to desired directory within the command line. Then download the project with the following command:

```bash
$ git clone https://github.com/venGaza/ukdah.git
```

### Install

Next, run the following command to install Ukdah's dependencies:

```bash
# Move into project directory and install dependencies
$ cd ukdah
$ npm install
```

### Run

Lastly, the web application can be started with the following command:

```bash
# Default Port (3000)
$ npm start 

or

# Specify port(PORT var will persist until shell is closed)

#Windows
$ set PORT=<desiredPort>
$ npm start

#MacOS
$ export PORT=<desiredPort>
$ npm start

# Example (Start app on port 8080)
$ export PORT=8080
$ npm start

# To stop the process use the keyboard interrupt ^c
```

### Run with Docker

If you would like to run this application using Docker, run the following commands from within the Ukdah directory:

```bash
# Build the image from the dockerfile
docker build --tag=<NameOfApp> .  # Do not forget the period at the end!!! This references the directory.

# Run the app inside the image container
docker run -d -p <desiredPort>:3000 <NameOfApp>

# Example
docker run -d -p 3000:3000 ukdah
```

When you are finished running the app, you can run the following command to stop the container:

```bash
# Stop container
docker container stop <NameOfApp>

# Example
docker container stop ukdah
```

Looking to scale the application with docker services? Try running the docker-compose file which by default will launch 5 replicas of Ukdah (let that employee recognition rain down): 

```bash
# Start the swarm
docker swarm init

# Start the service
docker stack deploy -c docker-compose.yml <NameOfApp>

# Stop the service and the swarm
docker stack rm <NameOfApp>
docker swarm leave --force
```

### Persistence (via PM2)

PM2 is a process kept in the background, a daemon, that takes care of all your running processes. If you wish to give the web application persistence, run the following command to start the pm2 daemon:

```bash
# Start the PM2 daemon (< npm 5)
$ export PORT=<desiredPortNum> #or for Windows $ set PORT=<desiredPortNum> 
$ node_modules/.bin/pm2 start npm --name <NameOfApp> -- start

# Start the PM2 daemon (> npm 5)
$ export PORT=<desiredPortNum>
$ npx pm2 start npm --name <NameOfApp> -- start
```

To stop the daemon run the following command:

```bash
# Stop the PM2 daemon
$ node_modules/.bin/pm2 stop <NameOfApp>

# Stop the PM2 daemon (> npm 5)
$ npx pm2 stop <NameOfApp>
```

### Errors

Errors running the web application? Try reinstalling the dependencies:

```bash
# Clear out the cache
$ npm cache clean --force

# Delete the node moudles
$ rm -rf node_modules

# Reinstall node modules
$ npm install

# Try to run
$ npm start
```

## Dependencies & Middleware

- [expressJS](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [Passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [PM2](https://github.com/Unitech/pm2) - PM2 is a production process manager for Node.js applications with a built-in load balancer. 
- [Helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers
- [serve-favicon](https://expressjs.com/en/resources/middleware/serve-favicon.html) - Serve a favicon
- [SQLite3](https://www.npmjs.com/package/sqlite3) - Asynchronous, non-blocking SQLite3 bindings for Node.js
- [Morgan](https://expressjs.com/en/resources/middleware/morgan.html) - HTTP request logger
- [Cookie-Parser](https://expressjs.com/en/resources/middleware/cookie-parser.html)- Parse cookie header and populate req.cookies. See also cookies and keygrip
- [Path](https://nodejs.org/api/path.html) - The path module provides utilities for working with file and directory paths.
- [Body-Parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
- [Nodemailer](https://nodemailer.com) - Nodemailer is a module to send emails.
- [PDFKit](http://pdfkit.org/) - PDF document generation library
- [Passport](http://www.passportjs.org/) - Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.
- [Dotenv](https://github.com/motdotla/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [Snyk](https://snyk.io/) - A developer-first solution that automates finding & fixing vulnerabilities in your dependencies

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to SQLite3 database. It also requires the routes and models we'll be using in the application.
- `bin/` - This folder contains the www binary for core startup scripts.
- `certificates/` - This folder contains the user created certificates.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our web application.
- `views/` - This folder contains the layout of the webpages. 
- `models/` - This folder represents data, implements business logic and handles storage.
- `package.json` - File contains project dependency information for npm installs.
- `package-lock.json` - automatically generated for any operations where npm modifies either the node_modules tree, or package.json. 
- `public/` - Holds static assets such at CSS, JS, and images.
- `tests/` - This folder contains the unit tests for the application.

## Database
This project leverages an embedded database, SQLite, as opposed to the client-server model.  It writes all information to a database file in the models folder instead of making use of the memory function. The data manipulation queries have also been included if you wish to edit the design. Below is the entity relationship diagram for the current database file:  

![Alt text](public/images/readme/ukdahERD.png?raw=true "Entity Relationship Diagram")

## Authentication
Originally, the Ukdah team planned on implementing user authentication using Passport, but ran into issues trying to integrate with SQLite. The original strategy was to use the passport-local strategy to authenticate users and combining it with the Bcrypt module in order to both hash and salt the stored passwords for security purposes. User sessions would be managed with JSON Web Tokens (JWT) instead of sessions. The strategy also called for using the Sequelize module to help simplify the integeration of all these modules with SQLite. Unfortunately, we ran out of time trying to implement this plan and instead made use of a less robust solution by using global variables. When users arrive at the website, they are presented with two options, login or signup. If a user is new, they will go to the sign up page and create an account by entering a name, password, email, region, user type, and optionally a PNG signature to be used as the signature on their certificates. 

They will then be redirected to the login page to login with their credentials. The login page performs a query and checks the SQLite db to see if their is an email and password that matches the input. If there is a match, the user or admin is directed to their specified index page. Users will not have access to admin pages and vice versa.

<p float="left" align="center">
  <img src="public/images/readme/auth1.jpg?raw=true" width="200" />
  <img src="public/images/readme/auth2.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/auth3.jpg?raw=true" width="200" />
</p>

An additional functionality is that users have the ability to request forgotten passwords. If they navigate to the forgotten password view, they will be prompted to enter their account email. The web application will verify the email exists (will return an error if it does not), and then it will automatically generate an email with the account password. A completion message will notify the user when the email has been sent. An example of the lost password message is below: 

![Alt text](public/images/readme/passwordEmail.jpg?raw=true "Password Email")

## Certificate Generation
The application makes use of two main node modules to accomplish the certificate generation which are PDFKit and Nodemailer. When users sign in to the application, they will first arrive at the user index page and are presented with a basic menu. In order for users to send a certificate, they must first add their employees names and emails to their profile by filling out a simple form. After adding their employees, the user will then navigate to the create award page. This will be another form which provides drop downs for types of awards the user can give and their current employee list. Once the selections have been made, the user just needs to press send and a certificate will automatically be generated and sent to the selected employees email automatically. 

The web application first uses PDFkit to overlay text over a prerendered image. The originally planned to send the form data to a preformatted LaTeX template, but decided against this route due to the complexity. Node then sends a database query to retrieve the user's name, employee's name, date, and signature. It appends each of these items at a specific coordinate over the certificate image to give the appearance of being filled out and then outputs the final product to a certificate folder. The next module that is used is Nodemailer. This module simply connects the application to a third party email service and emails the a pregenerated message (again using the query data from the prevous part) and certificate as an attachment. One of the big considerations in setting up the email integration was how to store the email account credentials since the repository was public. We decided to adhere to the 12 factor application methodology and store the credentials in the environment (.env file) rather than creating a configuration file. This required the use of the dotenv module to read the variables into the environment. With all this in place, the application will email an output that looks like this: 

<p float="left" align="center">
  <img src="public/images/readme/cert1.jpg?raw=true" width="200" />
  <img src="public/images/readme/cert2.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/cert3.jpg?raw=true" width="200" />
</p>

## Business Intelligence Analytics

A functionality allowed to adminstrator users is the ability to generate CSV files from the database. This functionality can be reached through the administrator menu and features three separate categories of options. When a link is clicked on this page, the user is taken to a second page which previews the CSV file they are about to download. If the file is correct, the user can click the "download" button to save the CSV file to their computer. Otherwise, they can choose to return to the business intelligence page and choose a different option.

The first section, "premade intelligence", includes two buttons, "Users by created awards" and "Regions by most awards", respectively. The first button will take the user to the CSV preview page where it will list the user and the number of awards they have created in descending order. This CSV file can then be downloaded from that page. The second button will also go the CSV preview page, but it will instead list the regions by the number of awards received by users within those regions. This CSV file can then be downloaded from that page. The second section allows the download of each database table as a CSV file. Each table has a respective link that will take the user to the CSV preview page and allow them to download the table from there. 

<p float="left" align="center">
  <img src="public/images/readme/premade1.jpg?raw=true" width="200" />
  <img src="public/images/readme/premade2.jpg?raw=true" width="200" /> 
  <img src="public/images/readme/premade3.jpg?raw=true" width="200" />
</p>

The third and final section is the most expansive of the Intelligence abilities. As proper access to data can be incredibly useful in developing a better understanding of a company, community, or any group of people, it was important that the Intelligence feature was robust and able to generate any dataset that the user may require. In the "Custom Intelligence" section of the page, the four major tables of the database have been given their own tables, with each category given their own row with a "select", "count", and "group by" feature. To include a category in the data selection, all the user has to do is choose the checkbox corresponding to the correct row. If the user would like to have that value counted, they can check the checkbox next to the select box. If they wish to group the dataset by that value, there is a radio button on the far right side of the tree. As there cannot be multiple values passed in as "group by", this is a radio button and only one of the data points throughout the whole table can be selected. When the user determines that they have all of the data they wish for, they can click the submit button at the bottom of the table and that will take them to the CSV preview page where they can download the data that they have requested.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.
* [nodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [expressJS](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [SQLite](https://www.sqlite.org/index.html) - SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
* [DB Fiddle](https://www.db-fiddle.com/) - SQL playground
* [DB Browser for SQLite](https://sqlitebrowser.org/) - GUI Interface for SQLite
* [Docker](https://www.docker.com/) - Docker provides container software that is ideal for developers and teams looking to get started and experimenting with container-based applications.
* [Postman](https://www.getpostman.com/) - Postman streamlines the development process and captures a single source of truth about your APIs while also simplifying collaboration across your teams and organizations.
* [Travis CI](https://travis-ci.com/) - Test and Deploy with Confidence. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes!
* [Slack](https://slack.com/) - Slack is where work flows. It's where the people you need, the information you share, and the tools you use come together to get things done. 
* [Git](https://git-scm.com/) - Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
* [Github](https://github.com/) - GitHub brings together the world's largest community of developers to discover, share, and build better software.

## Authors and Contributions

- **Emmet Cooke** - [emmCooke](https://github.com/emmCooke)
  - Contributions (7 Commits)
    -	Low-Fidelity View Designs
    -	Midpoint Project Report
    -	Homepage Lorem Ipsum -> English conversion
    -	Admin View (adminBusiness)
    - CSV Files
    - Analytics
    - Finalized Intelligence Feature
- **Dustin Jones** - [venGaza](https://github.com/venGaza)
  - Contributions (112 Commits)
    - README
    -	GitHub Repo
    - Github branch manager
    -	.gitignore
    -	Travis-ci integration
    -	Dockerfile
    -	Docker-compose
    -	Snyk Testing
    -	Node/Express Skeleton
    -	Initial Dependencies
    -	Final Entity Relationship Diagram
    -	Data Definition Queries
    - Database Sample data
    -	Initial Data Manipulation Queries
    -	SQLite.db
    -	Express-SQLite Integration
    -	Express-Frontend Integration
    -	Index images + optimization
    -	Favicon
    -	Initial Views
    -	Admin Test Form
    -	Test Routes 
    -	PM2 Process Manager Integration
    -	FLIP hosting (Weekly Updates)
    -	Login View + Login Error Message
    -	Create Account View
    -	Admin Navigation
    -	Admin Views and Forms (Index, Awards, Award Types, Employees, UpdateUser)
    -	Admin Routes (Index, Awards, Award Types, Employees, UpdateUser)
    - Admin Data Manipulation Queries (Index, Awards, Award Types, Employees, UpdateUser)
    -	Admin Data Tables
    -	Datatables.net Integration
    - Lost Password Recovery
    - User View (UserEmployees - Create, Read, Delete)
    - User Navigation
    - Certificate Email Delivery
    - Dotenv Integration
    - Project Poster
- **Sean Santoki** - [santokis](https://github.com/santokis)
  - Contributions (19 Commits)
    -	SQLite.db
    -	Initial ERD
    -	Midpoint Project Report
    -	Authentication
    -	PDFKit Integration
    -	Form to PDF Certificate Generation
    -	Certificate Template
    -	Account View
    - User Views (Create Award View, Award History, Settings)

## Final Thoughts
The Ukdah employee recognition portal aims to streamline the recognition process which should  not only lead to a better award program but also free up critical company resources. Employee recognition plays an important part of an organization's award program and provides a critical morale boost when it is executed properly. At the end of the day, recognizing employees should be easy and efficient leading to both a happy employee and a happy organization.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Oregon State University](https://oregonstate.edu)