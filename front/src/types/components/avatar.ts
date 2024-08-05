import { Role } from 'types/store/user';

export default interface Component {
    email: string;
    name: string;
    role: Role;
    isHeader?: boolean;
};
