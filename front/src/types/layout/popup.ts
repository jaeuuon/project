import type { default as Visible, VisibleFalse } from 'types/visible';

export default interface Popup extends Visible, VisibleFalse {
    width: number;
    icon: JSX.Element;
    label: string;
    content: JSX.Element;
};
