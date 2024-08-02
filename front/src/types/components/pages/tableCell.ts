type Align = 'center' | 'left' | 'right' | 'inherit' | 'justify';

export default interface Component {
    colSpan?: number;
    rowSpan?: number;
    align?: Align;
    content: string;
};
