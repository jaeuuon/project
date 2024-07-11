import type { IndexString } from 'types/signature';
import type { Data } from 'types/apis/response';
import type { KeyValueWitdh } from 'types/value';

export default interface List<T extends IndexString> {
    id: string;
    columns: KeyValueWitdh[];
    data?: Data<T>;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
