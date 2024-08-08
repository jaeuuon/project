import { Grid as MuiGrid } from '@mui/material';

import type Component from 'types/components/pages/grid';

const Grid = ({
    id, children
}: Component) =>
    <MuiGrid container justifyContent="center">
        <MuiGrid id={id} item xs={12} lg={11} xl={10}>
            {children}
        </MuiGrid>
    </MuiGrid>
;

export default Grid;
