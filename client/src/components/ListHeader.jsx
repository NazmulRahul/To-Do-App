/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Model from "./Model";
const ListHeader = ({listName,getData,userEmail,setLoggedIn,setEmail,setTasks}) => {
    const [mode,setMode]=useState("")
    const [showModel,setShowModel]=useState(false)
    const signout=async()=>{
        await fetch(`http://localhost:5000/logout`, {
            method: "GET",
            credentials: "include",
        });
        setLoggedIn(false)
        setTasks(null)
        setEmail(null)
        
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="list-header">
            <h1>{listName}</h1>
            <div className="button-container">
            <button className="create" onClick={()=>{setMode('create')
                setShowModel(true)}}>ADD NEW</button>
                <button className="signout" onClick={signout} >SIGN OUT</button>                
            </div>
            {showModel && <Model mode={mode} setShowModel={setShowModel} getData={getData} userEmail={userEmail}/>}
        </div>
    );
};

export default ListHeader;
