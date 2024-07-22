import { memo } from 'react';

import { Table as MaterialTable, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import type { StringIndex } from 'types/signature';
import type TableType from 'types/components/list/table';

import Loading from 'components/Loading';

import styles from 'assets/styles/common.module.scss';

const Table = <T extends StringIndex>({
    id, columns, content, isFullWidth = true, isLoading = false
}: TableType<T>) => {
    return (
        <div className={styles.positionRelative}>
            <MaterialTable className={!isFullWidth ? styles.widthInitial : ''} size="small">
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

                                return (
                                    <TableCell key={`${id}-table-body-${rowIndex}-${cellIndex}`} align="center">
                                        {(typeof value === 'string' || typeof value === 'number') && value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </MaterialTable>
            <Loading isVisible={isLoading} />
        </div>
    );
};

export default memo(Table);
