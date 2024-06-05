import { useEffect } from 'react';

const Modal = ({
    isOpen, setOpen
}: {
    isOpen: boolean; setOpen: (setOpen: boolean) => void;
}) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'initial';
    }, [isOpen]);

    return (
        <>
            {isOpen &&
                <div id="div-modal" onClick={() => setOpen(false)} />
            }
        </>
    );
};

export default Modal;
