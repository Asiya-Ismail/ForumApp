import React, { useContext, useEffect, useState} from "react"; 
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
//context apis
import PostIt from "../apis/PostIt"
import Comments from "./Comments";
import NewComment from "./NewComment";


const PostPage = () => {
    const {id} = useParams();
    const {selectedPost,setSelectedPost} = useContext(PostContext)

    const comments = selectedPost && selectedPost.comments



    const fetchData = async() => {
        try {
            // get a posts
            const response = await PostIt.get(`${id}`);
            setSelectedPost(response.data.data);
            console.log(setSelectedPost)         
        } catch (err) {
            console.log(err.message)
            console.log("Error")
        }
    };

    useEffect( () => {
        fetchData()
       },[]);
       return(
        <div className="container">
            <h1 className="text-center mt-5" style={{textDecoration:'underline'}}>
            {selectedPost && selectedPost.post.title}
            </h1>
            <p className=" mt-5">{selectedPost && selectedPost.post.body}</p>
            <NewComment></NewComment>
            <Comments comments={selectedPost && selectedPost.comments}/>
            
        </div>
        )
}
    
export default PostPage;