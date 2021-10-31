import React, { useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({triggerNotification, severity, message}) => { 
    const [open, setOpen] = React.useState(false);
    
    useEffect(()=>{
        handleClick();
    }, [triggerNotification]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={ {"vertical":"top", "horizontal":"right"} }>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </>
};

export default Notification;