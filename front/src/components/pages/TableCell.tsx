import { TableCell as MaterialTableCell } from '@mui/material';

import type Component from 'types/components/pages/tableCell';

const TableCell = ({
    colSpan, rowSpan, content, align = 'center'
}: Component) => {
    return (
        <MaterialTableCell colSpan={colSpan} rowSpan={rowSpan} align={align}>{content}</MaterialTableCell>
    );
};

export default TableCell;
