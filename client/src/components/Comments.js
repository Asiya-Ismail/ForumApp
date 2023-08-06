import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import PostIt from "../apis/PostIt";
import { useParams } from "react-router-dom";
import EditComment from "./EditComment";

const Comments = ({comments}) => {
    const {id} = useParams();
    const {selectedPost,setSelectedPost} = useContext(PostContext)

    const deleteComment = async (comment_id) => {
        try {
            const deletecomment = await PostIt.delete(`/${id}/comment/${comment_id}/`)
            //setSelectedPost(selectedPost && selectedPost.comments.filter(remainingC => remainingC.comment_id !== comment_id))
            console.log(comment_id)
            window.location.reload()
        } catch (err) {
            console.error(err.message)
            console.log("Error")
        }
    } 

    return(
        <div className="mt-5">
            <table class="table">
                <tbody>
                        { comments && comments.map((comment) =>{
                            return (
                                <tr>
                                    <td style={{width:"80%"}} >{comment.name}
                                        <p>{comment.message}</p>
                                    </td>
                                    <div class="col text-right">
                                        <td>
                                            <EditComment comment={comment}/>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" 
                                                    onClick={() => deleteComment(comment.comment_id)}>
                                                        Delete
                                            </button>
                                        </td>
                                    </div>
                                </tr>       
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Comments;