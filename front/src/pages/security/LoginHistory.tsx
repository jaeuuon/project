import { Grid } from '@mui/material';

import LoginHistoryComponent from 'components/pages/security/LoginHistory';

const LoginHistory = () =>
    <Grid container justifyContent="center">
        <Grid item xs={12} sm={11} md={10} lg={9} xl={8}>
            <LoginHistoryComponent />
        </Grid>
    </Grid>
;

export default LoginHistory;
