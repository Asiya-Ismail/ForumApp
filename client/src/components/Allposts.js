import React, {Fragment, useContext, useEffect, useState} from "react";

import EditPost from "./EditPost";
import PostPage from "./PostPage";

import { useNavigate} from "react-router-dom"

//context apis
import PostIt from "../apis/PostIt";
import { PostContext } from "../context/PostContext";
import axios from "axios";

const AllPost = (props) => {

    const {posts,setPosts} = useContext(PostContext)
    const [search, setSearch] = useState('');

    
    let history = useNavigate()
    //delete posts
    const deletePost = async id => {
        try {
            const deletePost = await PostIt.delete(`/${id}/`)  
            setPosts(posts.filter(post => post.post_id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

    const selectPost = async (id) => {
        history(`/posts/${id}`)
    }

    const getPosts = async() => {
        try {
            // get all posts
            const response = await PostIt.get("/");
            const posts = response.data.data.allposts;

            if(search === ""){
                setPosts(posts);
            }
            else{
                const result = posts.filter(post => 
                    post.title.toString().toLowerCase().includes(search.toString().toLowerCase()));
                setPosts(result)
            }
        } catch (err) {
            console.error(err)
        }
    };

    const descPosts = async() => {
        try {
            // get all posts desc
            const response = await PostIt.get("/");
            const descposts = response.data.data.descposts;
            setPosts(descposts)

        } catch (err) {
            console.error(err)
        }
    };


    useEffect( () => {
    getPosts();
   },[search]); 




    return (
        <Fragment>
            <h1 className="text-center mt-5">All Current Posts</h1> 
            <div class="container col text-right mt-5">                                          
                <div class="dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    Sort Posts
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" onClick={descPosts}> Latest Post</a>
                        <a class="dropdown-item" onClick={getPosts} >Oldest Post</a>
                    </div>
                </div>
            </div>
            <div class="container mt-3">  
            <p>Search for a posts:</p>  
            <input class="form-control" id="myInput" type="text" placeholder="Search.." onChange={e => setSearch(e.target.value)}/>
            </div>
            <table class="table table-hover mt-5">
                <tbody >
                { posts.map((post) => {
                    return (  
                    <tr  key= {post.post_id}>
                    <td style={{width:"80%"}} onClick={() => {selectPost(post.post_id)}}> 
                    {post.title} </td>
                    <div class="col text-center">
                        <td>
                            <EditPost post={post}/>
                        </td>
                        <td>
                            <button className="btn btn-danger" 
                                    onClick={() => deletePost(post.post_id)}>
                                        Delete
                            </button>
                        </td>
                    </div>
                    
                    </tr>
                )})}
                </tbody>
            </table>
        </Fragment>  
    )
}

export default AllPost;