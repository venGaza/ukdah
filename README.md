![Alt text](public/images/banner.jpg?raw=true "Ukdah | Employee Recognition Portal")

<p align="center"> 
<a href="https://travis-ci.com/venGaza/ukdah"><img src="https://img.shields.io/travis/com/venGaza/ukdah/master.svg?label=Build%20%28Master%29&style=for-the-badge" alt="npm version"></a>
<a href="https://travis-ci.com/venGaza/ukdah"><img src="https://img.shields.io/travis/com/venGaza/ukdah/dev.svg?label=Build%20%28Dev%29&style=for-the-badge" alt="npm version"></a>
<a href="https://github.com/venGaza/ukdah/tree/master"><img src="https://img.shields.io/github/repo-size/venGaza/ukdah.svg?style=for-the-badge" alt="npm version"></a>
<a href="https://github.com/venGaza/ukdah/tree/master"><img src="https://img.shields.io/github/issues/venGaza/ukdah.svg?style=for-the-badge" alt="npm version">
<a href="https://github.com/venGaza/ukdah/tree/master"><img src="https://img.shields.io/github/license/venGaza/ukdah.svg?style=for-the-badge" alt="npm version"></a>
</p>

Awards play a critical role in recognizing employee accomplishments and boosting morale within an organization but most systems are out of date or too reliant upon an extensive human resources staff. The Ukdah team aims to solve this problem by working on a database-backed, responsive website which can be used to track and deliver employee recognition awards. The website will streamline the recognition process by giving users the ability to send recognition to those that they feel are deserving, and it will also provide critical business intelligence data to users overseeing the management of their awards program. Every employee deserves to be recognized for the value he/she brings to their respective organizations while organizations deserve a simple and effective solution to accomplish this. The Ukdah employee recognition website will lead the way!

## Table of Contents
- [Table of Contents](#table-of-contents)
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
- [Authentication](#authentication)
- [Certificate Generation](#certificate-generation)
- [Business Intelligence Analytics](#business-intelligence-analytics)
- [Built With](#built-with)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Screenshots
  
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
#Build the image from the dockerfile
docker build --tag=<NameOfApp> .  #Do not forget the period at the end!!! This references the directory.

#Run the app inside the image container
docker run -d -p <desiredPort>:3000 <NameOfApp>

#Example
docker run -d -p 3000:3000 ukdah
```

When you are finished running the app, you can run the following command to stop the container:

```bash
#Stop container
docker container stop <NameOfApp>

#Example
docker container stop ukdah
```

Looking to scale the application with docker services? Try running the docker-compose file which by default will launch 5 replicas of Ukdah (let that employee recognition rain down): 

```bash
#Start the swarm
docker swarm init

#Start the service
docker stack deploy -c docker-compose.yml <NameOfApp>

#Stop the service and the swarm
docker stack rm <NameOfApp>
docker swarm leave --force
```

### Persistence (via PM2)

PM2 is a process kept in the background, a daemon, that takes care of all your running processes. If you wish to give the web application persistence, run the following command to start the pm2 daemon:

```bash
# Start the PM2 daemon (< npm 5)
$ node_modules/.bin/pm2 start npm --name <NameOfApp> -- start

# Start the PM2 daemon (> npm 5)
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

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to SQLite3 database. It also requires the routes and models we'll be using in the application.
- `bin/` - This folder contains the www binary for core startup scripts.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our web application.
- `views/` - This folder contains the layout of the webpages. 
- `models/` - This folder represents data, implements business logic and handles storage.
- `package.json` - File contains project dependency information for npm installs.
- `package-lock.json` - automatically generated for any operations where npm modifies either the node_modules tree, or package.json. 
- `public/` - Holds static assets such at CSS, JS, and images. 

## Authentication

## Certificate Generation

## Business Intelligence Analytics

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.
* [nodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [expressJS](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [SQLite](https://www.sqlite.org/index.html) - SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. 
* [Docker](https://www.docker.com/) - Docker provides container software that is ideal for developers and teams looking to get started and experimenting with container-based applications. 

## Authors

* **Emmet Cooke** - []()
* **Dustin Jones** - [venGaza](https://github.com/venGaza)
* **Sean Santoki** - []()

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Oregon State University](https://oregonstate.edu)
  

