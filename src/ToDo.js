import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// =====icons========
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CreateIcon from '@mui/icons-material/Create';

// ============
import { useSnackBar } from './Contexts/SnackBarContext';
import { useTasks } from './Contexts/TasksContext';

export default function ToDos({todo,showdelete,showupdate}){
const {tasks,dispatch}=useTasks();
const {setOpenSnackBar}=useSnackBar();

function handleOpenDel(){
    showdelete(todo);
}

function handleOpenUp(){
    showupdate(todo)
}

function handleDonebtn(){
    dispatch({type:'completed',payload:todo})
    setOpenSnackBar(' task updated sunccessfully')
}

return(
<>
    <Card sx={{ minWidth: 275 ,backgroundColor:'#1a237e',color:'white', margin:'10px 0'}}>
    <CardContent>
        <Grid container spacing={2}>
            <Grid size={8} sx={{textAlign:'start'}}>
                <Typography style={{textDecoration:todo.iscompleted?'line-through':'none'}}>
                    {todo.title}
                </Typography>
                <Typography >
                    {todo.details}
                </Typography>              
            </Grid>
            <Grid size={4} sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                <IconButton className='iconbtn' 
                style={{border:'2px solid green',
                    color:todo.iscompleted?'white':'green',
                    background:todo.iscompleted?'green':'white'}} 
                    size='small'>
                    <DoneIcon onClick={handleDonebtn}/>
                </IconButton>
                <IconButton className='iconbtn' 
                style={{border:'2px solid #01579b',
                    color:'#01579b',
                    backgroundColor:"white"}} 
                    size='small'>
                    <CreateIcon onClick={handleOpenUp}/>
                </IconButton>
                <IconButton className='iconbtn' 
                style={{border:'2px solid #b71c1c',
                    color:'#b71c1c',
                    backgroundColor:"white"}} 
                    size='small'>
                    <DeleteOutlineOutlinedIcon onClick={handleOpenDel} />
                </IconButton>
            </Grid>
        </Grid>
    </CardContent>
    </Card>
</>
    )
}