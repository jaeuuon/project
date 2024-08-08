import { Grid } from '@mui/material';

import AccountHistoryComponent from 'components/pages/security/AccountHistory';

import styles from 'assets/styles/pages/security/account-history.module.scss';

const AccountHistory = () =>
    <Grid container justifyContent="center">
        <Grid id={styles.accountHistory} item xs={12}>
            <AccountHistoryComponent />
        </Grid>
    </Grid>
;

export default AccountHistory;
