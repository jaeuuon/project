import { Snackbar as MaterialSnackbar, Slide, SlideProps, Alert } from '@mui/material';

import type SnackbarType from 'types/components/common/snackbar';

const SlideTransition = (props: SlideProps) => <Slide {...props} direction="up" />;

const Snackbar = ({
    isVisible, setVisibleFalse,
    error
}: SnackbarType) => {
    return (
        <>
            {error &&
                <MaterialSnackbar key={error.code} open={isVisible} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={SlideTransition} autoHideDuration={5000} onClose={setVisibleFalse}>
                    <Alert severity="error" onClose={setVisibleFalse}>
                        <p id="p-message">{error.message}</p>
                        <p id="p-code">[{error.code}]</p>
                    </Alert>
                </MaterialSnackbar>
            }
        </>
    );
};

export default Snackbar;
