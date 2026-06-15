import { createContext, useContext } from "react";
import { useState } from "react";
import CustomizedSnackbars from "../snackBar";

const SnackBarContext=createContext();

export function SnackBarBrovider({children}){
const [open, setOpen] = useState(false);
const [Message, setMessage] = useState('');

function setOpenSnackBar(message){
setMessage(message);
    setOpen(true)
    setTimeout(()=>{
        setOpen(false)
    },2000)
}
    
return(
    <SnackBarContext value={{setOpenSnackBar}}>
    <CustomizedSnackbars isOpen={open} message={Message}/>
        {children}
    </SnackBarContext>
)
}

export const useSnackBar=()=>{
    return useContext(SnackBarContext);
}