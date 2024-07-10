import { Pagination } from '@mui/material';

import type TableType from 'types/components/pages/table';

const Table = <T extends unknown, U extends {}>({
    content, totalPages,
    column, onChange
}: TableType<T, U>) => {
    const columns = Object.keys(column);

    return (
        <>
            <Pagination count={totalPages} shape="rounded" size="small" siblingCount={2} onChange={onChange} />
        </>
    );
};

export default Table;
