import React,{Fragment} from "react";
import {BrowserRouter as Router,  Routes ,Route} from "react-router-dom"

import "./App.css";

//routes
import Homepage from "./routes/HomePage";
import PostDetails from "./routes/PostDetails";

//context api
import { PostContextProvider } from "./context/PostContext";

 function App() {
    return (
      <PostContextProvider>
         <div>
          <Router>
            <Routes>
              <Route exact path="/" Component={Homepage}/>
              <Route exact path="/posts/:id" Component={PostDetails}/>
            </Routes>
          </Router>
        </div>
      </PostContextProvider>
    )
}

export default App;
