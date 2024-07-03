import { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CampaignOutlined, ContactSupportOutlined, GitHub } from '@mui/icons-material';

import { menu as headerMenu } from 'layout/header/Menu';

import { RootState } from 'modules';
import { closeSidebar } from 'modules/layout/main/sidebar';

import { getBorderColor } from 'common/utils';

import Modal from 'components/common/Modal';

const menu = {
    home: {
        path: headerMenu.home.path,
        subMenus: [
            {
                icon: <CampaignOutlined />,
                label: '공지사항',
                path: '/notice'
            }
        ]
    },
    information: {
        path: headerMenu.information.path,
        subMenus: [
            {
                icon: <ContactSupportOutlined />,
                label: 'Contact',
                path: `${headerMenu.information.path}/contact`
            },
            {
                icon: <GitHub />,
                label: 'GitHub',
                path: 'https://github.com/jaeuuon/project'
            }
        ]
    }
};

const Sidebar = () => {
    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const sidebarRef = useRef<HTMLInputElement>(null);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isVisible } = useSelector((state: RootState) => state.sidebar);

    const setVisibleFalse = () => dispatch(closeSidebar());

    useEffect(() => {
        dispatch(closeSidebar());

        window.scrollTo(0, 0);
    }, [pathname, dispatch]);

    useEffect(() => {
        const onResize = () => {
            if (sidebarRef?.current) {
                const styles = window.getComputedStyle(sidebarRef.current);

                if (styles.position !== 'fixed') {
                    dispatch(closeSidebar());
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [dispatch]);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            <Grid id="layout-main-grid-sidebar" className={isVisible ? 'visible' : ''} item xs="auto" style={{ backgroundColor: theme.palette.background.paper, borderColor }} ref={sidebarRef}>
                <List>
                    {Object.values(menu).find(({ path, subMenus }) => path === pathname || subMenus.find(({ path }) => path === pathname))?.subMenus.map(({ icon, label, path }, index) =>
                        <ListItem key={`list-item-main-sidebar-${index}`} disablePadding onClick={() => path.startsWith('http') ? window.open(path) : navigate(path)}>
                            <ListItemButton>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Grid>
        </>
    );
};

export default Sidebar;
