import { HTMLInputTypeAttribute } from 'react';

export default interface Component {
    type?: HTMLInputTypeAttribute;
    name: string;
    value: unknown;
    autoComplete?: string;
    isFullWidth?: boolean;
    isError?: boolean;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
