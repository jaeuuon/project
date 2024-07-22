import type { default as Visible, VisibleFalse } from 'types/visible';
import type { Severity } from 'types/severity';

export default interface Popup extends Visible, VisibleFalse {
    width: number;
    severity?: Severity;
    icon: JSX.Element;
    label: string;
    content: JSX.Element;
};
