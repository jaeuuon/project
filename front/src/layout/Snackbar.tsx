import { useState, useEffect } from 'react';

import { Snackbar as MaterialSnackbar, SlideProps, Slide, Alert } from '@mui/material';

import { useAppSelector } from 'hooks';

import styles from 'assets/styles/layout/snackbar.module.scss';

const SlideTransition = (slideProps: SlideProps) => <Slide { ...slideProps } direction="up" />;

const Snackbar = () => {
    const { severity, code, message } = useAppSelector(({ snackbar }) => snackbar);

    const [isVisible, setVisible] = useState(false);
    const setVisibleFalse = () => setVisible(false);

    useEffect(() => {
        if (code && message) {
            setVisible(true);
        }
    }, [code, message]);

    return (
        <MaterialSnackbar key={code} open={isVisible} autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={SlideTransition} onClose={setVisibleFalse}
        >
            <Alert severity={severity} onClose={setVisibleFalse}>
                <p className={styles.message}>{message}</p>
                {severity === 'error' &&
                    <p className={styles.code}>[{code}]</p>
                }
            </Alert>
        </MaterialSnackbar>
    );
};

export default Snackbar;
