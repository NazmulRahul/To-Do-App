/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { ListHeader, Auth, ProgressBar, TickItems, Model } from "./components";
const ListItem = ({ task,getData }) => {
    const [mode,setMode]=useState("")
    const [showModel, setShowModel] = useState(false);
    console.log(task);
    const deleteData = async (e) => {
        e.preventDefault();
        console.log('////////////////////////////')
        try {
            const response = await fetch(`http://localhost:5000/todosDelete`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(task),
            });
            if (response.status === 200) {
                console.log(response);
                setShowModel(false);
                getData();
            } else {
                console.log("jsfjaioewjfawejf");
                setShowModel(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
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
                    <button className="delete" onClick={deleteData}>Delete</button>
                </div>
            </li>
            {showModel && <Model mode={'edit'} setShowModel={setShowModel} task={task} getData={getData}/>}
        </div>
    );
};

export default ListItem;
