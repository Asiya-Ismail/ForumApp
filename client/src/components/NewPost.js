import React, { Fragment, useState } from "react";
import PostIt from "../apis/PostIt";

const NewPost = () => {
    const [ title, setTitle] = useState("");
    const [ body, setBody] = useState(""); 

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const response = await PostIt.post("/",{
                "Title":title,
                "Body":body
            });
            window.location = "/";
        } catch (err) {
            console.err(err.message)
        }
    };
    return(
        <Fragment>
            <div class="container">
                <div class="row">
                    <div class="col text-right">
                    <button type="button" class="btn btn-success btn-default" data-toggle="modal" data-target="#myModal">
                    Add New Post
                    </button>
                    </div>
                </div>
            </div> 

            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title">Add New Post</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                        <label>Title:</label>
                        <input type="text" className ="form-control" value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                        <label for="text">Text:</label>
                        <textarea class="form-control" rows="5" id="text" value={body} onChange={e => setBody(e.target.value)}></textarea>
                        </div>

                        <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal" onClick={onSubmitForm}>Add</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    ) ;
}

export default NewPost;