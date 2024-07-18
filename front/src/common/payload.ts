import type Payload from 'types/common/payload';
import type { UserState, Role } from 'types/layout/header/user';
import type { CodeValue } from 'types/value';

import { role } from 'enums/layout/header/user';

export const getPayload = (access: string): Payload => {
    const base64Url = access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const text = decodeURIComponent(atob(base64).split('').map((value) => `%${(`00${value.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(text);
};

export const getUser = ({
    id, email, name, authorities: payloadAuthorities, authorityValues: payloadAuthorityValues, exp
}: Payload): UserState => {
    const authorities = payloadAuthorities.split(',');
    const authorityValues = payloadAuthorityValues.split(',');

    const roles: CodeValue<Role>[] = [];

    Object.values(role).forEach((role) =>
        authorities.some((authority, index) => {
            if (role === authority) {
                roles.push({ code: role, value: authorityValues[index] });

                return true;
            } else {
                return false;
            }
        })
    );

    return { isInit: true, id, email, name, roles, exp };
};

export const getDelay = ({ exp }: Payload) => (exp * 1000) - 30000 - Date.now();
