import { Grid } from '@mui/material';

import AccountHistoryComponent from 'components/pages/security/AccountHistory';

const AccountHistory = () =>
    <Grid container justifyContent="center">
        <Grid item xs={12}>
            <AccountHistoryComponent />
        </Grid>
    </Grid>
;

export default AccountHistory;
