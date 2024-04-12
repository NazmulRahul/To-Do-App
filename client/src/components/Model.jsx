/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
const Model = ({ mode, setShowModel, task, getData,userEmail }) => {
    const editMode = mode === "edit" ? true : false;
    const [Data, setData] = useState({
        user_email: editMode ? task.user_email :userEmail,
        title: editMode ? task.title : "",
        progress: editMode ? task.progress : "",
        date: editMode ? task.date : new Date(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };
    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/todos`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(Data),
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
    const editData = async (e) => {
        e.preventDefault();
        console.log("////////////////////////////");
        try {
            const response = await fetch(`http://localhost:5000/todosEdit`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ ...Data, id: task.id }),
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
        <div className="overlay">
            <div className="modal">
                <div className="form-title=container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={() => setShowModel(false)}>X</button>
                </div>
                <form>
                    <input
                        required
                        maxLength={30}
                        placeholder="You task"
                        name="title"
                        value={Data.title}
                        onChange={handleChange}
                    />
                    <label>Drag to select</label>
                    <input
                        required
                        type="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={Data.progress}
                        onChange={handleChange}
                    />
                    <input
                        className={mode}
                        type="submit"
                        onClick={editMode ? editData : postData}
                    />
                </form>
            </div>
        </div>
    );
};

export default Model;
