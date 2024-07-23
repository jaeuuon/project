import { memo } from 'react';

import { Table as MaterialTable, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import type { StringIndex } from 'types/signature';
import type Component from 'types/components/pages/list/table';

import Loading from 'components/Loading';

import styles from 'assets/styles/components/pages/list/table.module.scss';

const Table = <T extends StringIndex>({
    id, columns, content, isFullWidth = true, isLoading = false
}: Component<T>) => {
    return (
        <div className={styles.positionRelative}>
            <MaterialTable className={!isFullWidth ? styles.widthInitial : ''} size="small">
                <TableHead>
                    <TableRow>
                        {columns.map(({ width, value }, index) =>
                            <TableCell key={`${id}-table-head-${index}`} width={width} align="center">{value}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content?.map((content, rowIndex) =>
                        <TableRow key={`${id}-table-body-${rowIndex}`}>
                            {columns.map(({ key }, cellIndex) => {
                                const value = content[key];

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
