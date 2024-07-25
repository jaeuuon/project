import type { StringIndex } from 'types/signature';

interface Thead {
    colSpan: number;
    rowSpan: number;
    label: string;
};

export interface Table {
    id: string;
    thead: Thead[][];
    isFullWidth?: boolean;
    isLoading?: boolean;
};

export default interface Component<T extends StringIndex> extends Table {
    content?: T[];
};
