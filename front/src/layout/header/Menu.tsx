import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

import { menu } from 'enums/layout/header/menu';

const Menu = () => {
    const navigate = useNavigate();

    return (
        <Grid id="layout-header-grid-menu" item xs>
            {Object.values(menu).filter(({ IS_VISIBLE }) => IS_VISIBLE).map(({ ICON, PATH, LABEL }, index) =>
                <Button key={`button-header-menu-${index}`} className="button-header" startIcon={ICON} onClick={() => navigate(PATH)}>
                    <span className="display-none-md">{LABEL}</span>
                </Button>
            )}
        </Grid>
    );
};

export default Menu;
