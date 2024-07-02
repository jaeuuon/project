import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';
import { HomeOutlined, InfoOutlined } from '@mui/icons-material';

export const menu = {
    home: {
        icon: <HomeOutlined />,
        label: 'Home',
        path: '/'
    },
    information: {
        icon: <InfoOutlined />,
        label: 'Information',
        path: '/information'
    }
};

const Menu = () => {
    const navigate = useNavigate();

    return (
        <Grid id="layout-header-grid-menu" item xs>
            {Object.values(menu).map((detail, index) =>
                <Button key={`button-header-menu-${index}`} startIcon={detail.icon} onClick={() => navigate(detail.path)}>
                    <span className="display-none-sm">{detail.label}</span>
                </Button>
            )}
        </Grid>
    );
};

export default Menu;
