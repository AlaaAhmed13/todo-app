import { v4 as uuidv4 } from 'uuid';


export default function ToDoReducer(currentTasks,action){
    switch(action.type){
        case 'add':{
            const newToDo={
            id:uuidv4(),
            title:action.payload.taskTitle,
            details:'',
            iscompleted:false,
            };
            const list=[...currentTasks,newToDo];
            localStorage.setItem('todos',JSON.stringify(list));
            return list;
        }
        case'delete':{
            const UpdateTasks=currentTasks.filter(t=>{
            return t.id!=action.payload.id;
            })
            localStorage.setItem('todos',JSON.stringify(UpdateTasks));
            return UpdateTasks;
        }
        case 'update':{
            const UpdateToDo=currentTasks.map(t=>{
                if(t.id==action.payload.id){
                    t.title=action.payload.title;
                    t.details=action.payload.details;
                }
                return t;
            })
            localStorage.setItem('todos',JSON.stringify(UpdateToDo));
            return UpdateToDo;
        }
        case 'get':{
            const UpdatedList=JSON.parse(localStorage.getItem('todos'))|| [];
            return UpdatedList;
        }
        case 'completed':{
            const UpdateTasks=currentTasks.map(t=>{
            if(t.id==action.payload.id){
                const UpdatedToDo={
                    ...t,iscompleted:!t.iscompleted,
                }
                return UpdatedToDo
                    // t.iscompleted=!t.iscompleted;  //mutation not allow
                }
                return t;
            })
            localStorage.setItem('todos',JSON.stringify(UpdateTasks));
            return UpdateTasks;
        }
        default:{
            throw Error('unknown action '+ action.type);
        }

    }
}