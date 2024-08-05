import { TableCell as MuiTableCell } from '@mui/material';

import type Component from 'types/components/pages/tableCell';

const TableCell = ({
    width, colSpan, rowSpan, align = 'center', children
}: Component) =>
    <MuiTableCell width={width} colSpan={colSpan} rowSpan={rowSpan} align={align}>{children}</MuiTableCell>
;

export default TableCell;
