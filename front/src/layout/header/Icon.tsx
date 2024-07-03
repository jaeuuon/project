import { Grid, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { openSidebar } from 'modules/layout/main/sidebar';

import Logo from 'Logo';

const Icon = () => {
    const dispatch = useDispatch();

    const onClick = () => dispatch(openSidebar());

    return (
        <Grid id="layout-header-grid-icon" item xs="auto">
            <Button id="button-main-sidebar" variant="outlined" onClick={onClick}>
                <Menu />
            </Button>
            <Logo />
        </Grid>
    );
};

export default Icon;
