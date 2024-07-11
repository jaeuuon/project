import { memo } from 'react';

import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '@mui/material';

import type ListType from 'types/components/list';
import type { IndexString } from 'types/signature';
import type { KeyValueWitdh } from 'types/value';

const List = <T extends {}, U extends IndexString>({
    id, column, data, onChange
}: ListType<T, U>) => {
    const columns: KeyValueWitdh[] = Object.values(column);

    return (
        <>
            <Table id={id} size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) =>
                            <TableCell key={`${id}-table-head-${index}`} width={column.width} align="center">{column.value}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.content.map((content, rowIndex) =>
                        <TableRow key={`${id}-table-body-${rowIndex}`}>
                            {columns.map((column, cellIndex) => {
                                const value = content[column.key];

                                return <TableCell key={`${id}-table-body-${rowIndex}-${cellIndex}`} align="center">{(typeof value === 'string' || typeof value === 'number') && value}</TableCell>;
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination count={data?.totalPages} shape="rounded" size="small" siblingCount={2} onChange={onChange} />
        </>
    );
};

export default memo(List);
