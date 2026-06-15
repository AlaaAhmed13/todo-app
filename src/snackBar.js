    import * as React from 'react';
    import Snackbar from '@mui/material/Snackbar';
    import Alert from '@mui/material/Alert';

    export default function CustomizedSnackbars({isOpen,message}) {

    return (
        <div>
        <Snackbar open={isOpen} autoHideDuration={6000}>
            <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            >
            {message}
            </Alert>
        </Snackbar>
        </div>
    );
    }
