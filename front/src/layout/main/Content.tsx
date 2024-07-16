import { useLocation, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import type { State } from 'types/modules';

import { menu as headerMenu } from 'enums/layout/header/menu';
import { menu as sidebarMenu, menus as sidebarMenus } from 'enums/layout/main/sidebar';

import Home from 'pages/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/Security';
import LoginHistory from 'pages/security/LoginHistory';

import Loading from 'components/Loading';

const Content = () => {
    const { pathname } = useLocation();

    const { isInit } = useSelector((state: State) => state.user);

    const requiredInit = Object.values(headerMenu).some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT)
        || sidebarMenus.some(({ SUB_MENUS }) => SUB_MENUS.some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT));

    return (
        <Grid id="layout-main-grid-content" item xs>
            <div>
                {(requiredInit && isInit) || !requiredInit
                    ? <Routes>
                        <Route path={headerMenu.HOME.PATH} element={<Home />} />
                        <Route path={sidebarMenu.HOME.NOTICE.PATH} element={<Notice />} />
                        <Route path={headerMenu.INFORMATION.PATH} element={<Information />} />
                        <Route path={sidebarMenu.INFORMATION.CONTACT.PATH} element={<Contact />} />
                        <Route path={headerMenu.SECURITY.PATH} element={<Security />} />
                        <Route path={sidebarMenu.SECURITY.HISTORY.PATH} element={<LoginHistory />} />
                    </Routes>
                    : <Loading isVisible={true} />
                }
            </div>
        </Grid>
    );
};

export default Content;
