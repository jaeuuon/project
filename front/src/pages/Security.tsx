import { Grid } from '@mui/material';

import ChangeHistory from 'components/pages/security/ChangeHistory';
import LoginHistory from 'components/pages/security/LoginHistory';

const Security = () =>
    <Grid container>
        <Grid item xs={12} lg={6}>
            <ChangeHistory isSimple />
        </Grid>
        <Grid item xs={12} lg={6}>
            <LoginHistory isSimple />
        </Grid>
    </Grid>
;

export default Security;
