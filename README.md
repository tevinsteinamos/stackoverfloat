# stackoverfloat

stackoverfloat is a simple forum web application that lets you manage threads, post comments, as well ass like and dislike posts.

![stackoverfloat logo](http://i.imgur.com/HlknTNX.png?1 "stackoverfloat logo")

##### kching is Tevinstein's submission for a Hacktiv8 portfolio project with
- Node.js 6+
- Express
- MongoDB
- Mongoose
- Express-validator

## Installation
- Clone the repo: `git clone https://github.com/tevinstein/stackoverfloat.git`
- Install packages: `npm install`
- Create a new file called .env and insert your MongoDB URI and secret as a variable:
```
URI="insert_your_db_uri_here
SECRET="insert_your_secret_here"
```
- Start the server: `npm start`
- View in browser: `http://localhost:8080`

## REST API
| URL                     | Method | Description                 |
|-------------------------|--------|-----------------------------|
| /questions              | GET    | Views all question          |
| /questions/add          | GET    | Renders add question page   |
| /questions/add          | POST   | Process add question        |
| /questions/:slug/       | GET    | Views a question            |
| /questions/:slug/edit   | GET    | Renders edit question page  |
| /questions/:slug/edit   | POST   | Process edit question       |
| /questions/:slug/delete | GET    | Deletes a question          |
| /questions/:slug/answer | POST   | Process a question's answer |

## Screenshots

![stackoverfloat form validations](http://i.imgur.com/LZ8HVTs.png "stackoverfloat form validations")

![view questions](http://i.imgur.com/vbBCqQa.png "view questions")

![view a question](http://i.imgur.com/owcxfdh.png "view a question")

![add a question](http://i.imgur.com/huuDgJU.png "add a question")

![edit a question](http://i.imgur.com/VGroCkX.png "edit a question")

![delete a question](http://i.imgur.com/mJugAAk.png "delete a question")