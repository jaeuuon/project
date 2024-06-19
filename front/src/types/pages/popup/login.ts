export default interface Login {
    setVisible: (isVisible: boolean) => void;
};

export interface Payload {
    id: number;
    email: string;
    name: string;
    authorities: string;
    authorityValues: string;
    exp: number;
};
