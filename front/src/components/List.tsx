import { memo } from 'react';

import { Table, TableHead, TableRow, TableCell, Pagination } from '@mui/material';

import type ListType from 'types/components/list';

const List = <T extends {}, U>({
    column, data, onChange
}: ListType<T, U>) => {
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>test</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Pagination count={data?.totalPages} shape="rounded" size="small" siblingCount={2} onChange={onChange} />
        </>
    );
};

export default memo(List);
