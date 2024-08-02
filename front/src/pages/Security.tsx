import { Grid } from '@mui/material';

import LoginHistory from 'components/pages/security/LoginHistory';

const Security = () => {
    return (
        <Grid container>
            <Grid item xs={12} lg={6}></Grid>
            <Grid item xs={12} lg={6}>
                <LoginHistory isSimple />
            </Grid>
        </Grid>
    );
};

export default Security;
