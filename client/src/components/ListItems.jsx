/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { ListHeader, Auth, ProgressBar, TickItems, Model } from "./components";
const ListItem = ({ task }) => {
    const [mode,setMode]=useState("")
    const [showModel, setShowModel] = useState(false);
    console.log(task);
    return (
        <div>
            <li className="list-item">
                <div className="info-container">
                    <TickItems />
                    <p className="task-title">{task.title}</p>
                    <ProgressBar />
                </div>
                <div className="button-container">
                    <button
                        className="edit"
                        onClick={() => {
                            setShowModel("true");
                            setMode("edit");
                        }}
                    >
                        Edit
                    </button>
                    <button className="delete">Delete</button>
                </div>
            </li>
            {showModel && <Model mode={'edit'} setShowModel={setShowModel} task={task}/>}
        </div>
    );
};

export default ListItem;
