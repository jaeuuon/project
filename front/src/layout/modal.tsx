const Modal = ({
    setOpenSidebar
}: {
    setOpenSidebar: (isOpenSidebar: boolean) => void;
}) => {
    const onClick = () => setOpenSidebar(false);

    return (
        <div id="div-modal" onClick={onClick} />
    );
};

export default Modal;
