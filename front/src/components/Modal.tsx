import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import type Component from 'types/components/modal';

import styles from 'assets/styles/components/modal.module.scss';

const setOverflow = (overflow: string) => {
    document.body.style.overflow = overflow;
};

const Modal = ({
    setVisibleFalse
}: Component) => {
    useEffect(() => {
        setOverflow('hidden');

        return () => {
            setOverflow('initial');
        };
    }, []);

    const { zIndex: { modal: zIndex } } = useTheme();

    return (
        <div id={styles.modal} style={{ zIndex }} onClick={setVisibleFalse} />
    );
};

export default Modal;
