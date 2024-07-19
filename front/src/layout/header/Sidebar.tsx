import { useAppDispatch } from 'hooks';
import { open } from 'store/layout/main/sidebar';

import { Grid, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';

import styles from 'assets/styles/layout/header/sidebar.module.scss';

const Sidebar = () => {
    const dispatch = useAppDispatch();

    const onClick = () => dispatch(open());

    return (
        <Grid id={styles.grid} item xs="auto">
            <Button id={styles.button} variant="outlined" onClick={onClick}>
                <Menu />
            </Button>
        </Grid>
    );
};

export default Sidebar;
