import type { Severity } from 'types/common/utils';

export default interface Component {
    width: number;
    severity?: Severity;
    icon: JSX.Element;
    label: string;
    content: JSX.Element;
    isVisible: boolean;
    setVisibleFalse: () => void;
};
