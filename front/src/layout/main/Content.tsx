import { Fragment } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import type { RootState } from 'types/modules';

import { menu as originHeaderMenu } from 'enums/layout/header/menu';
import { menus as sidebarMenus } from 'enums/layout/main/sidebar';

import NotFound from 'pages/NotFound';
import Loading from 'components/Loading';

const Content = () => {
    const { pathname } = useLocation();

    const { isInit, roles } = useSelector((state: RootState) => state.user);

    const requiredInit = Object.values(originHeaderMenu).some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT)
        || sidebarMenus.some(({ MENUS }) => MENUS.some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT));

    return (
        <Grid id="layout-main-grid-content" item xs>
            <div>
                {(requiredInit && isInit) || !requiredInit
                    ? <Routes>
                        {sidebarMenus.map(({ PATH, MENUS }, headerMenuIndex) => {
                            const headerMenu = Object.values(originHeaderMenu).find(({ PATH: ORIGIN_PATH }) => PATH === ORIGIN_PATH);
                            const headerMenuRequiredRoles = headerMenu?.REQUIRED.ROLES || [];

                            return (
                                <Fragment key={`route-${headerMenuIndex}`}>
                                    {headerMenu && (
                                        headerMenuRequiredRoles.length === 0
                                        || headerMenuRequiredRoles.some((headerMenuRequiredRole) => roles.some(({ code }) => headerMenuRequiredRole === code))
                                    ) &&
                                        <>
                                            <Route path={headerMenu.PATH} element={headerMenu.ELEMENT} />
                                            {MENUS.map(({ PATH, ELEMENT, REQUIRED }, menuIndex) => {
                                                const requiredRoles = REQUIRED.ROLES;

                                                return <Fragment key={`route-${headerMenuIndex}-${menuIndex}`}>
                                                    {(requiredRoles.length === 0 || requiredRoles.some((requiredRole) => roles.some(({ code }) => requiredRole === code))) &&
                                                        <Route path={PATH} element={ELEMENT} />
                                                    }
                                                </Fragment>
                                            })}
                                        </>
                                    }
                                </Fragment>
                            );
                        })}
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                    : <Loading isVisible={true} />
                }
            </div>
        </Grid>
    );
};

export default Content;
