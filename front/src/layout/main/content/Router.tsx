import { Fragment } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import { group } from 'enums/layout/header/menu';
import { groups } from 'enums/layout/main/sidebar';

import { useAppSelector } from 'hooks';

import { findGroupByPath } from 'common/utils';

import NotFound from 'pages/NotFound';
import Loading from 'components/Loading';

const Router = () => {
    const { pathname } = useLocation();

    const { roles, isInit } = useAppSelector((state) => state.user);

    const isRequiredInit = Object.values(group).some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT)
        || groups.some(({ ITEMS }) => ITEMS.some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT));

    return (
        <>
            {(isInit && isRequiredInit) || !isRequiredInit
                ? <Routes>
                    {groups.map(({ PATH, ITEMS }, groupIndex) => {
                        const findGroup = findGroupByPath(PATH);
                        const findGroupRequiredRoles = findGroup?.REQUIRED.ROLES || [];

                        return (
                            <Fragment key={`route-main-content-${groupIndex}`}>
                                {findGroup && (
                                    findGroupRequiredRoles.length === 0
                                    || findGroupRequiredRoles.some((findGroupRequiredRole) => roles.some(({ code }) => findGroupRequiredRole === code))
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
        </>
    );
};

export default Router;
