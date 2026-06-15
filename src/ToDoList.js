import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDos from './ToDo';
import { useState ,useEffect,useMemo } from 'react';
import { useSnackBar } from './Contexts/SnackBarContext';
// ======dialog=======
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useTasks } from './Contexts/TasksContext';

export default function ToDoList() {
const {tasks,dispatch}=useTasks();
const {setOpenSnackBar}=useSnackBar();
const [TaskVal,SetTaskVal]=useState('')
const [ToggleBtn,SetTogglebtn]=useState('all')
const [ConfirmDel,SetConfirmDel]=useState(false);
let [taskId,SetTaskId]=useState([]);
const [ConfirmUpdate,SetConfirmUpdate]=useState(false);


useEffect(()=>{
    dispatch({type:'get'})
},[])


const CompletedTasks=useMemo(()=>{
return tasks.filter(t=>{
    return t.iscompleted;
})
},[tasks])

const NotCompletedTasks=useMemo(()=>{
return tasks.filter(t=>{
    return !t.iscompleted;
})
},[tasks])


let ListType=tasks;
if(ToggleBtn=='completed'){
    ListType=CompletedTasks;
}else if(ToggleBtn=='not completed'){
    ListType=NotCompletedTasks;
}else{
    ListType=tasks;
}

const tasksList=ListType.map((task,idx)=>{
        return(
            <ToDos key={task.id} todo={task} showdelete={ShowDeleteDialog} showupdate={showUpdate}/>
        )
})

function hanldeToggleBtn(e){
SetTogglebtn(e.target.value);
}

function handleAddTask(){
    dispatch({type:'add',payload:{taskTitle:TaskVal}})
    SetTaskVal('')
    setOpenSnackBar('Task Added Successfully');
}

function handleCloseDel(){
    SetConfirmDel(false)
}

function ShowDeleteDialog(todo){
    SetConfirmDel(true);
    SetTaskId(todo);
}

function handleDelete(){
    dispatch({type:'delete',payload:taskId})
    SetConfirmDel(false)
    setOpenSnackBar('Task Deleted Successfully');
}

function handleCloseUp(){
    SetConfirmUpdate(false)
}

function showUpdate(todo){
    SetTaskId(todo);
    SetConfirmUpdate(true);
}

function handleUpdate(){
    dispatch({type:'update',payload:taskId})
    handleCloseUp();
    setOpenSnackBar('Task Updated Successfully');
}



return (
    <>
    <Dialog
        open={ConfirmDel}
        onClose={handleCloseDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            {"Are You want Delete this Task?"}
        </DialogTitle>
        <DialogActions>
            <Button onClick={handleDelete}>delete</Button>
            <Button autoFocus onClick={handleCloseDel}>cancel</Button>
        </DialogActions>
    </Dialog>
    <Dialog
        open={ConfirmUpdate}
        onClose={handleCloseUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>
            {"Update Task"}
        </DialogTitle>
        <DialogContent>
            <TextField id="standard-basic" 
            label=" task details" 
            variant="standard" 
            style={{width:'100%',margin:'5px 0'}} 
            value={taskId.title} onChange={(e)=>{SetTaskId({...taskId,title:e.target.value})}}/>
            <TextField id="standard-basic" 
            label=" task details" 
            variant="standard" 
            style={{width:'100%',margin:'5px 0'}} 
            value={taskId.details} onChange={(e)=>{SetTaskId({...taskId,details:e.target.value})}}/>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleUpdate}>update</Button>
            <Button onClick={handleCloseUp}>cancel</Button>
        </DialogActions>
    </Dialog>
    <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 ,textAlign:'center',maxHeight:'80vh',overflow:'auto'}}>
        <CardContent>
            <Typography variant='h3'>
                tasks
            </Typography>
            <Divider />
            <Typography style={{margin:'15px 0'}}>
                <ToggleButtonGroup 
                value={ToggleBtn}
                exclusive 
                onChange={hanldeToggleBtn}
                aria-label="text alignment">
                <ToggleButton value='all'>all tasks</ToggleButton>
                    <ToggleButton value='completed'>completed</ToggleButton>
                    <ToggleButton value='not completed'>not completed</ToggleButton>
                </ToggleButtonGroup>
            </Typography>
            {/* all ToDos */}
            {tasksList}
            {/* Add Task place */}
            <Grid container spacing={2} sx={{margin:'10px 0'}}>
                <Grid size={8}>
                    <TextField id="outlined-basic"
                        label="task title" 
                        variant="outlined" 
                        style={{width:'100%'}} 
                        value={TaskVal} onChange={(e)=>{SetTaskVal(e.target.value)}}/>
                </Grid>
                <Grid size={4}>
                        <Button variant="contained" 
                        style={{width:'100%',height:'100%'}}
                        onClick={handleAddTask} disabled={TaskVal.length==0}>Add Task</Button>
                </Grid>
            </Grid>
        </CardContent>
        </Card>
    </Container>
    </>
);
}
