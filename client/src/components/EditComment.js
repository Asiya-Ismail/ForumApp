import React, {Fragment, useState} from "react";
import PostIt from "../apis/PostIt";
import { useParams } from "react-router-dom";

const EditComment = ({comment}) => {

    const [ name, setName] = useState(comment.name);
    const [ message, setMessage] = useState(comment.message);

    const {id} = useParams();


    const onChangeForm = async(e) => {
        e.preventDefault();
        try {
            const response = await PostIt.put(`/${id}/comment/${comment.comment_id}`,{
                "name":name,
                "message":message
            });
            window.location.reload() 
        } catch (err) {
            console.error(err.message)
        }
    };

    function update() {
        setName(comment.name);
        setMessage(comment.message);
      }
    
    return(
    <Fragment>           
        <button type="button" class="btn btn-warning" data-toggle="modal" 
        data-target={`#id${comment.comment_id}`} onClick={update}>
            Edit
        </button>
        <div class="modal" id={`id${comment.comment_id}`} >
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" onClick={update}>&times;</button>
                </div>
                

                <div class="modal-body">
                    <p class="text-left">Title:</p>
                    <input type="text" className ="form-control" value={name} onChange={e => setName(e.target.value)}/>
                    <p class="text-left mt-3" style={{width:"40%"}}>Text:</p>
                    <textarea type="text" className ="form-control" rows="5" id="text" value={message} onChange={e => setMessage(e.target.value)} ></textarea>
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

export default EditComment;