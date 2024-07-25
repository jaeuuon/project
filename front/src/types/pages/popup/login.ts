export default interface Page {
    scheduler: () => Promise<void>;
    setVisibleFalse: () => void;
};
