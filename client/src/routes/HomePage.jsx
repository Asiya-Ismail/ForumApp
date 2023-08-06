import React,{Fragment} from "react";

//components
import NewPost from "../components/NewPost";
import AllPost from "../components/Allposts";

 
function Homepage() {
    return (
        <Fragment>
            <div className="container">
                <h1 className="text-center mt-5">Welcome To Post It!</h1>
                <NewPost/>
                <AllPost/>
            </div>
        </Fragment>
    )
}

export default Homepage;
