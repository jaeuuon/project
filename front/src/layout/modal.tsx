const Modal = ({
    setOpenSidebar
}: {
    setOpenSidebar: (isOpenSidebar: boolean) => void;
}) => {
    return (
        <div id="div-modal" onClick={() => setOpenSidebar(false)} />
    );
};

export default Modal;
