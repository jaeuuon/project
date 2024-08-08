import { Grid } from '@mui/material';

import LoginHistoryComponent from 'components/pages/security/LoginHistory';

import styles from 'assets/styles/pages/security/login-history.module.scss';

const LoginHistory = () =>
    <Grid container>
        <Grid id={styles.loginHistory} item xs={12}>
            <LoginHistoryComponent />
        </Grid>
    </Grid>
;

export default LoginHistory;
