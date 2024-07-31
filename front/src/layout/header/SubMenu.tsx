import { Grid, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { useAppDispatch } from 'hooks';
import { open } from 'store/layout/main/subMenu';

import styles from 'assets/styles/layout/header/sub-menu.module.scss';

const SubMenu = () => {
    const dispatch = useAppDispatch();
    const onClick = () => dispatch(open());

    return (
        <Grid id={styles.subMenu} item xs="auto">
            <Button variant="outlined" onClick={onClick}>
                <Menu />
            </Button>
        </Grid>
    );
};

export default SubMenu;
