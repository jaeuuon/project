import CreatedTime from './createdTime';

export default interface CreatedUser extends CreatedTime {
    createdUserId: number;
    createdUserEmail: string;
    createdUserName: string;
};
