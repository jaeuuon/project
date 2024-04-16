const Modal = ({
    isOpenSidebar, handleSidebar
}: {
    isOpenSidebar: boolean; handleSidebar: (isOpenSidebar: boolean) => void;
}) => {
    return (
        <>
            {isOpenSidebar &&
                <div id="div-modal" onClick={() => handleSidebar(false)} />
            }
        </>
    );
};

export default Modal;
