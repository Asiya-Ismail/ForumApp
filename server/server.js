require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// create post
app.post("/api/v1/posts", async (req,res) => {
    try{
        const newpost = await pool.query( "INSERT INTO posts (title ,body ) VALUES ($1 ,$2) RETURNING *;",[req.body.Title,req.body.Body]);
        console.log("POST CREATED") 
        res.status(201).json({
            status: "success",
            data: newpost.rows[0]
        });    
        console.log(req.body);
    }
    catch (err) {
        console.error(err.message);
    }   
});

// get all posts

app.get("/api/v1/posts", async (req,res) => {
    try{
        const allposts = await pool.query( "SELECT *FROM posts;")
        const descposts = await pool.query( "SELECT * FROM posts ORDER BY post_id DESC;")
        res.status(200).json({
            status: "success",
            data: {
                allposts: allposts.rows,
                descposts: descposts.rows
            }
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});

// get a post

app.get("/api/v1/posts/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [id]);
        
        const comments = await pool.query("SELECT * FROM comments WHERE post_id = $1", [id]);
        
        res.status(200).json({
            status: "success",
            data:{
                post: post.rows[0],
                comments: comments.rows
            },
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});

// sort posts by asc
app.get("/api/v1/sortpostsasc", async (req,res) => {
    try{
        const allposts = await pool.query( "SELECT * FROM posts ORDER BY post_id ASC;")
        res.status(200).json({
            status: "success",
            data: allposts.rows
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});

// sort posts by desc
app.get("/api/v1/sortpostsdesc", async (req,res) => {
    try{
        const allposts = await pool.query( "SELECT * FROM posts ORDER BY post_id DESC;")
        res.status(200).json({
            status: "success",
            data: allposts.rows
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});

//update a post

app.put("/api/v1/posts/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const updatePost = await pool.query("UPDATE posts SET title = $1, body =$2 WHERE post_id = $3 RETURNING *", [req.body.Title,req.body.Body,id]);
        res.status(201).json({
            status: "success",
            data: updatePost.rows[0]
        }); 
    }
    catch (err) {
        console.error(err.message);
    }   
});

//delete a post

app.delete("/api/v1/posts/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const deletePost = await pool.query("DELETE FROM posts WHERE post_id = $1 RETURNING *", [id]);
        res.status(200).json({
            status: "success",
            data: deletePost.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});

//add comments 

app.post("/api/v1/posts/:id/comment", async (req,res) => {
    try{
        const { id } = req.params;
        const newcomment = await pool.query( "INSERT INTO comments (post_id,name ,message ) VALUES ($1 ,$2, $3) RETURNING *;",[parseInt(id),req.body.name,req.body.message]);
        console.log("POST CREATED") 
        res.status(201).json({
            status: "success",
            data: 
            {
                comment:newcomment.rows[0]
            }
        });    
        console.log(req.body);
    }
    catch (err) {
        console.error(err.message);
    }   
});


// delete comment
app.delete("/api/v1/posts/:postid/comment/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const { postid } = req.params;
        console.log(req.params)
        const deletePost = await pool.query("DELETE FROM comments WHERE comment_id = $1 AND post_id = $2 RETURNING *", [id,postid]);
        res.status(200).json({
            status: "success",
            data: deletePost.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});

// update comment
app.put("/api/v1/posts/:postid/comment/:id", async (req,res) => {
    try{
        const { id } = req.params;
        const { postid } = req.params;
        console.log(req.params)
        const updateComment = await pool.query("UPDATE comments SET name = $1, message = $2 WHERE comment_id = $3 AND post_id = $4 RETURNING *", [req.body.name,req.body.message,id,postid]);
        res.status(201).json({
            status: "success",
            data: updateComment.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }   
});











const port = process.env.PORT || 3001;


app.listen(port, () => console.log(`server on localhost: ${port}`));
