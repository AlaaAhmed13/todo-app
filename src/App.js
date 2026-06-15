import './App.css';
import ToDoList from './ToDoList';
// import { TasksContext } from './Contexts/TasksContext';
// import { v4 as uuidv4 } from 'uuid';
// import { useState } from 'react';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { SnackBarBrovider } from './Contexts/SnackBarContext';
import TaskProvider from './Contexts/TasksContext';

const theme = createTheme({
  palette: {
    primary: {
        main: "#00796b",
      },
    },
});

// const list=[{id:uuidv4(),title:'alaa',details:'',iscompleted:false}];
function App() {
  // const [tasks,SetTasks]=useState(list);


  return (
    <ThemeProvider theme={theme}>
      <TaskProvider>
      <SnackBarBrovider>
        <div className="App">
                  <ToDoList />
        </div>
      </SnackBarBrovider>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
