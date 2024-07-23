import type { StringIndex } from 'types/signature';
import type { KeyValueWitdh } from 'types/components/pages/list/table';
import type { Data } from 'types/apis/response';

export default interface List<T extends StringIndex> {
    id: string;
    columns: KeyValueWitdh[];
    data?: Data<T>;
    isFullWidth?: boolean;
    isLoading?: boolean;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
