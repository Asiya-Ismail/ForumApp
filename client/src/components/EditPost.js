import React, {Fragment, useState} from "react";
import PostIt from "../apis/PostIt";

const EditPost = ({post}) => {
    const [ title, setTitle] = useState(post.title);
    const [ body, setBody] = useState(post.body); 

    const onChangeForm = async(e) => {
        e.preventDefault();
        try {
            const response = await PostIt.put(`/${post.post_id}/`,{
                "Title":title,
                "Body":body
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    };

    function update() {
        setTitle(post.title);
        setBody(post.body);
      }
    
    return(
    <Fragment>
        <button type="button" class="btn btn-warning" data-toggle="modal" 
        data-target={`#id${post.post_id}`} onClick={update}>
            Edit
        </button>
        <div class="modal" id={`id${post.post_id}`} >
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" onClick={update}>&times;</button>
                </div>
                

                <div class="modal-body">
                    <p class="text-left">Title:</p>
                    <input type="text" className ="form-control" value={title} onChange={e => setTitle(e.target.value)}/>
                    <p class="text-left mt-3" style={{width:"40%"}}>Text:</p>
                    <textarea type="text" className ="form-control" rows="5" id="text" value={body} onChange={e => setBody(e.target.value)} ></textarea>
                </div>
                
                <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={onChangeForm}>Edit</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={update}>Close</button>
                </div>
                
            </div>
            </div>
        </div>
    </Fragment>
            
    )
}

export default EditPost;