import { useState, useEffect } from 'react';

import { Snackbar as MaterialSnackbar, Slide, SlideProps } from '@mui/material';

import { useAppSelector } from 'hooks';

import Alert from 'components/Alert';

const SlideTransition = (slideProps: SlideProps) => <Slide { ...slideProps } direction="up" />;

const Snackbar = () => {
    const { severity, codeMessage } = useAppSelector((state) => state.snackbar);

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
                <MaterialSnackbar key={codeMessage.code} open={isVisible} autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={SlideTransition} onClose={setVisibleFalse}
                >
                    <Alert severity={severity} codeMessage={codeMessage} setVisibleFalse={setVisibleFalse} />
                </MaterialSnackbar>
            }
        </>
    );
};

export default Snackbar;
