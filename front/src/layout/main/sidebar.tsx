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

import Modal from '../modal';

import { Detail } from '../../types/menu';

import constant from '../../common/constant';

const Sidebar = () => {
    const location = useLocation();
    const menu: Detail = Object.values(constant.MENU).find((detail: Detail) => detail.path === location.pathname || detail.subMenus.find((subMenu) => subMenu.path === location.pathname));

    const navigate = useNavigate();

    const sidebar = useRef<HTMLInputElement>(null);

    const theme = useTheme();

    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const onClickIcon = () => setOpenSidebar(!isOpenSidebar);
    const onClickListItem = (path: string, isOpen?: boolean) => {
        if (isOpen) {
            window.open(path);
        } else {
            navigate(path);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpenSidebar ? 'hidden' : 'initial';
    }, [isOpenSidebar]);

    useEffect(() => {
        const onResize = () => {
            if (sidebar?.current) {
                const styles = window.getComputedStyle(sidebar.current);

                if (styles.position !== 'fixed') {
                    setOpenSidebar(false);
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            {isOpenSidebar &&
                <Modal setOpenSidebar={setOpenSidebar} />
            }
            <Grid id="grid-main-sidebar" className={isOpenSidebar ? 'sidebar-open' : ''} item xs="auto" style={{ backgroundColor: theme.palette.background.paper }} ref={sidebar}>
                <div id="div-main-sidebar-content">
                    <List>
                        {menu?.subMenus.map((subMenu, index) => {
                            return (
                                <ListItem key={`list-item-header-menu-${index}`} disablePadding onClick={() => onClickListItem(subMenu.path, subMenu.isOpen)}>
                                    <ListItemButton>
                                        <ListItemIcon>{subMenu.icon}</ListItemIcon>
                                        <ListItemText primary={subMenu.label} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <div id="div-main-sidebar-icon" style={{ backgroundColor: theme.palette.background.paper }} onClick={onClickIcon}>
                    {isOpenSidebar ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </div>
            </Grid>
        </>
    );
};

export default Sidebar;
