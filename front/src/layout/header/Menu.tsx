import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid, Button } from '@mui/material';

import { menu } from 'enums/layout/header/menu';

import type { RootState } from 'types/redux';

const Menu = () => {
    const navigate = useNavigate();

    const { roles } = useSelector((state: RootState) => state.user);

    return (
        <Grid id="layout-header-grid-menu" item xs>
            {Object.values(menu).filter(({ VISIBLE }) => VISIBLE).map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                const requiredRoles = REQUIRED.ROLES;

                return (
                    <Fragment key={`button-header-menu-${index}`}>
                        {(requiredRoles.length === 0
                            || requiredRoles.some((requiredRole) => roles.some(({ code }) => requiredRole === code))
                        ) &&
                            <Button className="button-header" startIcon={ICON} onClick={() => navigate(PATH)}>
                                <span className="display-none-md">{LABEL}</span>
                            </Button>
                        }
                    </Fragment>
                );
            })}
        </Grid>
    );
};

export default Menu;
