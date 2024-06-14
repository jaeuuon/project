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
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import constant from '../../common/constant';

import type { Detail, SubMenu } from '../../types/layout/menu';

import Modal from '../Modal';

const Sidebar = () => {
    const location = useLocation();
    const menu: Detail = Object.values(constant.MENU).find((detail: Detail) => detail.path === location.pathname || detail.subMenus.find((subMenu) => subMenu.path === location.pathname));

    const navigate = useNavigate();

    const sidebar = useRef<HTMLInputElement>(null);

    const theme = useTheme();

    const [isVisibleSidebar, setVisibleSidebar] = useState(false);

    const onClickListItem = ({ path, isOpen }: SubMenu) => {
        if (isOpen) {
            window.open(path);
        } else {
            navigate(path);
        }
    };

    useEffect(() => {
        setVisibleSidebar(false);

        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const onResize = () => {
            if (sidebar?.current) {
                const styles = window.getComputedStyle(sidebar.current);

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
            <Grid id="grid-main-sidebar" className={isVisibleSidebar ? 'visible' : ''} item xs="auto" style={{ backgroundColor: theme.palette.background.paper }} ref={sidebar}>
                <div id="div-main-sidebar-content">
                    <List>
                        {menu?.subMenus.map((subMenu, index) => {
                            return (
                                <ListItem key={`list-item-header-menu-${index}`} disablePadding onClick={() => onClickListItem(subMenu)}>
                                    <ListItemButton>
                                        <ListItemIcon>{subMenu.icon}</ListItemIcon>
                                        <ListItemText primary={subMenu.label} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <div id="div-main-sidebar-icon" style={{ backgroundColor: theme.palette.background.paper }} onClick={() => setVisibleSidebar(!isVisibleSidebar)}>
                    {isVisibleSidebar ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </div>
            </Grid>
        </>
    );
};

export default Sidebar;
