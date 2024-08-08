import { Grid } from '@mui/material';

import styles from 'assets/styles/pages/management/user.module.scss';

const User = () =>
    <Grid container justifyContent="center">
        <Grid id={styles.user} item xs={12}>
            <p>User</p>
        </Grid>
    </Grid>
;

export default User;
