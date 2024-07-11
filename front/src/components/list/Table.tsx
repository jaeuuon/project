import { memo } from 'react';

import { Table as MaterialTable, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import type TableType from 'types/components/list/table';
import type { IndexString } from 'types/signature';

const Table = <T extends IndexString>({
    id, columns, content
}: TableType<T>) => {
    return (
        <MaterialTable id={id} size="small">
            <TableHead>
                <TableRow>
                    {columns.map((column, index) =>
                        <TableCell key={`${id}-table-head-${index}`} width={column.width} align="center">{column.value}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {content?.map((content, rowIndex) =>
                    <TableRow key={`${id}-table-body-${rowIndex}`}>
                        {columns.map((column, cellIndex) => {
                            const value = content[column.key];

                            return <TableCell key={`${id}-table-body-${rowIndex}-${cellIndex}`} align="center">{(typeof value === 'string' || typeof value === 'number') && value}</TableCell>;
                        })}
                    </TableRow>
                )}
            </TableBody>
        </MaterialTable>
    );
};

export default memo(Table);
