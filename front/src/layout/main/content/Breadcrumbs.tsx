import { useLocation } from 'react-router-dom';

import type BreadcrumbsType from 'types/layout/main/content/breadcrumbs';

import { groups } from 'enums/layout/main/sidebar';
import { group } from 'enums/layout/header/menu';

const Breadcrumbs = ({
    isInit, roles,
    isRequiredInit
}: BreadcrumbsType) => {
    const { pathname } = useLocation();

    const findGroups = groups.find(({ PATH, ITEMS }) => PATH === pathname || ITEMS.some(({ PATH }) => PATH === pathname));
    const findGroup = Object.values(group).find(({ PATH }) => PATH === findGroups?.PATH);
    const findGroupRequiredRoles = findGroup?.REQUIRED.ROLES || [];

    const findItems = findGroups?.ITEMS.find(({ PATH }) => PATH === pathname);
    const findItemsRequiredRoles = findItems?.REQUIRED.ROLES || [];

    return (
        <>
            {((isInit && isRequiredInit) || !isRequiredInit) &&
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
            }
        </>
    );
};

export default Breadcrumbs;
