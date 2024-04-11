import { User } from './user';

export interface Action {
    type: string;
    data: User
};
