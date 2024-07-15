import { useLocation, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import { menu as headerMenu } from 'enums/layout/header/menu';
import { menu as sidebarMenu, menus as sidebarMenus } from 'enums/layout/main/sidebar';

import type { RootState } from 'types/redux';

import Home from 'pages/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/Security';
import LoginHistory from 'pages/security/LoginHistory';

import Loading from 'components/Loading';

const isRequiredInit = (pathname: string) => Object.values(headerMenu).some(({ PATH, IS_REQUIRED_INIT }) => PATH === pathname && IS_REQUIRED_INIT)
    || sidebarMenus.some(({ SUB_MENUS }) => SUB_MENUS.some(({ PATH, IS_REQUIRED_INIT }) => PATH === pathname && IS_REQUIRED_INIT));

const Content = () => {
    const { pathname } = useLocation();

    const { isInit } = useSelector((state: RootState) => state.user);

    const isRenderRoutes = !isRequiredInit(pathname) || (isRequiredInit(pathname) && isInit);

    return (
        <Grid id="layout-main-grid-content" item xs>
            <div>
                {isRenderRoutes &&
                    <Routes>
                        <Route path={headerMenu.HOME.PATH} element={<Home />} />
                        <Route path={sidebarMenu.HOME.NOTICE.PATH} element={<Notice />} />
                        <Route path={headerMenu.INFORMATION.PATH} element={<Information />} />
                        <Route path={sidebarMenu.INFORMATION.CONTACT.PATH} element={<Contact />} />
                        <Route path={headerMenu.SECURITY.PATH} element={<Security />} />
                        <Route path={sidebarMenu.SECURITY.HISTORY.PATH} element={<LoginHistory />} />
                    </Routes>
                }
                <Loading isVisible={!isRenderRoutes} />
            </div>
        </Grid>
    );
};

export default Content;
