import { UserRole } from '../enums/role';

type Id = string | null;
type Name = string | null;
type Role = UserRole.ADMIN | UserRole.USER | null;

interface User {
    id: Id;
    name: Name;
    role: Role;
}

export default User;
