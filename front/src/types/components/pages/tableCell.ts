type Align = 'center' | 'left' | 'right' | 'inherit' | 'justify';

export default interface Component {
    width?: string;
    colSpan?: number;
    rowSpan?: number;
    align?: Align;
    children: string;
};
