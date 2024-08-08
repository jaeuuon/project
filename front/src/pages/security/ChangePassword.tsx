import { Grid } from '@mui/material';

import styles from 'assets/styles/pages/security/change-password.module.scss';

const ChangePassword = () =>
    <Grid container justifyContent="center">
        <Grid id={styles.changePassword} item xs={12}>
            <p>ChangePassword</p>
        </Grid>
    </Grid>
;

export default ChangePassword;
