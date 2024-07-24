import type { StringIndex } from 'types/signature';

interface KeyValueWitdh {
    key: string;
    value: string;
    width: number;
};

export interface Table {
    id: string;
    columns: KeyValueWitdh[];
    isFullWidth?: boolean;
    isLoading?: boolean;
}

export default interface Component<T extends StringIndex> extends Table {
    content?: T[];
};
