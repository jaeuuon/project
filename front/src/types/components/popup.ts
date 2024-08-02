import type { AlertColor } from '@mui/material';

export default interface Component {
    width: number;
    severity?: AlertColor;
    icon: JSX.Element;
    label: string;
    children: JSX.Element;
    isVisible: boolean;
    setVisibleFalse: () => void;
};
