import React ,{useState, createContext}from "react";

export const PostContext = createContext()

export const PostContextProvider = prop => {

        // get all posts
        const [posts, setPosts]= useState([]);
        // get a post
        const [selectedPost, setSelectedPost]= useState(null);

    return(
       <PostContext.Provider 
       value={{posts,setPosts,selectedPost,setSelectedPost}}>
        {prop.children}
       </PostContext.Provider>
    )
}