import { Fragment } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import { useAppSelector } from 'hooks';

import { Grid } from '@mui/material';

import { group } from 'enums/layout/header/menu';
import { groups } from 'enums/layout/main/sidebar';

import NotFound from 'pages/NotFound';
import Loading from 'components/Loading';

import styles from 'assets/styles/layout/main/content.module.scss';

const Content = () => {
    const { pathname } = useLocation();

    const { isInit, roles } = useAppSelector((state) => state.user);

    const requiredInit = Object.values(group).some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT)
        || groups.some(({ ITEMS }) => ITEMS.some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT));

    return (
        <Grid id={styles.content} item xs>
            <div id={styles.div}>
                {(isInit && requiredInit) || !requiredInit
                    ? <Routes>
                        {groups.map(({ PATH, ITEMS }, groupIndex) => {
                            const findGroup = Object.values(group).find(({ PATH: FIND_PATH }) => PATH === FIND_PATH);
                            const groupRequiredRoles = findGroup?.REQUIRED.ROLES || [];
            
                            return (
                                <Fragment key={`route-main-content-${groupIndex}`}>
                                    {findGroup && (
                                        groupRequiredRoles.length === 0
                                        || groupRequiredRoles.some((groupRequiredRole) => roles.some(({ code }) => groupRequiredRole === code))
                                    ) &&
                                        <>
                                            <Route path={findGroup.PATH} element={findGroup.ELEMENT} />
                                            {ITEMS.map(({ PATH, ELEMENT, REQUIRED }, itemIndex) => {
                                                const requiredRoles = REQUIRED.ROLES;
            
                                                return <Fragment key={`route-main-content-${groupIndex}-${itemIndex}`}>
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
