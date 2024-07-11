import { memo } from 'react';

import type ListType from 'types/components/list';
import type { IndexString } from 'types/signature';

import Table from 'components/list/Table';
import Pagination from 'components/list/Pagination';

const List = <T extends IndexString>({
    id, columns, data, onChange
}: ListType<T>) => {
    return (
        <>
            <Table id={id} columns={columns} content={data?.content} />
            <Pagination totalPages={data?.totalPages} onChange={onChange} />
        </>
    );
};

export default memo(List);
