import type Visible from 'types/visible';

export default interface Popup extends Visible {
    width: number;
    icon: JSX.Element;
    label: string;
    content: JSX.Element;
};
