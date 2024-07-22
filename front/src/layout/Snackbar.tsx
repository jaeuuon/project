import { useState, useEffect } from 'react';

import { useAppSelector } from 'hooks';

import { Snackbar as MaterialSnackbar, Slide, SlideProps, Alert } from '@mui/material';

import styles from 'assets/styles/common.module.scss';

const SlideTransition = (slideProps: SlideProps) => <Slide { ...slideProps } direction="up" />;

const Snackbar = () => {
    const [isVisible, setVisible] = useState(false);

    const { severity, codeMessage } = useAppSelector((state) => state.snackbar);

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
                        <p className={styles.wordKeep}>{codeMessage.message}</p>
                        {severity === 'error' &&
                            <p className={styles.wordBreak}>[{codeMessage.code}]</p>
                        }
                    </Alert>
                </MaterialSnackbar>
            }
        </>
    );
};

export default Snackbar;
