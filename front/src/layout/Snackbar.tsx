import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Snackbar as MaterialSnackbar, Alert } from '@mui/material';

import { RootState } from 'modules';

const Snackbar = () => {
    const { severity, codeMessage } = useSelector((state: RootState) => state.snackbar);

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
                <MaterialSnackbar key={codeMessage.code} open={isVisible} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={5000} onClose={setVisibleFalse}>
                    <Alert severity={severity} onClose={setVisibleFalse}>
                        <p>{codeMessage.message}</p>
                        {severity === 'error' &&
                            <p>[{codeMessage.code}]</p>
                        }
                    </Alert>
                </MaterialSnackbar>
            }
        </>
    );
};

export default Snackbar;
