import { useEffect } from 'react';

import type Visible from 'types/visible';

const Modal = ({
    isVisible, setVisibleFalse
}: Visible) => {
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
