import { Outlet } from "react-router-dom"
import TopBar from "../../components/top_bar/TopBar";
import React from "react";
import { useEffect, useState } from "react";

const Container = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('sessionToken') !== null) {
          setLoggedIn(true)
        }
      }, [])
    
  return <div>
    <TopBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Outlet context={[loggedIn, setLoggedIn]}/>
  </div>
}

export default Container;
