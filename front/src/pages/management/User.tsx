import { Grid } from '@mui/material';

import List from 'pages/management/user/List';

import styles from 'assets/styles/pages/management/user.module.scss';

const User = () =>
    <Grid container>
        <Grid id={styles.user} item xs={12} sm={6} md={5}>
            <List />
        </Grid>
    </Grid>
;

export default User;
