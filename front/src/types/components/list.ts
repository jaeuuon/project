import type { IndexString } from 'types/signature';
import type { Data } from 'types/apis/response';

export default interface List<T extends {}, U extends IndexString> {
    id: string;
    column: T;
    data?: Data<U>;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
