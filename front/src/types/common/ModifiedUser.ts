import ModifiedTime from './createdTime';

export default interface ModifiedUser extends ModifiedTime {
    modifiedUserId?: number;
    modifiedUserEmail?: string;
    modifiedUserName?: string;
};
