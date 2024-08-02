import { TableCell as MaterialTableCell } from '@mui/material';

import type Component from 'types/components/pages/tableCell';

const TableCell = ({
    width, colSpan, rowSpan, align = 'center', children
}: Component) => {
    return (
        <MaterialTableCell width={width} colSpan={colSpan} rowSpan={rowSpan} align={align}>{children}</MaterialTableCell>
    );
};

export default TableCell;
