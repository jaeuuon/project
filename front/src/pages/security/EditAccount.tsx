import { Grid as MuiGrid } from '@mui/material';

import Grid from 'components/pages/Grid';

import styles from 'assets/styles/pages/security/edit-account.module.scss';

const EditAccount = () => {
    return (
        <Grid>
            <MuiGrid id={styles.editAccount} container>
                <MuiGrid item xs={12} sm={4}>
                    <p>Image</p>
                </MuiGrid>
                <MuiGrid item xs={12} sm={8}>
                    <p>Text</p>
                </MuiGrid>
            </MuiGrid>
        </Grid>
    );
};

export default EditAccount;
