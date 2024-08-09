export default interface Component {
    width?: string;
    colSpan?: number;
    rowSpan?: number;
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
    children: string;
};
