import { Grid } from '@mui/material';

import type Component from 'types/components/pages/security/editAccount';

import styles from 'assets/styles/components/pages/security/edit-account.module.scss';

const EditAccount = ({ isManagement }: Component) => {
    return (
        <Grid id={styles.editAccount} container>
            <Grid item xs={12} sm={isManagement ? 12 : 4}>
                <p>Image</p>
            </Grid>
            <Grid item xs={12} sm={isManagement ? 12 : 8}>
                <p>Text</p>
            </Grid>
        </Grid>
    );
};

export default EditAccount;
