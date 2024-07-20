import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import type ModalType from 'types/components/modal';

import styles from 'assets/styles/components/modal.module.scss';

const Modal = ({
    isVisible, setVisibleFalse
}: ModalType) => {
    const theme = useTheme();

    useEffect(() => {
        document.body.style.overflow = isVisible ? 'hidden' : 'initial';
    }, [isVisible]);

    return (
        <>
            {isVisible &&
                <div id={styles.modal} style={{ zIndex: theme.zIndex.modal }} onClick={setVisibleFalse} />
            }
        </>
    );
};

export default Modal;
