export default interface TextField {
    type?: string;
    name: string;
    label: string;
    isFullWidth?: boolean;
    autoComplete?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
