/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import {
    ListHeader,
    ListItem,
    Auth,
    ProgressBar,
    TickItems,
    Model,
} from "./components/components";
import { Axios } from "axios";

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [userEmail, setEmail] = useState("test@gmail.com");
    const [tasks, setTasks] = useState();
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${userEmail}`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };
    const test = async () => {
        console.log("inside");
        try {
            const response = await fetch(`http://localhost:5000/test`, {
                method: "GET",
                credentials: "include",
            });
            const d=await response.json()
            if (response.status === 200) {
                setLoggedIn(true);
                setEmail(d.user.email);
            }
        } catch (err) {
            console.log('error')
            console.log(err)
        }
    };
    useEffect(() => {
        test();
    }, []);
    const sortedTask = tasks?.sort(
        (a, b) => Number(b.progress) - Number(a.progress)
    );

    return (
        <div className="app">
            {!isLoggedIn && <Auth setLoggedIn={setLoggedIn} setTasks={setTasks} />}
            {isLoggedIn && (
                <div>
                    <ListHeader
                        listName="🏖️ Holiday Tick List"
                        getData={getData}
                        userEmail={userEmail}
                        setLoggedIn={setLoggedIn}
                    />
                    {sortedTask?.map((task) => (
                        <ListItem key={task.id} task={task} getData={getData} userEmail={userEmail} />
                    ))}
                </div>
            )}
        </div>
    );
};
// localStorage;
export default App;
