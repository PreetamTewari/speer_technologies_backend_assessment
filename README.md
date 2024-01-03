# Speer Technologies Backend Assessment

# Project Details

## The Problem

- Implement a RESTful API using a database of your chice.
- Implement user signup and login endpoints using any authentication protocol.
- Implement rate limiting and request throttling to handle high traffic.
- Implement search functionality to search based on keywords.
- Write unit test and integration tests.

## The Solution

I went with express js since it is more simple and lightweight compared to the other two frameworks(Laravel and Spring Boot) I have worked with. The database I selected was MongoDB since I have majorly worked with noSQL databases in the past and I am more comfortable using it. I have used bcrypt js to hash the password and jsonwebtoken for handling authentication. I have used express-rate-limit library to setup a rate limiting algorithm of a maximum of 15 requests in 10 minutes window. I have used jest and supertest to write unit tests and integration tests.

## How to run

I have used node version 20.2.0 for my development. Upon cloning the repository, use
`npm install` command to install the dependencies. I am using nodemon to keep a watch on any changes and restart the application if it finds any. Please install nodemon globally using `npm i nodemon -g`.

To run the application, use `npm start` command.

To run the tests, use `npm test` command.

## Important Note:

Please replace the `<password>` in the following line in .env file

`MONGODB_URL=mongodb+srv://tpreetam:<password>@preetamtribe.ah95xoe.mongodb.net/speer?retryWrites=true&w=majority`

to

`tpreetam`

This will allow the application to connect to the database.

# Thank you for your time and consideration.



