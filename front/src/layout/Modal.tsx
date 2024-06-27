import { useEffect } from 'react';

import type ModalType from 'types/layout/modal';

const Modal = ({
    isVisible, setVisible
}: ModalType) => {
    const onClick = () => setVisible(false);

    useEffect(() => {
        document.body.style.overflow = isVisible ? 'hidden' : 'initial';
    }, [isVisible]);

    return (
        <>
            {isVisible &&
                <div id="div-modal" onClick={onClick} />
            }
        </>
    );
};

export default Modal;
