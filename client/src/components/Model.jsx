/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
const Model=({mode,setShowModel,task})=>{
    
    const editMode=mode==='edit'?true:false
    const [Data,setData]=useState({
        user_email:editMode?task.user_email:"",
        title:editMode?task.title:"",
        progress:editMode?task.progress:"",
        date:editMode?"":new Date()
    })
   
    const handleChange=(e)=>{
        console.log(e)
            const {name,value}=e.target
            setData(data=>({
                ...data,
                [name]:value
            }))

    }
    const potData=()=>{
        
    }
    return (
       <div className="overlay">
        <div className="modal">
            <div className="form-title=container">
                <h3>
                    Let's {mode} your task
                </h3>
                <button onClick={()=>setShowModel(false)}>X</button>
            </div>
            <form>
                <input
                required
    
                maxLength={30}
                placeholder="You task"
                name='title'
                value={Data.title}
                onChange={handleChange}

                />
                <label>
                    Drag to select
                </label>
                <input
                required
                type="range"
                min="0"
                max="100"
                name="progress"
                value={Data.progress}
                onChange={handleChange}
                />
                <input className={mode} type='submit'/>
            </form>
        </div>
       </div>
    )
}

export default Model