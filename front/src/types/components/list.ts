import type { StringIndex } from 'types/signature';
import type { KeyValue } from 'types/value';
import type { Data } from 'types/apis/response';

export interface KeyValueWitdh extends KeyValue {
    width: number;
};

export default interface List<T extends StringIndex> {
    id: string;
    columns: KeyValueWitdh[];
    data?: Data<T>;
    isFullWidth?: boolean;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
