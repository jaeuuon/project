const Modal = ({
    isOpenSidebar, handleSidebar
}: {
    isOpenSidebar: boolean; handleSidebar: (isOpenSidebar: boolean) => void;
}) => {
    const onClick = () => handleSidebar(false);

    return (
        <>
            {isOpenSidebar &&
                <div id="div-modal" onClick={onClick} />
            }
        </>
    );
};

export default Modal;
