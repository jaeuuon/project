import { Grid } from '@mui/material';

import AccountHistory from 'components/pages/security/AccountHistory';
import LoginHistory from 'components/pages/security/LoginHistory';

import styles from 'assets/styles/pages/security.module.scss';

const Security = () =>
    <Grid id={styles.security} container>
        <Grid item xs={12}>
            <p>My Information</p>
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
