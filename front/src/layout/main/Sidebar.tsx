import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import { useTheme } from '@mui/material/styles';
import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    CampaignOutlined, ContactSupportOutlined, GitHub,
    KeyboardArrowLeft, KeyboardArrowRight
} from '@mui/icons-material';

import { menu as headerMenu } from 'layout/Header';

import Modal from 'layout/Modal';

import { getBorderColor } from 'common/utils';

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
                path: headerMenu.information.path + '/contact'
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
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const sidebarRef = useRef<HTMLInputElement>(null);

    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const [isVisibleSidebar, setVisibleSidebar] = useState(false);

    useEffect(() => {
        setVisibleSidebar(false);

        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const onResize = () => {
            if (sidebarRef?.current) {
                const styles = window.getComputedStyle(sidebarRef.current);

                if (styles.position !== 'fixed') {
                    setVisibleSidebar(false);
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <Modal isVisible={isVisibleSidebar} setVisible={setVisibleSidebar} />
            <Grid id="grid-main-sidebar" className={isVisibleSidebar ? 'visible' : ''} item xs="auto" style={{ backgroundColor: theme.palette.background.paper, borderColor }} ref={sidebarRef}>
                <div id="div-main-sidebar-content">
                    <List>
                        {Object.values(menu).find(({ path, subMenus }) => path === pathname || subMenus.find(({ path }) => path === pathname))?.subMenus.map(({ icon, label, path }, index) =>
                            <ListItem key={`list-item-header-menu-${index}`} disablePadding onClick={() => path.startsWith('http') ? window.open(path) : navigate(path)}>
                                <ListItemButton>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </div>
                <div id="div-main-sidebar-icon" style={{ backgroundColor: theme.palette.background.paper, borderColor }} onClick={() => setVisibleSidebar(!isVisibleSidebar)}>
                    {isVisibleSidebar ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </div>
            </Grid>
        </>
    );
};

export default Sidebar;
