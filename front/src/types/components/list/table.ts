import type { IndexString } from 'types/signature';
import type { KeyValueWitdh } from 'types/value';

export default interface Table<T extends IndexString> {
    id: string;
    columns: KeyValueWitdh[];
    content?: T[];
}
