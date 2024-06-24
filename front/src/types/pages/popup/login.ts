export default interface Login {
    setVisible: (isVisible: boolean) => void;
    reissuance: () => Promise<void>;
};
