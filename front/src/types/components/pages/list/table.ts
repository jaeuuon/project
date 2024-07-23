import type { KeyValue } from 'types/value';
import type { StringIndex } from 'types/signature';

export interface KeyValueWitdh extends KeyValue {
    width: number;
};

export default interface Table<T extends StringIndex> {
    id: string;
    columns: KeyValueWitdh[];
    content?: T[];
    isFullWidth?: boolean;
    isLoading?: boolean;
};
