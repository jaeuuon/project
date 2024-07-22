import type { StringIndex } from 'types/signature';
import type { KeyValueWitdh } from 'types/components/list';

export default interface Table<T extends StringIndex> {
    id: string;
    columns: KeyValueWitdh[];
    content?: T[];
    isFullWidth?: boolean;
    isLoading?: boolean;
}
