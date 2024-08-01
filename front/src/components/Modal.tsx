import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import type Component from 'types/components/modal';

import styles from 'assets/styles/components/modal.module.scss';

const setOverflow = (isVisible: boolean) => {
    document.body.style.overflow = isVisible ? 'hidden' : 'initial';
};

const Modal = ({
    isVisible, setVisibleFalse
}: Component) => {
    useEffect(() => {
        setOverflow(isVisible);
    }, [isVisible]);

    useEffect(() => {
        return () => {
            if (isVisible) {
                setOverflow(false);
            }
        };
    }, []);

    const { zIndex: { modal: zIndex } } = useTheme();

    return (
        <>
            {isVisible &&
                <div id={styles.modal} style={{ zIndex }} onClick={setVisibleFalse} />
            }
        </>
    );
};

export default Modal;
