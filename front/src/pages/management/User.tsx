import { Grid } from '@mui/material';

import List from 'pages/management/user/List';

const User = () =>
    <Grid container>
        <Grid item xs={12} sm={6} md={5}>
            <List />
        </Grid>
    </Grid>
;

export default User;
