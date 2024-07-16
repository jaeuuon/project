export default interface TextField {
    type?: string;
    name: string;
    value?: string;
    autoComplete?: string;
    isFullWidth?: boolean;
    isError?: boolean;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
