import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import type ModalType from 'types/components/modal';

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
                <div id="div-modal" style={{ zIndex: theme.zIndex.modal }} onClick={setVisibleFalse} />
            }
        </>
    );
};

export default Modal;
