import { Fragment } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import { MENU } from 'constants/layout/header/menu';

import { useAppSelector } from 'hooks';

import NotFound from 'pages/NotFound';
import Loading from 'components/Loading';

const Router = () => {
    const { pathname } = useLocation();
    const requiredInit = MENU.some(({ PATH, REQUIRED: { INIT }, SUB_MENUS }) =>
        (pathname === PATH && INIT)
        || SUB_MENUS.some(({ PATH, REQUIRED: { INIT } }) => pathname === PATH && INIT)
    );

    const { roles, isInit } = useAppSelector(({ user }) => user);

    return (
        <>
            {(requiredInit && isInit) || !requiredInit
                ? <Routes>
                    {MENU.filter(({ REQUIRED: { ROLES } }) =>
                        ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code))
                    ).map(({ PATH, ELEMENT, SUB_MENUS }, index) =>
                        <Fragment key={`route-main-content-${index}`}>
                            <Route path={PATH} element={ELEMENT} />
                            {SUB_MENUS.filter(({ REQUIRED: { ROLES } }) =>
                                ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code))
                            ).map(({ PATH, ELEMENT }, subIndex) =>
                                <Route key={`route-main-content-${index}-${subIndex}`} path={PATH} element={ELEMENT} />
                            )}
                        </Fragment>
                    )}
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                : <Loading isVisible />
            }
        </>
    );
};

export default Router;
