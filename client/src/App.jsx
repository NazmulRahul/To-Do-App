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
    useEffect(() => getData, []);
    const sortedTask=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date))
    console.log("sorted ",sortedTask);

    return (
        <div className="app">
            <ListHeader listName="🏖️ Holiday Tick List" />
            {sortedTask?.map((task)=><ListItem key={task.id} task={task} />)}
        </div>
    );
};
// localStorage;
export default App;
