import { memo } from 'react';

import type { StringIndex } from 'types/signature';
import type ListType from 'types/components/list';

import Table from 'components/pages/list/Table';
import Pagination from 'components/pages/list/Pagination';

const List = <T extends StringIndex>({
    id, columns, data, isFullWidth = true, onChange
}: ListType<T>) => {
    return (
        <>
            <Table id={id} columns={columns} content={data?.content} isFullWidth={isFullWidth} />
            <Pagination totalPages={data?.totalPages} onChange={onChange} />
        </>
    );
};

export default memo(List);
