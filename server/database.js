const {Pool} = require("pg");

const pool = new Pool ({
    user:"postgres",
    password: "postgres123",
    host: "localhost",
    port: 5432,
    database:"postgres"
})

/*pool.query("CREATE DATABASE yt_login_system;").then((response) => {
    console.log("DATABASE CREATED")    
    console.log(response);
})
.catch((err) => {
    console.log(err);
});


const createTblQuery = `CREATE TABLE posts (
    post_id serial NOT NULL PRIMARY KEY,
    Title VARCHAR NOT NULL,
    Body VARCHAR NOT NULL);`

pool
.query(createTblQuery)
.then((response) => {
    console.log("TABLE CREATED")    
    console.log(response);
})
.catch((err) => {
    console.log(err);
});

CREATE TABLE comments(
    comment_id serial NOT NULL PRIMARY KEY,
    post_id serial NOT NULL REFERENCES posts(post_id),
    name VARCHAR NOT NULL,
    message VARCHAR NOT NULL);
)
*/
module.exports = pool;