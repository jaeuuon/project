import { useDispatch } from 'react-redux';

import { Grid, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { open } from 'modules/layout/main/sidebar';

const Sidebar = () => {
    const dispatch = useDispatch();

    const onClick = () => dispatch(open());

    return (
        <Grid id="layout-header-grid-sidebar" item xs="auto">
            <Button className="button-header" variant="outlined" onClick={onClick}>
                <Menu />
            </Button>
        </Grid>
    );
};

export default Sidebar;
