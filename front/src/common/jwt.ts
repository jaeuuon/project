import type { Payload } from 'types/common/jwt';
import type { UserState, Role } from 'types/store/user';

import { ROLE } from 'constants/user';

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

    const roles: Role[] = [];

    Object.values(ROLE).forEach((ROLE) =>
        authorities.some((authority, index) => {
            if (ROLE === authority) {
                roles.push({ code: ROLE, value: authorityValues[index] });

                return true;
            } else {
                return false;
            }
        })
    );

    return { id, email, name, roles, exp, isInit: true };
};

export const getDelay = ({ exp }: Payload) => (exp * 1000) - 30000 - Date.now();
