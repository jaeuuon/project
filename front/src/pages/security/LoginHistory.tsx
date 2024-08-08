import { Grid } from '@mui/material';

import LoginHistoryComponent from 'components/pages/security/LoginHistory';

const LoginHistory = () =>
    <Grid container justifyContent="center">
        <Grid item xs={12}>
            <LoginHistoryComponent />
        </Grid>
    </Grid>
;

export default LoginHistory;
