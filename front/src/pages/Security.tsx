import { Grid } from '@mui/material';

import AccountHistory from 'components/pages/security/AccountHistory';
import LoginHistory from 'components/pages/security/LoginHistory';

const Security = () =>
    <Grid container>
        <Grid item xs={12}>
            <p>Security</p>
        </Grid>
        <Grid item xs={12} lg={6}>
            <AccountHistory isSimple />
        </Grid>
        <Grid item xs={12} lg={6}>
            <LoginHistory isSimple />
        </Grid>
    </Grid>
;

export default Security;
