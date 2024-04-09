/* eslint-disable react/prop-types */
import { useState } from "react";
import Model from "./Model";
const ListHeader = ({listName}) => {
    const [mode,setMode]=useState("")
    const [showModel,setShowModel]=useState(false)
    const signout=()=>{
        console.log("signout")
    }
    return (
        <div className="list-header">
            <h1>{listName}</h1>
            <div className="button-container">
            <button className="create" onClick={()=>{setMode('create')
                setShowModel(true)}}>ADD NEW</button>
                <button className="signout" onClick={signout} >SIGN OUT</button>                
            </div>
            {showModel && <Model mode={mode} setShowModel={setShowModel}/>}
        </div>
    );
};

export default ListHeader;
