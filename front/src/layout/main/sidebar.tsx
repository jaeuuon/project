import { useRef, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'

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

import constant from '../../constant';

import { Detail } from '../../types/menu';

const Sidebar = () => {
    const location = useLocation();
    const menu: Detail = Object.values(constant.MENU).find((detail: Detail) => detail.path === location.pathname);
    // 하위 항목도 찾기 필요.

    const sidebar = useRef<HTMLInputElement>(null);

    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const onClickIcon = () => setOpenSidebar(!isOpenSidebar);

    useEffect(() => {
        document.body.style.overflow = isOpenSidebar ? 'hidden' : 'initial';
    }, [isOpenSidebar]);

    useEffect(() => {
        const handleResize = () => {
            if (sidebar?.current) {
                const styles = window.getComputedStyle(sidebar.current);

                if (styles.position !== 'fixed') {
                    setOpenSidebar(false);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isOpenSidebar &&
                <Modal setOpenSidebar={setOpenSidebar} />
            }
            <Grid id="grid-main-sidebar" className={isOpenSidebar ? 'sidebar-open' : ''} item xs="auto" ref={sidebar}>
                <div id="div-main-sidebar-content">
                    <List>
                        {menu?.subMenus.map((subMenu, index) => {
                            return (
                                <ListItem key={`list-item-header-menu-${index}`} disablePadding>
                                    {subMenu.isOpen ? (
                                        <ListItemButton onClick={() => window.open(subMenu.path)}>
                                            <ListItemIcon>{subMenu.icon}</ListItemIcon>
                                            <ListItemText primary={subMenu.label} />
                                        </ListItemButton>
                                    ) : (
                                        <Link to={subMenu.path}>
                                            <ListItemButton>
                                                <ListItemIcon>{subMenu.icon}</ListItemIcon>
                                                <ListItemText primary={subMenu.label} />
                                            </ListItemButton>
                                        </Link>
                                    )}
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <div id="div-main-sidebar-icon" onClick={onClickIcon}>
                    {isOpenSidebar ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </div>
            </Grid>
        </>
    );
};

export default Sidebar;
