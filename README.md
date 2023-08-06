# ForumApp

A simple forum application using NodeJS,REACT,Postgres and Express. You can add, delete, edit and update you posts. You can also select a specific post and create comments underneath it.

## Pre-requites for application:
- Install NodeJS
  [Download NodeJS](https://nodejs.org/en/download)
- For FrontEnd
  ```
  npm install react react-dom --save  
  npm install axios
  ```
- Install Postgres
  [Download Postgres](https://www.postgresql.org/download/)

- For Server
  ```
  cd server
  npm install express --save
  npm install pg
  npm install morgan
  npm install cors
  npm install dotenv --save
  ```
- Install Postman
  [Download Postman](https://www.postman.com/downloads/)

## SETUP DATABASE:

Open Postgres on terminal and run the following queries:

> start-up postgres on terminal with postgres user
```
psql postgres
```

> Create Database
```
CREATE DATABASE Post_It;
```
  
> Create the posts
```
CREATE TABLE posts (
    post_id serial NOT NULL PRIMARY KEY,
    Title VARCHAR NOT NULL,
    Body VARCHAR NOT NULL);
```
 
> Create the comments table
```
CREATE TABLE comments(
    comment_id serial NOT NULL PRIMARY KEY,
    post_id serial NOT NULL REFERENCES posts(post_id),
    name VARCHAR NOT NULL,
    message VARCHAR NOT NULL);
```

## Connect DATABASE:

- Go into the server/database.js and set the correct information to connect to your postgres database.

## RUN PROGRAM:

Start two terminal shells:

- start the server side:
```
cd server
npm run dev

```

- start react-app:
```
cd client
npm start
```

- Time spent: 10h
