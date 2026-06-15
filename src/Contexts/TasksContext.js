import { createContext, useContext, useReducer } from "react";
import ToDoReducer from "../Reducers/ToDoReducer";

export const TasksContext=createContext([])

const TaskProvider=({children})=>{
const [tasks,dispatch]= useReducer(ToDoReducer,[]);
    return(
        <TasksContext.Provider value={{tasks,dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}
export const useTasks=()=>{
    return useContext(TasksContext);
}

export default TaskProvider;