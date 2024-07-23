import type { HTMLInputTypeAttribute } from 'react';

export default interface Component {
    type?: HTMLInputTypeAttribute;
    name: string;
    value: unknown;
    label: string;
    autoComplete?: string;
    isFullWidth?: boolean;
    isError?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
