import { Snackbar as MaterialSnackbar } from '@mui/material';

import type Snackbar from 'types/components/common/snackbar';

const Snackbar = ({
    key, message,
    isVisible, setVisibleFalse
}: Snackbar) => {
    return (
        <MaterialSnackbar key={key} open={isVisible} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} message={message} autoHideDuration={5000} onClose={setVisibleFalse} />
    );
};

export default Snackbar;
