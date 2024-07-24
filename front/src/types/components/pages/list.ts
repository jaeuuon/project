import type { StringIndex } from 'types/signature';
import type { Table } from 'types/components/pages/list/table';
import type { Pagination } from 'types/components/pages/list/pagination';
import type { Data } from 'types/apis/response';

export default interface Component<T extends StringIndex> extends Table, Pagination {
    data?: Data<T>;
};
