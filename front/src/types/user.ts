import { Roles } from '../enums/roles';

export interface User {
    id: string | null;
    name: string | null;
    role: Roles.ADMIN | Roles.USER | null;
}
