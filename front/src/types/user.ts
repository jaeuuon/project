import { UserRole } from '../enums/role';

export default interface User {
    id?: string;
    name?: string;
    role?: UserRole.ADMIN | UserRole.USER;
};
