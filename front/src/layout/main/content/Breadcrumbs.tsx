import { useLocation } from 'react-router-dom';

import { useAppSelector } from 'hooks';

import { findGroupsByPath, findGroupByPath } from 'common/utils';

const Breadcrumbs = () => {
    const { pathname } = useLocation();

    const { roles } = useAppSelector((state) => state.user);

    const findGroups = findGroupsByPath(pathname);
    const findGroup = findGroupByPath(findGroups?.PATH);
    const findGroupRequiredRoles = findGroup?.REQUIRED.ROLES || [];

    const findItems = findGroups?.ITEMS.find(({ PATH }) => PATH === pathname);
    const findItemsRequiredRoles = findItems?.REQUIRED.ROLES || [];

    return (
        <>
            {findGroup && (
                findGroupRequiredRoles.length === 0
                || findGroupRequiredRoles.some((findGroupRequiredRole) => roles.some(({ code }) => findGroupRequiredRole === code))
            ) &&
                <>
                    {findGroup.LABEL}
                    {findItems && (
                        findItemsRequiredRoles.length === 0
                        || findItemsRequiredRoles.some((findItemsRequiredRole) => roles.some(({ code }) => findItemsRequiredRole === code))
                    ) &&
                        <>{findItems.LABEL}</>
                    }
                </>
            }
        </>
    );
};

export default Breadcrumbs;
