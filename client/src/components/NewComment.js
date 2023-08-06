import React, { useState } from "react";
import PostIt from "../apis/PostIt";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NewComment = () => {

    const [ name, setName] = useState("");
    const [ message, setMessage] = useState("");
    const {id} = useParams();

    const submitPost = async (e) =>{
        e.preventDefault();
        try {
            const newPost = await PostIt.post(`/${id}/comment`,
            {
                "name":name,
                "message":message
            });
            window.location.reload()   
            } catch (err) {
                console.log(err.message)
            }

    };


    return(
        <div>
            <h3 className="text-left mt-5" style={{textDecoration:'underline'}}>Comments</h3>
            <div class="form-outline w-100">
                <label class="form-label" for="name">Name</label>
                <input type="text" class="form-control" id="name" value={name} onChange={ e => setName(e.target.value)}></input>
                <label class="form-label" for="textAreaExample">Message</label>
                <textarea class="form-control" id="textAreaExample" rows="4"
                style={{background: "#fff"}} value={message} onChange={ e => setMessage(e.target.value)}></textarea>
            </div>
            <div class="float-end mt-2 pt-1">
            <button type="button" class="btn btn-primary btn-sm" onClick={e => submitPost(e)}>Post comment</button>
            </div>
        </div>     
    )
}

export default NewComment