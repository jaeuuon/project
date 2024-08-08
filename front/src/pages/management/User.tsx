import { Grid } from '@mui/material';

import List from 'pages/management/user/List';
import EditAccount from 'components/pages/security/EditAccount';

const User = () =>
    <Grid container>
        <Grid item xs={12} sm={6} md={5}>
            <List />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
            <EditAccount isManagement />
        </Grid>
    </Grid>
;

export default User;
