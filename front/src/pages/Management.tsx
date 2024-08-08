import { Grid } from '@mui/material';

import styles from 'assets/styles/pages/management.module.scss';

const Management = () =>
    <Grid id={styles.management} container>
        <Grid item xs={12}>
            <p>Management</p>
        </Grid>
    </Grid>
;

export default Management;
