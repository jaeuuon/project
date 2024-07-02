export interface VisibleFalse {
    setVisibleFalse: () => void;
};

export default interface Visible extends VisibleFalse {
    isVisible: boolean;
};
