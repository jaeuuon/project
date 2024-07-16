import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Snackbar as MaterialSnackbar, Slide, SlideProps, Alert } from '@mui/material';

import type { State } from 'types/modules';

const SlideTransition = (slideProps: SlideProps) => <Slide { ...slideProps } direction="up" />;

const Snackbar = () => {
    const [isVisible, setVisible] = useState(false);

    const { severity, codeMessage } = useSelector((state: State) => state.snackbar);

    const setVisibleFalse = () => setVisible(false);

    useEffect(() => {
        if (codeMessage) {
            setVisible(true);
        }
    }, [codeMessage]);

    return (
        <>
            {codeMessage &&
                <MaterialSnackbar key={codeMessage.code} open={isVisible} autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={SlideTransition} onClose={setVisibleFalse}
                >
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
