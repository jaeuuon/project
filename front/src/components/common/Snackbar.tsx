import { useState, useEffect } from 'react';

import { Snackbar as MaterialSnackbar, Slide, SlideProps, Alert } from '@mui/material';

import type SnackbarType from 'types/components/common/snackbar';

const SlideTransition = (props: SlideProps) => <Slide {...props} direction="up" />;

const Snackbar = ({
    severity, codeMessage
}: SnackbarType) => {
    const [isVisible, setVisible] = useState(false);

    const setVisibleFalse = () => setVisible(false);

    useEffect(() => {
        if (codeMessage) {
            setVisible(true);
        }
    }, [codeMessage]);

    return (
        <>
            {codeMessage &&
                <MaterialSnackbar key={codeMessage.code} open={isVisible} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={SlideTransition} autoHideDuration={5000} onClose={setVisibleFalse}>
                    <Alert severity={severity} onClose={setVisibleFalse}>
                        <p className="p-message">{codeMessage.message}</p>
                        <p className="p-code">[{codeMessage.code}]</p>
                    </Alert>
                </MaterialSnackbar>
            }
        </>
    );
};

export default Snackbar;
