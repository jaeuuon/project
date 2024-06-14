import type Modal from './modal';

export default interface Popup extends Modal {
    width: number;
    icon: JSX.Element;
    label: string;
    content: JSX.Element;
};
