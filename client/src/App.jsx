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

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const userEmail = "test@gmail.com";
    const [tasks, setTasks] = useState();
    const getData = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/todos/${userEmail}`
            );
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getData;
        }
    }, []);
    const sortedTask = tasks?.sort(
        (a, b) => Number(b.progress) - Number(a.progress)
    );

    return (
        <div className="app">
            {!isLoggedIn && <Auth />}
            {isLoggedIn && (
                <div>
                    <ListHeader
                        listName="🏖️ Holiday Tick List"
                        getData={getData}
                    />
                    {sortedTask?.map((task) => (
                        <ListItem key={task.id} task={task} getData={getData} />
                    ))}
                </div>
            )}
        </div>
    );
};
// localStorage;
export default App;
