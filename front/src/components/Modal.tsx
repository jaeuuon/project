import { useEffect } from 'react';

import type ModalType from 'types/components/modal';

const Modal = ({
    isVisible, setVisibleFalse
}: ModalType) => {
    useEffect(() => {
        document.body.style.overflow = isVisible ? 'hidden' : 'initial';
    }, [isVisible]);

    return (
        <>
            {isVisible &&
                <div id="div-modal" onClick={setVisibleFalse} />
            }
        </>
    );
};

export default Modal;
