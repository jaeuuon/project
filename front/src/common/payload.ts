import { roles as userRoles, type Roles as UserRoles } from 'enums/user';

import type Payload from 'types/common/payload';
import type User from 'types/layout/header/user';
import type CodeValue from 'types/codeValue';

import { snakeToCamel } from 'common/utils';

export const getPayload = (access: string): Payload => {
    const base64Url = access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return snakeToCamel(JSON.parse(jsonPayload));
};

export const getUser = ({
    id, email, name, authorities: payloadAuthorities, authorityValues: payloadAuthorityValues, exp
}: Payload): User => {
    const authorities = payloadAuthorities.split(',');
    const authorityValues = payloadAuthorityValues.split(',');

    const roles: CodeValue<UserRoles>[] = [];

    userRoles.forEach((userRole) => {
        authorities.some((authority, index) => {
            if (userRole === authority) {
                roles.push({ code: userRole, value: authorityValues[index] });

                return true;
            } else {
                return false;
            }
        });
    });

    return { id, email, name, roles, exp };
};

export const getDelay = ({ exp }: Payload) => (exp * 1000) - 30000 - Date.now();
