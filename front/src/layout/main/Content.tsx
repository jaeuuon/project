import { Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';

import { menu as headerMenu } from 'enums/layout/header/menu';
import { menu as sidebarMenu } from 'enums/layout/main/sidebar';

import Home from 'pages/Home';
import Notice from 'pages/home/Notice';

import Information from 'pages/Information';
import Contact from 'pages/information/Contact';

import Security from 'pages/Security';
import LoginHistory from 'pages/security/LoginHistory';

const Content = () => {
    return (
        <Grid id="layout-main-grid-content" item xs>
            <div>
                {}
                <Routes>
                    <Route path={headerMenu.HOME.PATH} element={<Home />} />
                    <Route path={sidebarMenu.HOME.SUB_MENU.NOTICE.PATH} element={<Notice />} />
                    <Route path={headerMenu.INFORMATION.PATH} element={<Information />} />
                    <Route path={sidebarMenu.INFORMATION.SUB_MENU.CONTACT.PATH} element={<Contact />} />
                    <Route path={headerMenu.SECURITY.PATH} element={<Security />} />
                    <Route path={sidebarMenu.SECURITY.SUB_MENU.HISTORY.PATH} element={<LoginHistory />} />
                </Routes>
            </div>
        </Grid>
    );
};

export default Content;
