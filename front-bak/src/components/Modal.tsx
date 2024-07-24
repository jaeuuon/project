import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import type Component from 'types/components/modal';

import styles from 'assets/styles/components/modal.module.scss';

const Modal = ({
    isVisible, setVisibleFalse
}: Component) => {
    useEffect(() => {
        document.body.style.overflow = isVisible ? 'hidden' : 'initial';
    }, [isVisible]);

    const { zIndex } = useTheme();

    return (
        <>
            {isVisible &&
                <div id={styles.modal} style={{ zIndex: zIndex.modal }} onClick={setVisibleFalse} />
            }
        </>
    );
};

export default Modal;
