# Ukdah | Employee Recognition Portal

Awards play a critical role in recognizing employee accomplishments and boosting morale within an organization but most systems are out of date or too reliant upon an extensive human resources staff. The Ukdah team aims to solve this problem by working on a database-backed, responsive website which can be used to track and deliver employee recognition awards. The website will streamline the recognition process by giving users the ability to send recognition to those that they feel are deserving, and it will also provide critical business intelligence data to users overseeing the management of their awards program. Every employee deserves to be recognized for the value he/she brings to their respective organizations while organizations deserve a simple and effective solution to accomplish this. The Ukdah employee recognition website will lead the way!    

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
node
npm
git
```

### Download the project (Command Line)

Navigate to desired directory within the command line. Then download the project with the following command:

```
$ git clone https://github.com/venGaza/ukdah.git
```

### Install

Next, run the following command to install Ukdah's dependencies:

```
# Move into project directory and install dependencies
$ cd ukdah
$ npm install
```

### Run

Lastly, the web application can be started with the following command:

```
# Default Port (3000)
$ npm start 

or

# Specify port (PORT var will persist until shell is closed)
$ export PORT=<desiredPort>
$ npm start

# Example (Start app on port 8080)
$ export PORT=8080
$ npm start

# To stop the process use the keyboard interrupt ^c
```

### Persistence (via PM2)

PM2 is a process kept in the background, a daemon, that takes care of all your running processes. If you wish to give the web application persistence, run the following command to start the pm2 daemon:

```
# Start the PM2 daemon
$ node_module/pm2/bin/pm2 start npm --name <NameOfApp> -- start
```

To stop the daemon run the following command:

```
# Stop the PM2 daemon
$ node_module/pm2/bin/pm2 stop <NameOfApp>
```

### Errors

Errors running the web application? Try reinstalling the dependencies:

```
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

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to SQLite3 database. It also requires the routes and models we'll be using in the application.
- `bin/` - This folder contains the www binary for core startup scripts.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our web application.
- `views/` - This folder contains the layout of the webpages. 
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

## Authors

* **Emmet Cooke** - []()
* **Dustin Jones** - [venGaza](https://github.com/venGaza)
* **Sean Santoki** - []()

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Oregon State University](https://oregonstate.edu)
  

