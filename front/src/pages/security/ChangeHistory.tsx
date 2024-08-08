import { Grid } from '@mui/material';

import ChangeHistoryComponent from 'components/pages/security/ChangeHistory';

const ChangeHistory = () =>
    <Grid container justifyContent="center">
        <Grid item xs={12} sm={11} md={10} lg={9} xl={8}>
            <ChangeHistoryComponent />
        </Grid>
    </Grid>
;

export default ChangeHistory;
